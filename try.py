from flask import Flask, render_template, request, jsonify
import pickle
import numpy as np
from google import genai  # NEW LIBRARY IMPORT
import os

app = Flask(__name__)

# --- CONFIGURATION ---
# 1. PASTE YOUR API KEY HERE (Make sure it is inside the quotes!)
GOOGLE_API_KEY = "AIzaSyDgnV6KFf1K6mtkVSA-gWAqo0ucRDpfLMo" 

# 2. Initialize the New Client
try:
    client = genai.Client(api_key=GOOGLE_API_KEY)
except Exception as e:
    print(f"Error initializing Gemini Client: {e}")

# Load your local ML model
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

# --- 1. LOCAL ML PREDICTION ---
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        # Convert inputs to float to prevent errors
        attendance = float(data.get('attendance', 0))
        study_hours = float(data.get('study_hours', 0))
        marks = float(data.get('marks', 0))
        
        features = np.array([[attendance, study_hours, marks]])
        
        if model_local:
            prediction = model_local.predict(features)[0]
            probability = model_local.predict_proba(features)[0][1] * 100
            return jsonify({
                'prediction': 'PASS' if prediction == 1 else 'AT RISK', 
                'confidence': f"{round(probability)}%"
            })
        else:
            return jsonify({'prediction': 'N/A', 'confidence': '0%'}) 
    except Exception as e:
        print(f"Prediction Error: {e}") # Print error to terminal
        return jsonify({'error': str(e)}), 400

# --- 2. GEMINI EXAM STRATEGY (New Library Syntax) ---
@app.route('/ask_gemini', methods=['POST'])
def ask_gemini():
    try:
        data = request.json
        exam = data.get('exam', 'General Exams')
        hours = data.get('study_hours', 0)
        
        print(f"Asking Gemini about: {exam} with {hours} hours...") # Debug print

        prompt = f"""
        Act as an expert career coach. A student is preparing for the {exam} exam.
        They currently study {hours} hours per week.
        
        1. Compare this to the average required study hours for a top rank in {exam}.
        2. Give 3 specific, actionable tips to improve their score.
        3. Keep the tone motivating but realistic.
        4. Output format: Use HTML <ul> and <li> tags for the tips. Do not use Markdown (**bold**).
        """
        
        # NEW SYNTAX for generating content
        response = client.models.generate_content(
            model="gemini-2.0-flash", 
            contents=prompt
        )
        
        return jsonify({'advice': response.text})
    
    except Exception as e:
        # THIS IS THE IMPORTANT PART: It prints the REAL error to your terminal
        print(f"GEMINI ERROR: {e}") 
        return jsonify({'advice': f"AI Error: {str(e)}. Check terminal for details."})

if __name__ == '__main__':
    app.run(debug=True, port=5000)