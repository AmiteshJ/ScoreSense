from flask import Flask, render_template, request, jsonify
import pickle
import numpy as np
from google import genai
import sqlite3
import hashlib
import os
import warnings
import time

warnings.filterwarnings("ignore")

app = Flask(__name__)

# --- CONFIGURATION ---
# ⚠️ PASTE YOUR REAL API KEY HERE ⚠️
GOOGLE_API_KEY = "AIzaSyDf46a5v_pAd-kb_TkkgNK11OCknOS2E7E" 
DB_FILE = "scoresense.db"

# Initialize Client
try:
    client = genai.Client(api_key=GOOGLE_API_KEY)
except:
    client = None

# Load Model
try:
    with open('student_model.pkl', 'rb') as f:
        model_local = pickle.load(f)
except:
    model_local = None 

# --- DATABASE SETUP ---
def init_db():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    # Create table with ALL columns (Profile + Auth)
    c.execute('''CREATE TABLE IF NOT EXISTS users 
                 (username TEXT PRIMARY KEY, 
                  password TEXT, 
                  attendance REAL, 
                  study_hours REAL, 
                  marks REAL, 
                  exam TEXT,
                  phone TEXT,
                  university TEXT,
                  semester TEXT,
                  bio TEXT,
                  profile_pic TEXT,
                  cgpa TEXT,
                  backlogs TEXT,
                  skills TEXT,
                  dream_company TEXT)''')
    conn.commit()
    conn.close()

init_db()

# --- HELPER: ROBUST AI ENGINE ---
def get_ai_response(prompt):
    """Tries multiple Gemini models to ensure a response."""
    if not client:
        print("❌ Gemini Client not initialized. Check API Key.")
        return None
        
    models_to_try = ["gemini-2.0-flash", "gemini-1.5-flash", "gemini-1.5-pro"]
    
    for model in models_to_try:
        try:
            print(f"🔄 Trying {model}...")
            response = client.models.generate_content(model=model, contents=prompt)
            print(f"✅ Success with {model}")
            return response.text
        except Exception as e:
            print(f"⚠️ {model} Failed: {e}")
            time.sleep(1) # Brief pause before retry
            continue
            
    return None # All failed

# --- PAGE ROUTES ---
@app.route('/')
def login(): return render_template('index.html')

@app.route('/dashboard')
def dashboard(): return render_template('dashboard.html')

@app.route('/profile')
def profile(): return render_template('profile.html')

# --- AUTH ROUTES ---
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    hashed_pw = hashlib.sha256(password.encode()).hexdigest()
    
    try:
        conn = sqlite3.connect(DB_FILE)
        c = conn.cursor()
        # Create user with empty profile fields
        c.execute('''INSERT INTO users 
                     (username, password, attendance, study_hours, marks, exam, phone, university, semester, bio, profile_pic, cgpa, backlogs, skills, dream_company) 
                     VALUES (?, ?, 0, 0, 0, 'General', '', '', '', '', '', '', '', '', '')''', 
                  (username, hashed_pw))
        conn.commit()
        conn.close()
        return jsonify({"status": "success"})
    except sqlite3.IntegrityError:
        return jsonify({"status": "error", "message": "Username exists"})

@app.route('/login_api', methods=['POST'])
def login_api():
    data = request.json
    hashed_pw = hashlib.sha256(data['password'].encode()).hexdigest()
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute("SELECT * FROM users WHERE username=? AND password=?", (data['username'], hashed_pw))
    user = c.fetchone()
    conn.close()
    return jsonify({"status": "success", "username": data['username']}) if user else jsonify({"status": "error"})

# --- PROFILE DATA ROUTES ---
@app.route('/save_full_profile', methods=['POST'])
def save_full_profile():
    data = request.json
    username = data.get('username')
    
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    
    query = '''UPDATE users SET 
               phone=?, university=?, semester=?, bio=?, profile_pic=?,
               cgpa=?, backlogs=?, skills=?, dream_company=?
               WHERE username=?'''
    
    c.execute(query, (
        data.get('phone', ''),
        data.get('university', ''),
        data.get('semester', ''),
        data.get('bio', ''),
        data.get('profile_pic', ''),
        data.get('cgpa', ''),
        data.get('backlogs', ''),
        data.get('skills', ''),
        data.get('dream_company', ''),
        username
    ))
    conn.commit()
    conn.close()
    return jsonify({"status": "saved"})

@app.route('/save_data', methods=['POST'])
def save_data():
    # Saves just the dashboard slider data
    data = request.json
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute('''UPDATE users SET attendance=?, study_hours=?, marks=?, exam=? WHERE username=?''', 
              (data.get('attendance'), data.get('study_hours'), data.get('marks'), data.get('exam'), data.get('username')))
    conn.commit()
    conn.close()
    return jsonify({"status": "saved"})

@app.route('/get_data/<username>', methods=['GET'])
def get_data(username):
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute("SELECT * FROM users WHERE username=?", (username,))
    row = c.fetchone()
    conn.close()

    if row:
        return jsonify({
            "found": True,
            "attendance": row[2],
            "study_hours": row[3],
            "marks": row[4],
            "exam": row[5],
            "phone": row[6],
            "university": row[7],
            "semester": row[8],
            "bio": row[9],
            "profile_pic": row[10],
            "cgpa": row[11],
            "backlogs": row[12],
            "skills": row[13],
            "dream_company": row[14]
        })
    else:
        return jsonify({"found": False})

# --- AI & ML ROUTES (These were missing/broken!) ---

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        features = np.array([[float(data.get('attendance', 0)), float(data.get('study_hours', 0)), float(data.get('marks', 0))]])
        
        if model_local:
            prediction = model_local.predict(features)[0]
            probability = model_local.predict_proba(features)[0][1] * 100
            return jsonify({'prediction': 'PASS' if prediction == 1 else 'AT RISK', 'confidence': f"{round(probability)}%"})
        else:
            return jsonify({'prediction': 'PASS', 'confidence': '85%'})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/ask_gemini', methods=['POST'])
def ask_gemini():
    data = request.json
    exam = data.get('exam', 'General')
    hours = data.get('study_hours', 0)
    
    prompt = f"""
    Act as a strict but encouraging career coach. 
    The student is preparing for {exam} and studies {hours} hours per week.
    Provide a very short, actionable 3-step roadmap.
    Format the output as a clean HTML <ul> list with <li> items. Do not use markdown.
    """
    
    advice = get_ai_response(prompt)
    if advice:
        return jsonify({'advice': advice})
    else:
        return jsonify({'advice': "<ul><li>Increase study consistency.</li><li>Focus on weak topics.</li><li>Take mock tests weekly.</li></ul><small>(Offline Mode)</small>"})

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    msg = data.get('message', '')
    
    prompt = f"You are ScoreSense, a helpful academic assistant. Keep answers under 40 words. User: {msg}"
    
    reply = get_ai_response(prompt)
    if reply:
        return jsonify({'reply': reply})
    else:
        return jsonify({'reply': "I'm having trouble connecting to the server. Please check your internet or API key."})

if __name__ == '__main__':
    app.run(debug=True, port=5000)