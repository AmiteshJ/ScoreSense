from flask import Flask, render_template, request, jsonify
import pickle
import numpy as np
from google import genai
from google.genai import types
import os
import random
import warnings

# --- 1. SILENCE WARNINGS (Cleaner Terminal) ---
warnings.filterwarnings("ignore", category=UserWarning)

app = Flask(__name__)

# --- 2. CONFIGURATION ---
GOOGLE_API_KEY = "AIzaSyDgnV6KFf1K6mtkVSA-gWAqo0ucRDpfLMo"  # <--- PASTE KEY HERE

# Initialize Client
try:
    client = genai.Client(api_key=GOOGLE_API_KEY)
except:
    client = None

# Load local ML model
try:
    with open('student_model.pkl', 'rb') as f:
        model_local = pickle.load(f)
except:
    model_local = None 

@app.route('/')
def login(): return render_template('index.html')

@app.route('/dashboard')
def dashboard(): return render_template('dashboard.html')

@app.route('/profile')
def profile(): return render_template('profile.html')

# --- 3. LOCAL ML PREDICTION ---
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        # 1. Use 0 as default if empty
        att = float(data.get('attendance', 0))
        study = float(data.get('study_hours', 0))
        marks = float(data.get('marks', 0))
        
        # 2. Reshape for Scikit-Learn
        features = np.array([[att, study, marks]])
        
        if model_local:
            prediction = model_local.predict(features)[0]
            probability = model_local.predict_proba(features)[0][1] * 100
            return jsonify({'prediction': 'PASS' if prediction == 1 else 'AT RISK', 'confidence': f"{round(probability)}%"})
        else:
            return jsonify({'prediction': 'PASS', 'confidence': '85%'}) # Mock
    except Exception as e:
        return jsonify({'error': str(e)}), 400

# --- 4. GEMINI EXAM STRATEGY (The "Brute Force" Fix) ---
@app.route('/ask_gemini', methods=['POST'])
def ask_gemini():
    data = request.json
    exam = data.get('exam', 'General')
    hours = data.get('study_hours', 0)
    
    # LIST OF MODELS TO TRY (If one fails, it tries the next)
    models_to_try = [
        "gemini-2.0-flash",
        "gemini-1.5-flash",
        "gemini-1.5-flash-001",
        "gemini-1.5-pro",
        "gemini-1.0-pro"
    ]

    prompt = f"Give 3 short, bulleted study tips for a student preparing for {exam} studying {hours} hours/week. Format as HTML <ul><li>."

    for model_name in models_to_try:
        try:
            print(f"🔄 Trying AI Model: {model_name}...")
            response = client.models.generate_content(
                model=model_name, 
                contents=prompt
            )
            print(f"✅ Success with {model_name}!")
            return jsonify({'advice': response.text})
        except Exception as e:
            print(f"❌ {model_name} Failed: {e}")
            continue # Try next model

    # IF ALL FAIL, USE MOCK
    print("⚠️ All AI Models failed. Using Mock Data.")
    return jsonify({'advice': generate_mock_advice(exam, hours)})

# --- MOCK DATA GENERATOR (Offline Mode) ---
def generate_mock_advice(exam, hours):
    strategies = [
        f"<li><strong>Increase Intensity:</strong> For {exam}, {hours} hours is low. Aim for 8+ hours/week.</li>",
        f"<li><strong>Mock Tests:</strong> Solve previous year papers for {exam} every Sunday.</li>",
        "<li><strong>Focus Areas:</strong> Prioritize high-weightage topics over covering the full syllabus.</li>",
        "<li><strong>Health:</strong> Maintain a sleep cycle of 7 hours to improve retention.</li>",
        "<li><strong>Revision:</strong> Use the Feynman technique to revise difficult concepts.</li>"
    ]
    return "<ul>" + "".join(random.sample(strategies, 3)) + "</ul><br><small style='opacity:0.5'>(Offline Mode Active)</small>"

if __name__ == '__main__':
    app.run(debug=True, port=5000)