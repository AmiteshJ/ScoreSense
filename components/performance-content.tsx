"use client"

import {
  AlertTriangle,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Brain,
  Calculator,
  CheckCircle2,
  Clock,
  HelpCircle,
  Minus,
  Sparkles,
  Target,
  TrendingUp,
  XCircle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  getLatestTest,
  mockWeakAreas,
  mockStrongAreas,
  mockMistakePatterns,
} from "@/lib/mock-data"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Cell,
  PieChart,
  Pie,
} from "recharts"
import Link from "next/link"
import { ClientOnly } from "@/components/client-only"

const masteryColors: Record<string, string> = {
  weak: "text-destructive",
  improving: "text-chart-3",
  strong: "text-primary",
  mastered: "text-accent",
}

const masteryBg: Record<string, string> = {
  weak: "bg-destructive/10",
  improving: "bg-chart-3/10",
  strong: "bg-primary/10",
  mastered: "bg-accent/10",
}

const mistakeIcons: Record<string, typeof Brain> = {
  conceptual: BookOpen,
  calculation: Calculator,
  "time-pressure": Clock,
  guessing: HelpCircle,
}

const mistakeColors = [
  "hsl(217, 91%, 50%)",
  "hsl(32, 95%, 55%)",
  "hsl(0, 84%, 60%)",
  "hsl(270, 60%, 55%)",
]

