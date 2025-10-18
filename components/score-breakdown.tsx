import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Leaf, Thermometer, Heart, DollarSign } from "lucide-react"
import type { FishScore } from "@/lib/types"

interface ScoreBreakdownProps {
  fishScore: FishScore
}

export function ScoreBreakdown({ fishScore }: ScoreBreakdownProps) {
  const categories = [
    {
      name: "Freshness",
      score: fishScore.freshness,
      icon: Thermometer,
      color: "text-ocean-600",
      bgColor: "bg-ocean-100",
      factors: fishScore.breakdown.freshnessFactors,
    },
    {
      name: "Sustainability",
      score: fishScore.sustainability,
      icon: Leaf,
      color: "text-seaweed-600",
      bgColor: "bg-seaweed-100",
      factors: fishScore.breakdown.sustainabilityFactors,
    },
    {
      name: "Health",
      score: fishScore.health,
      icon: Heart,
      color: "text-coral-600",
      bgColor: "bg-coral-100",
      factors: fishScore.breakdown.healthFactors,
    },
    {
      name: "Price Value",
      score: fishScore.priceValue,
      icon: DollarSign,
      color: "text-amber-600",
      bgColor: "bg-amber-100",
      factors: fishScore.breakdown.priceFactors,
    },
  ]

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {categories.map((category) => {
        const Icon = category.icon
        return (
          <Card key={category.name}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-full ${category.bgColor} flex items-center justify-center`}>
                    <Icon className={`h-5 w-5 ${category.color}`} />
                  </div>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </div>
                <div className="text-2xl font-bold">{category.score}</div>
              </div>
            </CardHeader>
            <CardContent>
              <Progress value={category.score} className="mb-4" />
              <ul className="space-y-2">
                {category.factors.map((factor, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
