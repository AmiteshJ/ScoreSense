// Mock data for the exam analytics platform

export interface TestResult {
  id: string
  testName: string
  date: string
  totalQuestions: number
  attempted: number
  correct: number
  incorrect: number
  skipped: number
  score: number
  maxScore: number
  timeTaken: number // in minutes
  totalTime: number // in minutes
  subjects: SubjectResult[]
}

export interface SubjectResult {
  name: string
  totalQuestions: number
  attempted: number
  correct: number
  incorrect: number
  score: number
  maxScore: number
  timeTaken: number
  topics: TopicResult[]
}

export interface TopicResult {
  name: string
  totalQuestions: number
  correct: number
  incorrect: number
  accuracy: number
  mastery: "weak" | "improving" | "strong" | "mastered"
}

export interface MistakePattern {
  type: "conceptual" | "calculation" | "time-pressure" | "guessing"
  label: string
  count: number
  percentage: number
  description: string
}

export interface WeakArea {
  topic: string
  subject: string
  accuracy: number
  mastery: "weak" | "improving" | "strong" | "mastered"
  trend: "up" | "down" | "stable"
  trendValue: number
}

export interface ProgressEntry {
  testName: string
  date: string
  score: number
  accuracy: number
  totalQuestions: number
}

export const mockTestResults: TestResult[] = [
  {
    id: "test-1",
    testName: "JEE Main Mock Test 1",
    date: "2026-01-05",
    totalQuestions: 90,
    attempted: 78,
    correct: 52,
    incorrect: 26,
    skipped: 12,
    score: 182,
    maxScore: 300,
    timeTaken: 165,
    totalTime: 180,
    subjects: [
      {
        name: "Physics",
        totalQuestions: 30,
        attempted: 26,
        correct: 18,
        incorrect: 8,
        score: 64,
        maxScore: 100,
        timeTaken: 58,
        topics: [
          { name: "Mechanics", totalQuestions: 8, correct: 6, incorrect: 2, accuracy: 75, mastery: "strong" },
          { name: "Thermodynamics", totalQuestions: 5, correct: 4, incorrect: 1, accuracy: 80, mastery: "strong" },
          { name: "Optics", totalQuestions: 6, correct: 3, incorrect: 3, accuracy: 50, mastery: "improving" },
          { name: "Electromagnetism", totalQuestions: 7, correct: 3, incorrect: 4, accuracy: 43, mastery: "weak" },
          { name: "Modern Physics", totalQuestions: 4, correct: 2, incorrect: 2, accuracy: 50, mastery: "improving" },
        ],
      },
      {
        name: "Chemistry",
        totalQuestions: 30,
        attempted: 28,
        correct: 20,
        incorrect: 8,
        score: 72,
        maxScore: 100,
        timeTaken: 52,
        topics: [
          { name: "Organic Chemistry", totalQuestions: 10, correct: 7, incorrect: 3, accuracy: 70, mastery: "improving" },
          { name: "Inorganic Chemistry", totalQuestions: 8, correct: 6, incorrect: 2, accuracy: 75, mastery: "strong" },
          { name: "Physical Chemistry", totalQuestions: 7, correct: 5, incorrect: 2, accuracy: 71, mastery: "improving" },
          { name: "Coordination Compounds", totalQuestions: 5, correct: 2, incorrect: 3, accuracy: 40, mastery: "weak" },
        ],
      },
      {
        name: "Mathematics",
        totalQuestions: 30,
        attempted: 24,
        correct: 14,
        incorrect: 10,
        score: 46,
        maxScore: 100,
        timeTaken: 55,
        topics: [
          { name: "Calculus", totalQuestions: 8, correct: 5, incorrect: 3, accuracy: 63, mastery: "improving" },
          { name: "Algebra", totalQuestions: 7, correct: 5, incorrect: 2, accuracy: 71, mastery: "improving" },
          { name: "Probability", totalQuestions: 5, correct: 2, incorrect: 3, accuracy: 40, mastery: "weak" },
          { name: "Trigonometry", totalQuestions: 5, correct: 1, incorrect: 4, accuracy: 20, mastery: "weak" },
          { name: "Coordinate Geometry", totalQuestions: 5, correct: 1, incorrect: 4, accuracy: 20, mastery: "weak" },
        ],
      },
    ],
  },
  {
    id: "test-2",
    testName: "JEE Main Mock Test 2",
    date: "2026-01-15",
    totalQuestions: 90,
    attempted: 82,
    correct: 58,
    incorrect: 24,
    skipped: 8,
    score: 208,
    maxScore: 300,
    timeTaken: 170,
    totalTime: 180,
    subjects: [
      {
        name: "Physics",
        totalQuestions: 30,
        attempted: 28,
        correct: 20,
        incorrect: 8,
        score: 72,
        maxScore: 100,
        timeTaken: 55,
        topics: [
          { name: "Mechanics", totalQuestions: 8, correct: 7, incorrect: 1, accuracy: 88, mastery: "mastered" },
          { name: "Thermodynamics", totalQuestions: 5, correct: 4, incorrect: 1, accuracy: 80, mastery: "strong" },
          { name: "Optics", totalQuestions: 6, correct: 4, incorrect: 2, accuracy: 67, mastery: "improving" },
          { name: "Electromagnetism", totalQuestions: 7, correct: 3, incorrect: 4, accuracy: 43, mastery: "weak" },
          { name: "Modern Physics", totalQuestions: 4, correct: 2, incorrect: 2, accuracy: 50, mastery: "improving" },
        ],
      },
      {
        name: "Chemistry",
        totalQuestions: 30,
        attempted: 28,
        correct: 22,
        incorrect: 6,
        score: 82,
        maxScore: 100,
        timeTaken: 50,
        topics: [
          { name: "Organic Chemistry", totalQuestions: 10, correct: 8, incorrect: 2, accuracy: 80, mastery: "strong" },
          { name: "Inorganic Chemistry", totalQuestions: 8, correct: 7, incorrect: 1, accuracy: 88, mastery: "mastered" },
          { name: "Physical Chemistry", totalQuestions: 7, correct: 5, incorrect: 2, accuracy: 71, mastery: "improving" },
          { name: "Coordination Compounds", totalQuestions: 5, correct: 2, incorrect: 3, accuracy: 40, mastery: "weak" },
        ],
      },
      {
        name: "Mathematics",
        totalQuestions: 30,
        attempted: 26,
        correct: 16,
        incorrect: 10,
        score: 54,
        maxScore: 100,
        timeTaken: 65,
        topics: [
          { name: "Calculus", totalQuestions: 8, correct: 6, incorrect: 2, accuracy: 75, mastery: "strong" },
          { name: "Algebra", totalQuestions: 7, correct: 5, incorrect: 2, accuracy: 71, mastery: "improving" },
          { name: "Probability", totalQuestions: 5, correct: 3, incorrect: 2, accuracy: 60, mastery: "improving" },
          { name: "Trigonometry", totalQuestions: 5, correct: 1, incorrect: 4, accuracy: 20, mastery: "weak" },
          { name: "Coordinate Geometry", totalQuestions: 5, correct: 1, incorrect: 4, accuracy: 20, mastery: "weak" },
        ],
      },
    ],
  },
  {
    id: "test-3",
    testName: "JEE Main Mock Test 3",
    date: "2026-01-25",
    totalQuestions: 90,
    attempted: 85,
    correct: 64,
    incorrect: 21,
    skipped: 5,
    score: 235,
    maxScore: 300,
    timeTaken: 172,
    totalTime: 180,
    subjects: [
      {
        name: "Physics",
        totalQuestions: 30,
        attempted: 29,
        correct: 22,
        incorrect: 7,
        score: 81,
        maxScore: 100,
        timeTaken: 54,
        topics: [
          { name: "Mechanics", totalQuestions: 8, correct: 7, incorrect: 1, accuracy: 88, mastery: "mastered" },
          { name: "Thermodynamics", totalQuestions: 5, correct: 5, incorrect: 0, accuracy: 100, mastery: "mastered" },
          { name: "Optics", totalQuestions: 6, correct: 5, incorrect: 1, accuracy: 83, mastery: "strong" },
          { name: "Electromagnetism", totalQuestions: 7, correct: 4, incorrect: 3, accuracy: 57, mastery: "improving" },
          { name: "Modern Physics", totalQuestions: 4, correct: 1, incorrect: 3, accuracy: 25, mastery: "weak" },
        ],
      },
      {
        name: "Chemistry",
        totalQuestions: 30,
        attempted: 29,
        correct: 24,
        incorrect: 5,
        score: 91,
        maxScore: 100,
        timeTaken: 48,
        topics: [
          { name: "Organic Chemistry", totalQuestions: 10, correct: 9, incorrect: 1, accuracy: 90, mastery: "mastered" },
          { name: "Inorganic Chemistry", totalQuestions: 8, correct: 7, incorrect: 1, accuracy: 88, mastery: "mastered" },
          { name: "Physical Chemistry", totalQuestions: 7, correct: 6, incorrect: 1, accuracy: 86, mastery: "strong" },
          { name: "Coordination Compounds", totalQuestions: 5, correct: 2, incorrect: 3, accuracy: 40, mastery: "weak" },
        ],
      },
      {
        name: "Mathematics",
        totalQuestions: 30,
        attempted: 27,
        correct: 18,
        incorrect: 9,
        score: 63,
        maxScore: 100,
        timeTaken: 70,
        topics: [
          { name: "Calculus", totalQuestions: 8, correct: 7, incorrect: 1, accuracy: 88, mastery: "mastered" },
          { name: "Algebra", totalQuestions: 7, correct: 6, incorrect: 1, accuracy: 86, mastery: "strong" },
          { name: "Probability", totalQuestions: 5, correct: 3, incorrect: 2, accuracy: 60, mastery: "improving" },
          { name: "Trigonometry", totalQuestions: 5, correct: 1, incorrect: 4, accuracy: 20, mastery: "weak" },
          { name: "Coordinate Geometry", totalQuestions: 5, correct: 1, incorrect: 4, accuracy: 20, mastery: "weak" },
        ],
      },
    ],
  },
]

