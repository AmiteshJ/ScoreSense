"use client"

import { useState } from "react"
import {
  ArrowRight,
  BookOpen,
  Brain,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  FileText,
  Lightbulb,
  Loader2,
  MessageSquareText,
  Sparkles,
  Target,
  Timer,
  TrendingUp,
  Zap,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getLatestTest, getScorePrediction, mockWeakAreas } from "@/lib/mock-data"

interface StudyTask {
  task: string
  duration: string
  priority: "high" | "medium" | "low"
  topic: string
  completed: boolean
}

const studyPlan: StudyTask[] = [
  { task: "Review Trigonometric identities and formulas", duration: "45 min", priority: "high", topic: "Trigonometry", completed: false },
  { task: "Practice 15 Coordinate Geometry problems", duration: "60 min", priority: "high", topic: "Coord. Geometry", completed: false },
  { task: "Study Coordination Compounds mechanisms", duration: "40 min", priority: "high", topic: "Coordination Compounds", completed: false },
  { task: "Solve 20 Probability questions (increasing difficulty)", duration: "50 min", priority: "medium", topic: "Probability", completed: false },
  { task: "Revise Modern Physics concepts and numericals", duration: "35 min", priority: "medium", topic: "Modern Physics", completed: false },
  { task: "Timed practice: 30 mixed questions in 45 minutes", duration: "45 min", priority: "medium", topic: "Mixed", completed: false },
  { task: "Review and correct previous test mistakes", duration: "30 min", priority: "low", topic: "All", completed: false },
]

const weeklySchedule = [
  {
    day: "Monday",
    focus: "Mathematics",
    tasks: ["Trigonometry formulas (45 min)", "Coordinate Geometry practice (60 min)"],
  },
  {
    day: "Tuesday",
    focus: "Chemistry",
    tasks: ["Coordination Compounds (40 min)", "Physical Chemistry revision (30 min)"],
  },
  {
    day: "Wednesday",
    focus: "Physics",
    tasks: ["Modern Physics concepts (35 min)", "Electromagnetism problems (45 min)"],
  },
  {
    day: "Thursday",
    focus: "Mathematics",
    tasks: ["Probability practice (50 min)", "Calculus advanced problems (40 min)"],
  },
  {
    day: "Friday",
    focus: "Mixed Practice",
    tasks: ["Timed test: 30 questions (45 min)", "Error analysis (30 min)"],
  },
  {
    day: "Saturday",
    focus: "Full Mock Test",
    tasks: ["Complete mock test (180 min)", "Review answers (60 min)"],
  },
  {
    day: "Sunday",
    focus: "Revision",
    tasks: ["Weak area revision (60 min)", "Formula review (30 min)"],
  },
]

const examStrategies = [
  {
    icon: Timer,
    title: "Time Management",
    tips: [
      "Attempt Chemistry first — your strongest and fastest subject (48 min avg.)",
      "Tackle Physics second — good accuracy, moderate time usage",
      "Save Mathematics for last — needs the most time and focus",
      "Reserve 10 minutes at the end for review",
    ],
  },
  {
    icon: Target,
    title: "Accuracy Optimization",
    tips: [
      "Skip Trigonometry and Coordinate Geometry questions initially — low ROI currently",
      "Attempt all Chemistry questions — your accuracy is consistently above 80%",
      "In Physics, prioritize Mechanics and Thermodynamics (88-100% accuracy)",
      "In Math, focus on Calculus and Algebra first (86-88% accuracy)",
    ],
  },
  {
    icon: Zap,
    title: "Score Maximization",
    tips: [
      "Target 85+ in Chemistry (currently at 91) — maintain this advantage",
      "Push Physics score from 81 to 85+ by improving Electromagnetism",
      "In Mathematics, aim for 70+ by securing Calculus and Algebra marks",
      "Avoid negative marking — skip uncertain Trigonometry questions",
    ],
  },
]

