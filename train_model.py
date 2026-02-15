import pandas as pd
import pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# 1. Load the data we just made
df = pd.read_csv('student_data.csv')

# 2. X = Features (The facts), y = Target (The prediction)
X = df[['Attendance', 'StudyHours', 'PrevGrade']]
y = df['Result']

# 3. Split: 80% for learning, 20% for testing the AI's "IQ"
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 4. Create and train the model
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

# 5. Check how smart it is
predictions = model.predict(X_test)
print(f"Model Accuracy: {accuracy_score(y_test, predictions) * 100:.2%}")

# 6. SAVE THE BRAIN (The .pkl file)
with open('student_model.pkl', 'wb') as f:
    pickle.dump(model, f)

print("Brain saved as 'student_model.pkl'!")