export const mockWeakAreas: WeakArea[] = [
  { topic: "Trigonometry", subject: "Mathematics", accuracy: 20, mastery: "weak", trend: "stable", trendValue: 0 },
  { topic: "Coordinate Geometry", subject: "Mathematics", accuracy: 20, mastery: "weak", trend: "stable", trendValue: 0 },
  { topic: "Coordination Compounds", subject: "Chemistry", accuracy: 40, mastery: "weak", trend: "stable", trendValue: 0 },
  { topic: "Modern Physics", subject: "Physics", accuracy: 25, mastery: "weak", trend: "down", trendValue: -25 },
  { topic: "Electromagnetism", subject: "Physics", accuracy: 57, mastery: "improving", trend: "up", trendValue: 14 },
  { topic: "Probability", subject: "Mathematics", accuracy: 60, mastery: "improving", trend: "up", trendValue: 20 },
]

export const mockMistakePatterns: MistakePattern[] = [
  { type: "conceptual", label: "Conceptual Gaps", count: 28, percentage: 35, description: "Fundamental understanding needs reinforcement in specific topics" },
  { type: "calculation", label: "Calculation Errors", count: 18, percentage: 22, description: "Arithmetic and algebraic mistakes during problem solving" },
  { type: "time-pressure", label: "Time Pressure", count: 24, percentage: 30, description: "Accuracy drops significantly in the last 30 minutes of exams" },
  { type: "guessing", label: "Random Guessing", count: 10, percentage: 13, description: "Low-confidence answers with below-random accuracy" },
]