export function PerformanceContent() {
  const latest = getLatestTest()

  // Build radar data from all topics across subjects
  const allTopics = latest.subjects.flatMap((s) =>
    s.topics.map((t) => ({
      topic: t.name,
      accuracy: t.accuracy,
      subject: s.name,
    }))
  )

  // Top-level subject accuracy data
  const subjectAccuracy = latest.subjects.map((s) => ({
    name: s.name,
    accuracy: Math.round((s.correct / s.attempted) * 100),
    score: s.score,
    maxScore: s.maxScore,
    timeTaken: s.timeTaken,
  }))

  const mistakePieData = mockMistakePatterns.map((m) => ({
    name: m.label,
    value: m.percentage,
  }))

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground font-display">
          Performance Analysis
        </h1>
        <p className="text-muted-foreground mt-1">
          Deep dive into your latest test: {latest.testName}
        </p>
      </div>

      {/* Subject Overview Cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {subjectAccuracy.map((s, i) => (
          <Card key={s.name}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-muted-foreground">
                  {s.name}
                </span>
                <Badge
                  variant={s.accuracy >= 75 ? "default" : s.accuracy >= 50 ? "secondary" : "destructive"}
                  className="text-xs"
                >
                  {s.accuracy}% accuracy
                </Badge>
              </div>
              <div className="text-2xl font-bold text-foreground font-display">
                {s.score}/{s.maxScore}
              </div>
              <Progress value={s.accuracy} className="h-1.5 mt-3" />
              <p className="text-xs text-muted-foreground mt-2">
                Time: {s.timeTaken} min
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="weak" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="weak">Weak Areas</TabsTrigger>
          <TabsTrigger value="strong">Strong Areas</TabsTrigger>
          <TabsTrigger value="topics">All Topics</TabsTrigger>
        </TabsList>

        {/* Weak Areas */}
        <TabsContent value="weak">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                  Weak Topics Detected
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  {mockWeakAreas
                    .filter((a) => a.mastery === "weak")
                    .map((area) => (
                      <div
                        key={area.topic}
                        className="flex items-center justify-between p-3 rounded-lg border border-border"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-medium text-foreground">
                              {area.topic}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {area.subject}
                            </Badge>
                          </div>
                          <Progress
                            value={area.accuracy}
                            className="h-1.5 mt-2"
                          />
                        </div>
                        <div className="ml-4 text-right">
                          <span className="text-lg font-bold text-destructive">
                            {area.accuracy}%
                          </span>
                          <div className="flex items-center gap-0.5 text-xs text-muted-foreground">
                            {area.trend === "up" ? (
                              <ArrowUpRight className="w-3 h-3 text-accent" />
                            ) : area.trend === "down" ? (
                              <ArrowDownRight className="w-3 h-3 text-destructive" />
                            ) : (
                              <Minus className="w-3 h-3" />
                            )}
                            {area.trend === "stable"
                              ? "No change"
                              : `${area.trendValue > 0 ? "+" : ""}${area.trendValue}%`}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-chart-3" />
                  Improving Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  {mockWeakAreas
                    .filter((a) => a.mastery === "improving")
                    .map((area) => (
                      <div
                        key={area.topic}
                        className="flex items-center justify-between p-3 rounded-lg border border-border"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-medium text-foreground">
                              {area.topic}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {area.subject}
                            </Badge>
                          </div>
                          <Progress
                            value={area.accuracy}
                            className="h-1.5 mt-2"
                          />
                        </div>
                        <div className="ml-4 text-right">
                          <span className="text-lg font-bold text-chart-3">
                            {area.accuracy}%
                          </span>
                          <div className="flex items-center gap-0.5 text-xs text-accent">
                            <ArrowUpRight className="w-3 h-3" />+
                            {area.trendValue}%
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="mt-4 p-3 rounded-lg bg-chart-3/5 border border-chart-3/10">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      Positive momentum:
                    </span>{" "}
                    Probability and Electromagnetism are showing clear
                    improvement. Keep up the focused practice.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Strong Areas */}
        <TabsContent value="strong">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                Strong & Mastered Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {mockStrongAreas.map((area) => (
                  <div
                    key={area.topic}
                    className={`p-4 rounded-lg border border-border ${masteryBg[area.mastery]}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">
                        {area.topic}
                      </span>
                      <Badge
                        className={`text-xs ${
                          area.mastery === "mastered"
                            ? "bg-accent text-accent-foreground"
                            : "bg-primary text-primary-foreground"
                        }`}
                      >
                        {area.mastery}
                      </Badge>
                    </div>
                    <div className={`text-2xl font-bold font-display ${masteryColors[area.mastery]}`}>
                      {area.accuracy}%
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {area.subject}
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-xs text-accent">
                      <ArrowUpRight className="w-3 h-3" />+{area.trendValue}%
                      improvement
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* All Topics */}
        <TabsContent value="topics">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                Topic-wise Accuracy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ClientOnly fallback={<div className="h-80 flex items-center justify-center text-muted-foreground text-sm">Loading chart...</div>}>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={allTopics}
                    layout="vertical"
                    margin={{ left: 120 }}
                    barCategoryGap="15%"
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(220, 13%, 90%)"
                      horizontal={false}
                    />
                    <XAxis
                      type="number"
                      domain={[0, 100]}
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      stroke="hsl(220, 10%, 46%)"
                    />
                    <YAxis
                      type="category"
                      dataKey="topic"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      stroke="hsl(220, 10%, 46%)"
                      width={110}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(0, 0%, 100%)",
                        border: "1px solid hsl(220, 13%, 90%)",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                      formatter={(value: number) => [`${value}%`, "Accuracy"]}
                    />
                    <Bar dataKey="accuracy" radius={[0, 4, 4, 0]}>
                      {allTopics.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            entry.accuracy >= 80
                              ? "hsl(162, 72%, 45%)"
                              : entry.accuracy >= 60
                              ? "hsl(217, 91%, 50%)"
                              : entry.accuracy >= 40
                              ? "hsl(32, 95%, 55%)"
                              : "hsl(0, 84%, 60%)"
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              </ClientOnly>
              <div className="flex flex-wrap gap-4 mt-4 justify-center">
                {[
                  { label: "Mastered (80%+)", color: "hsl(162, 72%, 45%)" },
                  { label: "Strong (60-79%)", color: "hsl(217, 91%, 50%)" },
                  { label: "Improving (40-59%)", color: "hsl(32, 95%, 55%)" },
                  { label: "Weak (<40%)", color: "hsl(0, 84%, 60%)" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground"
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    {item.label}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Mistake Pattern Detection */}
      <div className="mb-8">
        <h2 className="text-lg font-bold text-foreground font-display mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          Mistake Pattern Detection
        </h2>
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                Why Your Mistakes Happen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {mockMistakePatterns.map((pattern, i) => {
                  const Icon = mistakeIcons[pattern.type]
                  return (
                    <div
                      key={pattern.type}
                      className="flex items-start gap-4 p-4 rounded-lg border border-border"
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: `${mistakeColors[i]}15`,
                        }}
                      >
                        <Icon
                          className="w-5 h-5"
                          style={{ color: mistakeColors[i] }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-semibold text-foreground">
                            {pattern.label}
                          </span>
                          <span
                            className="text-sm font-bold"
                            style={{ color: mistakeColors[i] }}
                          >
                            {pattern.percentage}%
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {pattern.description}
                        </p>
                        <Progress
                          value={pattern.percentage}
                          className="h-1.5 mt-2"
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                Mistake Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ClientOnly fallback={<div className="h-48 flex items-center justify-center text-muted-foreground text-sm">Loading chart...</div>}>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mistakePieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {mistakePieData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={mistakeColors[index]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(0, 0%, 100%)",
                        border: "1px solid hsl(220, 13%, 90%)",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                      formatter={(value: number) => [`${value}%`, "Percentage"]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              </ClientOnly>
              <div className="flex flex-col gap-2 mt-2">
                {mockMistakePatterns.map((p, i) => (
                  <div
                    key={p.type}
                    className="flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: mistakeColors[i] }}
                      />
                      <span className="text-muted-foreground">{p.label}</span>
                    </div>
                    <span className="font-medium text-foreground">
                      {p.count} mistakes
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA */}
      <Card className="bg-primary/5 border-primary/10">
        <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Get personalized study recommendations
              </p>
              <p className="text-sm text-muted-foreground">
                AI-generated study plans based on your weak areas and mistake
                patterns
              </p>
            </div>
          </div>
          <Button asChild>
            <Link href="/recommendations">
              View Recommendations
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
