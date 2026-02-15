import pandas as pd
import numpy as np

# Let's create data for 500 students
n_students = 500

# Generate random data within realistic ranges
data = {
    'Attendance': np.random.randint(40, 100, n_students),  # 40% to 100%
    'StudyHours': np.random.randint(1, 15, n_students),    # 1 to 15 hours/week
    'PrevGrade': np.random.randint(30, 100, n_students),   # 30 to 100 marks
}

df = pd.DataFrame(data)

# Logic for "Result" (The Target): 
# If Attendance > 70 and StudyHours > 5, they likely Pass (1). Else Fail (0).
# We add some "noise" (randomness) so the AI has to actually work to find the pattern.
df['Result'] = ((df['Attendance'] * 0.4 + df['StudyHours'] * 3 + df['PrevGrade'] * 0.3) > 50).astype(int)

# Save it!
df.to_csv('student_data.csv', index=False)
print("Success! Created 'student_data.csv' with 500 records.")