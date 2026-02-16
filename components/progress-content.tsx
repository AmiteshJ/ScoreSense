"use client"

import {
  ArrowUpRight,
  Award,
  CheckCircle2,
  Flame,
  Gauge,
  LineChart as LineChartIcon,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  mockProgressHistory,
  mockTestResults,
  mockStrongAreas,
  getScorePrediction,
  getStudyEfficiency,
  getOverallAccuracy,
} from "@/lib/mock-data"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  ReferenceLine,
} from "recharts"
import { ClientOnly } from "@/components/client-only"

const COLORS = {
  primary: "hsl(217, 91%, 50%)",
  accent: "hsl(162, 72%, 45%)",
  orange: "hsl(32, 95%, 55%)",
  red: "hsl(0, 84%, 60%)",
}

export function ProgressContent() {
  const prediction = getScorePrediction()
  const efficiency = getStudyEfficiency()
  const accuracy = getOverallAccuracy()

  const chartData = mockProgressHistory.map((entry) => ({
    name: entry.testName.replace("Practice Test ", "PT ").replace("Mock Test ", "MT "),
    score: entry.score,
    accuracy: entry.accuracy,
  }))

  // Add predicted point
  const chartDataWithPrediction = [
    ...chartData,
    {
      name: "Predicted",
      score: prediction.predicted,
      accuracy: Math.min(Math.round(prediction.predicted / 3), 100),
    },
  ]

  // Subject-wise progress across tests
  const subjectProgress = mockTestResults.map((test) => ({
    name: test.testName.replace("JEE Main ", ""),
    Physics: test.subjects.find((s) => s.name === "Physics")?.score ?? 0,
    Chemistry: test.subjects.find((s) => s.name === "Chemistry")?.score ?? 0,
    Mathematics: test.subjects.find((s) => s.name === "Mathematics")?.score ?? 0,
  }))

  // Mastery timeline
  const masteryData = [
    { topic: "Mechanics", tests: [75, 88, 88] },
    { topic: "Thermodynamics", tests: [80, 80, 100] },
    { topic: "Optics", tests: [50, 67, 83] },
    { topic: "Organic Chem", tests: [70, 80, 90] },
    { topic: "Calculus", tests: [63, 75, 88] },
    { topic: "Probability", tests: [40, 60, 60] },
    { topic: "Trigonometry", tests: [20, 20, 20] },
  ]

  const scoreImprovement =
    mockProgressHistory[mockProgressHistory.length - 1].score -
    mockProgressHistory[0].score

  const accuracyImprovement =
    mockProgressHistory[mockProgressHistory.length - 1].accuracy -
    mockProgressHistory[0].accuracy

  // Badges/achievements
  const achievements = [
    {
      icon: Flame,
      label: "7 Test Streak",
      description: "Completed 7 consecutive tests",
      earned: true,
    },
    {
      icon: TrendingUp,
      label: "Score Climber",
      description: "+115 score improvement",
      earned: true,
    },
    {
      icon: Target,
      label: "Chemistry Master",
      description: "90%+ accuracy in Chemistry",
      earned: true,
    },
    {
      icon: Zap,
      label: "Speed Demon",
      description: "Complete test under time limit",
      earned: true,
    },
    {
      icon: Award,
      label: "Top Performer",
      description: "Score 250+ in a mock test",
      earned: false,
    },
    {
      icon: Trophy,
      label: "Exam Ready",
      description: "90%+ clearing probability",
      earned: false,
    },
  ]

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground font-display">
          Progress Tracking
        </h1>
        <p className="text-muted-foreground mt-1">
          Track your improvement over time and predict future performance
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Score Growth
              </span>
              <ArrowUpRight className="w-4 h-4 text-accent" />
            </div>
            <div className="text-2xl font-bold text-accent font-display">
              +{scoreImprovement}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {mockProgressHistory[0].score} to{" "}
              {mockProgressHistory[mockProgressHistory.length - 1].score}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Accuracy Gain
              </span>
              <ArrowUpRight className="w-4 h-4 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary font-display">
              +{accuracyImprovement}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              From {mockProgressHistory[0].accuracy}% to{" "}
              {mockProgressHistory[mockProgressHistory.length - 1].accuracy}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Next Prediction
              </span>
              <Sparkles className="w-4 h-4 text-chart-3" />
            </div>
            <div className="text-2xl font-bold text-chart-3 font-display">
              {prediction.predicted}/300
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Based on your trajectory
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Clearing Chance
              </span>
              <Gauge className="w-4 h-4 text-chart-5" />
            </div>
            <div className="text-2xl font-bold text-chart-5 font-display">
              {prediction.clearingChance}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Target: {prediction.targetScore}/300
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Score Trend with Prediction */}
      <Card className="mb-6">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <LineChartIcon className="w-4 h-4 text-primary" />
            Score Trajectory & Prediction
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            {chartDataWithPrediction.length} data points
          </Badge>
        </CardHeader>
        <CardContent>
          <ClientOnly fallback={<div className="h-72 flex items-center justify-center text-muted-foreground text-sm">Loading chart...</div>}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartDataWithPrediction}>
                <defs>
                  <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.15} />
                    <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 90%)" />
                <XAxis
                  dataKey="name"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  stroke="hsl(220, 10%, 46%)"
                />
                <YAxis
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  stroke="hsl(220, 10%, 46%)"
                  domain={[0, 300]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0, 0%, 100%)",
                    border: "1px solid hsl(220, 13%, 90%)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <ReferenceLine
                  y={200}
                  stroke={COLORS.accent}
                  strokeDasharray="5 5"
                  label={{
                    value: "Clearing Cutoff (200)",
                    position: "insideTopRight",
                    fontSize: 11,
                    fill: "hsl(162, 72%, 45%)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke={COLORS.primary}
                  strokeWidth={2.5}
                  fill="url(#scoreGradient)"
                  dot={(props: { cx: number; cy: number; index: number }) => {
                    const { cx, cy, index } = props
                    const isLast = index === chartDataWithPrediction.length - 1
                    return (
                      <circle
                        key={`dot-${index}`}
                        cx={cx}
                        cy={cy}
                        r={isLast ? 6 : 4}
                        fill={isLast ? COLORS.accent : COLORS.primary}
                        stroke={isLast ? COLORS.accent : COLORS.primary}
                        strokeWidth={isLast ? 2 : 0}
                        fillOpacity={isLast ? 0.3 : 1}
                      />
                    )
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          </ClientOnly>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className="w-3 h-0.5 rounded bg-primary" />
              Actual Scores
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className="w-2.5 h-2.5 rounded-full border-2 border-accent bg-accent/30" />
              Predicted
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className="w-3 h-0 border-t-2 border-dashed border-accent" />
              Cutoff Line
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Subject Progress */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">
              Subject-wise Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ClientOnly fallback={<div className="h-60 flex items-center justify-center text-muted-foreground text-sm">Loading chart...</div>}>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectProgress} barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 90%)" />
                  <XAxis
                    dataKey="name"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    stroke="hsl(220, 10%, 46%)"
                  />
                  <YAxis
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    stroke="hsl(220, 10%, 46%)"
                    domain={[0, 100]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0, 0%, 100%)",
                      border: "1px solid hsl(220, 13%, 90%)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="Physics" fill={COLORS.primary} radius={[3, 3, 0, 0]} />
                  <Bar dataKey="Chemistry" fill={COLORS.accent} radius={[3, 3, 0, 0]} />
                  <Bar dataKey="Mathematics" fill={COLORS.orange} radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            </ClientOnly>
            <div className="flex justify-center gap-5 mt-3">
              {[
                { name: "Physics", color: COLORS.primary },
                { name: "Chemistry", color: COLORS.accent },
                { name: "Mathematics", color: COLORS.orange },
              ].map((item) => (
                <div key={item.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.name}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mastery Growth */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">
              Topic Mastery Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {masteryData.map((topic) => {
                const latest = topic.tests[topic.tests.length - 1]
                const first = topic.tests[0]
                const change = latest - first
                return (
                  <div key={topic.topic} className="flex items-center gap-3">
                    <span className="text-sm text-foreground w-28 shrink-0 truncate">
                      {topic.topic}
                    </span>
                    <div className="flex-1">
                      <Progress
                        value={latest}
                        className="h-2"
                      />
                    </div>
                    <div className="flex items-center gap-2 w-20 justify-end">
                      <span className="text-sm font-medium text-foreground">
                        {latest}%
                      </span>
                      {change > 0 && (
                        <span className="text-xs text-accent flex items-center">
                          <ArrowUpRight className="w-3 h-3" />
                          {change}
                        </span>
                      )}
                      {change === 0 && (
                        <span className="text-xs text-muted-foreground">--</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Score Prediction Detail */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            Exam Success Prediction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="flex flex-col items-center p-6 rounded-xl bg-primary/5 border border-primary/10">
              <Sparkles className="w-8 h-8 text-primary mb-3" />
              <span className="text-3xl font-bold text-primary font-display">
                {prediction.predicted}
              </span>
              <span className="text-sm text-muted-foreground mt-1">
                Predicted Score
              </span>
              <span className="text-xs text-muted-foreground mt-2">
                out of 300
              </span>
            </div>
            <div className="flex flex-col items-center p-6 rounded-xl bg-accent/5 border border-accent/10">
              <TrendingUp className="w-8 h-8 text-accent mb-3" />
              <span className="text-3xl font-bold text-accent font-display">
                {prediction.clearingChance}%
              </span>
              <span className="text-sm text-muted-foreground mt-1">
                Clearing Probability
              </span>
              <span className="text-xs text-muted-foreground mt-2">
                cutoff: {prediction.targetScore}
              </span>
            </div>
            <div className="flex flex-col items-center p-6 rounded-xl bg-chart-3/5 border border-chart-3/10">
              <Gauge className="w-8 h-8 text-chart-3 mb-3" />
              <span className="text-3xl font-bold text-chart-3 font-display">
                {efficiency}%
              </span>
              <span className="text-sm text-muted-foreground mt-1">
                Study Efficiency
              </span>
              <span className="text-xs text-muted-foreground mt-2">
                accuracy / time ratio
              </span>
            </div>
          </div>
          <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-medium text-foreground">
                How to reach 90% clearing probability:
              </span>{" "}
              Improve your Mathematics score from 63 to 75+ by focusing on
              Trigonometry and Coordinate Geometry. Even a 50% accuracy
              improvement in these two topics would add approximately 20
              marks, pushing your predicted score above 270 and your
              clearing probability above 90%.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Gamification: Achievements */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Trophy className="w-4 h-4 text-chart-3" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {achievements.map((badge) => (
              <div
                key={badge.label}
                className={`flex flex-col items-center p-4 rounded-xl border text-center transition-colors ${
                  badge.earned
                    ? "border-chart-3/20 bg-chart-3/5"
                    : "border-border bg-muted/30 opacity-50"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    badge.earned ? "bg-chart-3/15" : "bg-muted"
                  }`}
                >
                  <badge.icon
                    className={`w-5 h-5 ${
                      badge.earned ? "text-chart-3" : "text-muted-foreground"
                    }`}
                  />
                </div>
                <span className="text-xs font-semibold text-foreground">
                  {badge.label}
                </span>
                <span className="text-[10px] text-muted-foreground mt-1 leading-tight">
                  {badge.description}
                </span>
                {badge.earned && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent mt-2" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