export const mockProgressHistory: ProgressEntry[] = [
  { testName: "Practice Test A", date: "2025-11-10", score: 120, accuracy: 48, totalQuestions: 90 },
  { testName: "Practice Test B", date: "2025-11-25", score: 138, accuracy: 52, totalQuestions: 90 },
  { testName: "Practice Test C", date: "2025-12-08", score: 155, accuracy: 57, totalQuestions: 90 },
  { testName: "Practice Test D", date: "2025-12-20", score: 168, accuracy: 60, totalQuestions: 90 },
  { testName: "Mock Test 1", date: "2026-01-05", score: 182, accuracy: 67, totalQuestions: 90 },
  { testName: "Mock Test 2", date: "2026-01-15", score: 208, accuracy: 71, totalQuestions: 90 },
  { testName: "Mock Test 3", date: "2026-01-25", score: 235, accuracy: 75, totalQuestions: 90 },
]

export const mockStrongAreas: WeakArea[] = [
  { topic: "Mechanics", subject: "Physics", accuracy: 88, mastery: "mastered", trend: "up", trendValue: 13 },
  { topic: "Thermodynamics", subject: "Physics", accuracy: 100, mastery: "mastered", trend: "up", trendValue: 20 },
  { topic: "Organic Chemistry", subject: "Chemistry", accuracy: 90, mastery: "mastered", trend: "up", trendValue: 20 },
  { topic: "Inorganic Chemistry", subject: "Chemistry", accuracy: 88, mastery: "mastered", trend: "up", trendValue: 13 },
  { topic: "Calculus", subject: "Mathematics", accuracy: 88, mastery: "mastered", trend: "up", trendValue: 25 },
  { topic: "Algebra", subject: "Mathematics", accuracy: 86, mastery: "strong", trend: "up", trendValue: 15 },
]

export function getLatestTest(): TestResult {
  return mockTestResults[mockTestResults.length - 1]
}

export function getOverallAccuracy(): number {
  const latest = getLatestTest()
  return Math.round((latest.correct / latest.attempted) * 100)
}

export function getScorePrediction(): { predicted: number; clearingChance: number; targetScore: number } {
  const scores = mockProgressHistory.map(e => e.score)
  const n = scores.length
  // Simple linear regression
  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0
  for (let i = 0; i < n; i++) {
    sumX += i
    sumY += scores[i]
    sumXY += i * scores[i]
    sumX2 += i * i
  }
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
  const intercept = (sumY - slope * sumX) / n
  const predicted = Math.round(Math.min(slope * n + intercept, 300))
  const clearingChance = Math.min(Math.round((predicted / 200) * 100), 98)
  return { predicted, clearingChance, targetScore: 200 }
}

export function getStudyEfficiency(): number {
  const latest = getLatestTest()
  const accuracy = (latest.correct / latest.attempted) * 100
  const timeEfficiency = (latest.totalTime / latest.timeTaken) * 100
  return Math.round((accuracy * 0.7 + timeEfficiency * 0.3))
}
