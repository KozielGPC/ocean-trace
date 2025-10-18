import { cn } from "@/lib/utils"

interface ScoreBadgeProps {
  score: number
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
}

export function ScoreBadge({ score, size = "md", showLabel = true }: ScoreBadgeProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "score-gradient-excellent"
    if (score >= 75) return "score-gradient-good"
    if (score >= 60) return "score-gradient-fair"
    return "score-gradient-poor"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent"
    if (score >= 75) return "Good"
    if (score >= 60) return "Fair"
    return "Poor"
  }

  const sizeClasses = {
    sm: "h-16 w-16 text-2xl",
    md: "h-24 w-24 text-4xl",
    lg: "h-32 w-32 text-5xl",
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          "rounded-full flex items-center justify-center font-bold text-white shadow-lg",
          getScoreColor(score),
          sizeClasses[size],
        )}
      >
        {score}
      </div>
      {showLabel && <div className="text-sm font-medium text-muted-foreground">{getScoreLabel(score)}</div>}
    </div>
  )
}