export function RecommendationsContent() {
  const latest = getLatestTest()
  const prediction = getScorePrediction()
  const [tasks, setTasks] = useState(studyPlan)
  const [showAiSummary, setShowAiSummary] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)

  const toggleTask = (index: number) => {
    setTasks((prev) =>
      prev.map((t, i) => (i === index ? { ...t, completed: !t.completed } : t))
    )
  }

  const completedCount = tasks.filter((t) => t.completed).length

  const handleAiExplain = () => {
    setAiLoading(true)
    setTimeout(() => {
      setAiLoading(false)
      setShowAiSummary(true)
    }, 2000)
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground font-display">
          AI Study Recommendations
        </h1>
        <p className="text-muted-foreground mt-1">
          Personalized study plans and exam strategies based on your performance
        </p>
      </div>

      {/* AI Performance Summary */}
      <Card className="mb-8 border-primary/20 bg-primary/[0.02]">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-base font-semibold text-foreground mb-3">
                AI Performance Analysis
              </h2>
              {!showAiSummary && !aiLoading && (
                <Button onClick={handleAiExplain} size="sm">
                  <MessageSquareText className="w-4 h-4 mr-2" />
                  Explain My Performance
                </Button>
              )}
              {aiLoading && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing your performance data...
                </div>
              )}
              {showAiSummary && (
                <div className="text-sm text-muted-foreground leading-relaxed flex flex-col gap-3">
                  <p>
                    Based on your last 3 mock tests, here is a comprehensive analysis of
                    your preparation status:
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Overall Trajectory:</span>{" "}
                    Your score has improved from 182 to 235 out of 300, showing a
                    strong upward trend of +29% over 3 tests. This pace puts you
                    on track to score around {prediction.predicted} in your next attempt.
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Key Strengths:</span>{" "}
                    Chemistry is your powerhouse subject with 91/100 in the latest
                    test. Organic and Inorganic Chemistry are essentially mastered.
                    In Physics, Mechanics and Thermodynamics are rock-solid at 88-100%
                    accuracy.
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Critical Gaps:</span>{" "}
                    Trigonometry (20%) and Coordinate Geometry (20%) in Mathematics
                    are your biggest liabilities — these alone cost you approximately
                    32 marks. Coordination Compounds (40%) in Chemistry is another
                    consistent weak spot.
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Mistake Pattern:</span>{" "}
                    35% of your errors come from conceptual misunderstanding, and 30%
                    from time pressure — meaning 65% of mistakes are addressable
                    through targeted study and better time management.
                  </p>
                  <p>
                    <span className="font-medium text-accent">Recommendation:</span>{" "}
                    Prioritize Trigonometry and Coordinate Geometry for the maximum
                    score uplift. Even a 50% accuracy in these topics would add
                    approximately 20 marks to your total score.
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="plan">
        <TabsList className="mb-6">
          <TabsTrigger value="plan">Study Plan</TabsTrigger>
          <TabsTrigger value="schedule">Weekly Schedule</TabsTrigger>
          <TabsTrigger value="strategy">Exam Strategy</TabsTrigger>
        </TabsList>

        {/* Study Plan */}
        <TabsContent value="plan">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    Daily Study Tasks
                  </CardTitle>
                  <Badge variant="secondary">
                    {completedCount}/{tasks.length} done
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    {tasks.map((task, i) => (
                      <button
                        key={i}
                        onClick={() => toggleTask(i)}
                        className={`flex items-start gap-3 p-3 rounded-lg border text-left transition-colors ${
                          task.completed
                            ? "bg-accent/5 border-accent/20"
                            : "border-border hover:bg-muted/50"
                        }`}
                      >
                        <div
                          className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                            task.completed
                              ? "bg-accent border-accent"
                              : "border-border"
                          }`}
                        >
                          {task.completed && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-accent-foreground" />
                          )}
                        </div>
                        <div className="flex-1">
                          <span
                            className={`text-sm font-medium ${
                              task.completed
                                ? "line-through text-muted-foreground"
                                : "text-foreground"
                            }`}
                          >
                            {task.task}
                          </span>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant={
                                task.priority === "high"
                                  ? "destructive"
                                  : task.priority === "medium"
                                  ? "secondary"
                                  : "outline"
                              }
                              className="text-xs"
                            >
                              {task.priority}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {task.duration}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {task.topic}
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col gap-6">
              {/* Quick Stats */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold">
                    Study Focus Areas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    {mockWeakAreas
                      .filter((a) => a.mastery === "weak")
                      .slice(0, 4)
                      .map((area) => (
                        <div
                          key={area.topic}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-destructive" />
                            <span className="text-sm text-foreground">
                              {area.topic}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-destructive">
                            {area.accuracy}%
                          </span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              {/* Practice Recommendations */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-chart-3" />
                    Quick Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>
                        Practice 20 Probability questions daily to build pattern
                        recognition
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>
                        Take 1 timed mini-test every 3 days to reduce time
                        pressure errors
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>
                        Review Trigonometry basics before attempting advanced
                        problems
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>
                        Use elimination method in Coordination Compounds MCQs
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Weekly Schedule */}
        <TabsContent value="schedule">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Weekly Revision Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {weeklySchedule.map((day) => (
                  <div
                    key={day.day}
                    className="p-4 rounded-lg border border-border hover:border-primary/20 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-foreground">
                        {day.day}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {day.focus}
                      </Badge>
                    </div>
                    <div className="flex flex-col gap-2">
                      {day.tasks.map((task, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-xs text-muted-foreground"
                        >
                          <div className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
                          {task}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Exam Strategy */}
        <TabsContent value="strategy">
          <div className="flex flex-col gap-6">
            {examStrategies.map((strategy) => (
              <Card key={strategy.title}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <strategy.icon className="w-4 h-4 text-primary" />
                    {strategy.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    {strategy.tips.map((tip, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                      >
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-primary">
                            {i + 1}
                          </span>
                        </div>
                        <span className="text-sm text-foreground leading-relaxed">
                          {tip}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
