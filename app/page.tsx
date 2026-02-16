import Link from "next/link"
import {
  BarChart3,
  Brain,
  ChevronRight,
  LineChart,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { LandingMobileNav } from "@/components/landing-mobile-nav"

const features = [
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description:
      "Upload test results and get detailed breakdowns by subject, topic, score, accuracy, and time analysis.",
  },
  {
    icon: Target,
    title: "Weak Topic Detection",
    description:
      "Automatically identify weak subjects, improving topics, and areas of mastery with precision scoring.",
  },
  {
    icon: Zap,
    title: "Mistake Pattern Detection",
    description:
      "Understand WHY mistakes happen: conceptual gaps, calculation errors, time pressure, or guessing behavior.",
  },
  {
    icon: Sparkles,
    title: "AI Study Recommendations",
    description:
      "Get personalized study plans, practice schedules, and test strategies powered by AI analysis.",
  },
  {
    icon: LineChart,
    title: "Progress Tracking",
    description:
      "Visualize improvement over time with before/after comparisons, mastery growth, and learning curves.",
  },
  {
    icon: TrendingUp,
    title: "Score Prediction",
    description:
      "Predict your next test score, exam clearing probability, and get specific advice to reach your target.",
  },
]

const stats = [
  { value: "95%", label: "Accuracy in weak area detection" },
  { value: "+28%", label: "Avg. score improvement" },
  { value: "10K+", label: "Tests analyzed" },
  { value: "78%", label: "Exam clearing rate" },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground tracking-tight font-display">
              ExamIQ
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/upload">Upload Test</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/performance">Performance</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/recommendations">AI Insights</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/progress">Progress</Link>
            </Button>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LandingMobileNav />
            <Button size="sm" className="hidden sm:inline-flex" asChild>
              <Link href="/dashboard">
                Get Started
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(217_91%_50%/0.08),transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered Exam Analytics
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight font-display text-balance leading-tight">
              Turn your mock tests into a{" "}
              <span className="text-primary">winning strategy</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto text-pretty">
              Upload your test results and get AI-powered insights: detect weak
              areas, understand mistake patterns, predict scores, and receive
              personalized study plans that actually work.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button size="lg" asChild className="w-full sm:w-auto">
                <Link href="/dashboard">
                  Start Analyzing
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="w-full sm:w-auto"
              >
                <Link href="/upload">Upload a Test</Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-4 rounded-xl bg-card border border-border"
              >
                <div className="text-2xl sm:text-3xl font-bold text-primary font-display">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-display text-balance">
              Everything you need to ace your exam
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
              From performance analytics to AI-driven study plans, ExamIQ gives
              you the edge in competitive exam preparation.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="group hover:border-primary/30 transition-colors"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-semibold text-card-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-display text-balance">
                See exactly where you stand
              </h2>
              <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                No more guessing about your preparation level. ExamIQ shows you
                precisely which topics need attention and which are already
                mastered.
              </p>
              <div className="mt-8 flex flex-col gap-4">
                {[
                  "Probability accuracy: 42% → Needs focus",
                  "Trigonometry accuracy: 38% → Critical area",
                  "Linear Equations: 90% → Mastered",
                  "Mechanics: 88% → Strong performance",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 text-sm text-foreground"
                  >
                    <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <Button className="mt-8" asChild>
                <Link href="/performance">
                  View Performance Analysis
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="text-sm font-medium text-muted-foreground mb-4">
                Sample AI Recommendation
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-foreground">
                      Study Plan
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Focus on algebra fundamentals first. Practice 20 probability
                    questions daily. Take 1 timed test every 3 days to build
                    exam stamina.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-accent" />
                    <span className="text-sm font-semibold text-foreground">
                      Prediction
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Chance of clearing exam: 78%. Improve Physics to reach 90%.
                    Your score trend shows consistent improvement.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-chart-3" />
                    <span className="text-sm font-semibold text-foreground">
                      Strategy
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Attempt Physics first. Accuracy drops after 60 min — adjust
                    time strategy. Skip low-confidence questions initially.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground font-display text-balance">
            Ready to transform your exam preparation?
          </h2>
          <p className="mt-4 text-primary-foreground/80 text-lg">
            Upload your first mock test and start getting AI-powered insights
            today.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="mt-8"
            asChild
          >
            <Link href="/dashboard">
              Get Started for Free
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded bg-primary">
                  <Brain className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-sm font-semibold text-foreground font-display">
                  ExamIQ
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-Powered Competitive Exam Analytics Platform
              </p>
            </div>
            <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <Link href="/upload" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Upload Test
              </Link>
              <Link href="/performance" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Performance
              </Link>
              <Link href="/recommendations" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                AI Insights
              </Link>
              <Link href="/progress" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Progress
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
