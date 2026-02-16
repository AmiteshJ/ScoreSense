"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import {
  AlertCircle,
  CheckCircle2,
  FileSpreadsheet,
  Upload,
  X,
  Loader2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

type UploadStep = "select" | "uploading" | "processing" | "done"

export function UploadContent() {
  const router = useRouter()
  const [step, setStep] = useState<UploadStep>("select")
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)

  const handleFile = useCallback((f: File) => {
    setFile(f)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragActive(false)
      const f = e.dataTransfer.files[0]
      if (f && (f.name.endsWith(".csv") || f.name.endsWith(".xlsx"))) {
        handleFile(f)
      }
    },
    [handleFile]
  )

  const handleUpload = () => {
    setStep("uploading")
    let p = 0
    const interval = setInterval(() => {
      p += Math.random() * 20 + 5
      if (p >= 100) {
        p = 100
        clearInterval(interval)
        setStep("processing")
        setTimeout(() => {
          setStep("done")
        }, 2000)
      }
      setProgress(Math.min(p, 100))
    }, 300)
  }

  const useDemoData = () => {
    setStep("uploading")
    setProgress(50)
    setTimeout(() => {
      setProgress(100)
      setStep("processing")
      setTimeout(() => {
        setStep("done")
      }, 1500)
    }, 800)
  }

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground font-display">
          Upload Test Results
        </h1>
        <p className="text-muted-foreground mt-1">
          Upload your mock test CSV or use our demo data to explore the platform
        </p>
      </div>

      {step === "select" && (
        <>
          {/* Drop Zone */}
          <Card className="mb-6">
            <CardContent className="p-0">
              <div
                onDragOver={(e) => {
                  e.preventDefault()
                  setDragActive(true)
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                className={`flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg transition-colors cursor-pointer ${
                  dragActive
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/40"
                }`}
                onClick={() =>
                  document.getElementById("file-input")?.click()
                }
                role="button"
                tabIndex={0}
                aria-label="Drop CSV file here or click to browse"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <Upload className="w-7 h-7 text-primary" />
                </div>
                <p className="text-base font-medium text-foreground mb-1">
                  Drag and drop your CSV file here
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  or click to browse (CSV, XLSX)
                </p>
                <input
                  id="file-input"
                  type="file"
                  accept=".csv,.xlsx"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0]
                    if (f) handleFile(f)
                  }}
                />
                {file && (
                  <div className="flex items-center gap-2 mt-2 p-2 px-4 rounded-lg bg-muted">
                    <FileSpreadsheet className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      {file.name}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setFile(null)
                      }}
                      className="ml-2 text-muted-foreground hover:text-foreground"
                      aria-label="Remove file"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* CSV Format Info */}
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">
                Expected CSV Format
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4 font-medium text-muted-foreground">
                        Column
                      </th>
                      <th className="text-left py-2 font-medium text-muted-foreground">
                        Example
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground">
                    <tr className="border-b border-border">
                      <td className="py-2 pr-4">question_id</td>
                      <td className="py-2 text-muted-foreground">Q1, Q2, ...</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 pr-4">subject</td>
                      <td className="py-2 text-muted-foreground">Physics, Chemistry, Math</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 pr-4">topic</td>
                      <td className="py-2 text-muted-foreground">Mechanics, Calculus</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 pr-4">your_answer</td>
                      <td className="py-2 text-muted-foreground">A, B, C, D, or blank</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 pr-4">correct_answer</td>
                      <td className="py-2 text-muted-foreground">A, B, C, D</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4">time_spent</td>
                      <td className="py-2 text-muted-foreground">120 (seconds)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleUpload}
              disabled={!file}
              className="flex-1"
              size="lg"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload and Analyze
            </Button>
            <Button
              onClick={useDemoData}
              variant="outline"
              className="flex-1"
              size="lg"
            >
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Use Demo Data
            </Button>
          </div>
        </>
      )}

      {(step === "uploading" || step === "processing") && (
        <Card>
          <CardContent className="p-8 flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              {step === "uploading" ? "Uploading test data..." : "Analyzing your results..."}
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              {step === "uploading"
                ? "Securely transferring your data"
                : "Running AI analysis on your performance"}
            </p>
            <div className="w-full max-w-xs">
              <Progress value={step === "processing" ? 100 : progress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2 text-center">
                {step === "uploading"
                  ? `${Math.round(progress)}% uploaded`
                  : "Detecting patterns..."}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {step === "done" && (
        <Card>
          <CardContent className="p-8 flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Analysis Complete
            </h2>
            <p className="text-sm text-muted-foreground mb-6 text-center max-w-sm">
              Your test results have been analyzed. We found 4 weak areas and
              generated personalized study recommendations.
            </p>
            <div className="grid grid-cols-3 gap-4 w-full max-w-sm mb-8">
              <div className="text-center p-3 rounded-lg bg-muted">
                <div className="text-lg font-bold text-foreground">90</div>
                <div className="text-xs text-muted-foreground">Questions</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted">
                <div className="text-lg font-bold text-accent">75%</div>
                <div className="text-xs text-muted-foreground">Accuracy</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-muted">
                <div className="text-lg font-bold text-primary">235</div>
                <div className="text-xs text-muted-foreground">Score</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
              <Button
                onClick={() => router.push("/performance")}
                className="flex-1"
              >
                View Analysis
              </Button>
              <Button
                onClick={() => router.push("/recommendations")}
                variant="outline"
                className="flex-1"
              >
                AI Insights
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
