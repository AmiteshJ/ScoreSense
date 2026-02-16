"use client"

import Link from "next/link"
import { ClientOnly } from "@/components/client-only"
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Brain,
  CheckCircle2,
  Clock,
  Sparkles,
  Target,
  TrendingUp,
  XCircle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  getLatestTest,
  getOverallAccuracy,
  getScorePrediction,
  getStudyEfficiency,
  mockWeakAreas,
  mockProgressHistory,
} from "@/lib/mock-data"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const COLORS = [
  "hsl(217, 91%, 50%)",
  "hsl(162, 72%, 45%)",
  "hsl(32, 95%, 55%)",
]

export function DashboardContent() {
  const latest = getLatestTest()
  const accuracy = getOverallAccuracy()
  const prediction = getScorePrediction()
  const efficiency = getStudyEfficiency()

  const subjectData = latest.subjects.map((s) => ({
    name: s.name,
    score: s.score,
    maxScore: s.maxScore,
  }))

  const scoreData = mockProgressHistory.map((entry) => ({
    name: entry.testName.replace("Practice Test ", "PT ").replace("Mock Test ", "MT "),
    score: entry.score,
    accuracy: entry.accuracy,
  }))

  const attemptData = [
    { name: "Correct", value: latest.correct },
    { name: "Incorrect", value: latest.incorrect },
    { name: "Skipped", value: latest.skipped },
  ]

  const statCards = [
    {
      label: "Latest Score",
      value: `${latest.score}/${latest.maxScore}`,
      icon: Target,
      description: `${latest.testName}`,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Accuracy",
      value: `${accuracy}%`,
      icon: CheckCircle2,
      description: `${latest.correct} of ${latest.attempted} correct`,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      label: "Predicted Score",
      value: `${prediction.predicted}/300`,
      icon: TrendingUp,
      description: `${prediction.clearingChance}% clearing chance`,
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
    },
    {
      label: "Study Efficiency",
      value: `${efficiency}%`,
      icon: Sparkles,
      description: "Accuracy / Time ratio",
      color: "text-chart-5",
      bgColor: "bg-chart-5/10",
    },
  ]

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground font-display">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Your exam performance overview at a glance
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </span>
                <div className={`w-8 h-8 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground font-display">
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Score Trend */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">Score Trend</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/progress">
                View Details
                <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <ClientOnly fallback={<div className="h-64 flex items-center justify-center text-muted-foreground text-sm">Loading chart...</div>}>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={scoreData}>
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
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="hsl(217, 91%, 50%)"
                    strokeWidth={2.5}
                    dot={{ fill: "hsl(217, 91%, 50%)", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            </ClientOnly>
          </CardContent>
        </Card>

        {/* Attempt Breakdown */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">
              Question Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ClientOnly fallback={<div className="h-48 flex items-center justify-center text-muted-foreground text-sm">Loading chart...</div>}>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={attemptData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {attemptData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0, 0%, 100%)",
                      border: "1px solid hsl(220, 13%, 90%)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            </ClientOnly>
            <div className="flex justify-center gap-4 mt-2">
              {attemptData.map((entry, i) => (
                <div key={entry.name} className="flex items-center gap-1.5 text-xs">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: COLORS[i] }}
                  />
                  <span className="text-muted-foreground">
                    {entry.name} ({entry.value})
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Subject Performance */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">
              Subject Performance
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/performance">
                Details
                <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <ClientOnly fallback={<div className="h-52 flex items-center justify-center text-muted-foreground text-sm">Loading chart...</div>}>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectData} barCategoryGap="30%">
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
                  <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                    {subjectData.map((_, index) => (
                      <Cell key={`bar-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            </ClientOnly>
            <div className="mt-4 flex flex-col gap-2">
              {latest.subjects.map((s, i) => (
                <div key={s.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: COLORS[i] }}
                    />
                    <span className="text-sm text-foreground">{s.name}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {s.score}/{s.maxScore}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weak Areas */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">
              Areas Needing Attention
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/performance">
                View All
                <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {mockWeakAreas
                .filter((a) => a.mastery === "weak")
                .slice(0, 4)
                .map((area) => (
                  <div
                    key={area.topic}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">
                          {area.topic}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {area.subject}
                        </span>
                      </div>
                      <div className="mt-2">
                        <Progress
                          value={area.accuracy}
                          className="h-1.5"
                        />
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <span className="text-sm font-bold text-destructive">
                        {area.accuracy}%
                      </span>
                      {area.trend === "up" && (
                        <div className="flex items-center gap-0.5 text-xs text-accent">
                          <ArrowUpRight className="w-3 h-3" />+{area.trendValue}%
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>

            <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/10">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">
                  AI Quick Insight
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Focus on Trigonometry and Coordinate Geometry this week.
                These topics have the highest improvement potential for your
                next test score.
              </p>
              <Button size="sm" variant="ghost" className="mt-2 text-primary" asChild>
                <Link href="/recommendations">
                  Get Full Study Plan
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
