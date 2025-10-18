import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Share2, MapPin, Calendar, Anchor } from "lucide-react"
import { mockProducts } from "@/lib/mock-data"
import { calculateFishScore } from "@/lib/fish-score"
import { ScoreBadge } from "@/components/score-badge"
import { ScoreBreakdown } from "@/components/score-breakdown"
import { SupplyChainTimeline } from "@/components/supply-chain-timeline"
import { TemperatureChart } from "@/components/temperature-chart"

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = mockProducts.find((p) => p.id === id)

  if (!product) {
    notFound()
  }

  const fishScore = calculateFishScore(product)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/scan" className="flex items-center gap-2 text-primary hover:text-primary/80">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">Back to Scan</span>
          </Link>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Product Header */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="aspect-video rounded-xl overflow-hidden bg-card mb-4">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {product.isMSCCertified && <Badge variant="secondary">MSC Certified</Badge>}
              {product.quotaCompliant && <Badge variant="secondary">Quota Compliant</Badge>}
              <Badge variant="outline">{product.fishingMethod}</Badge>
            </div>
          </div>

          <div>
            <h1 className="text-4xl font-bold mb-2 text-balance">{product.name}</h1>
            <p className="text-lg text-muted-foreground mb-6">{product.species}</p>

            <div className="flex items-center justify-center mb-6 py-6 bg-card rounded-xl">
              <ScoreBadge score={fishScore.overall} size="lg" />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Price</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">${(product.price / product.weight).toFixed(2)}/lb</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Carbon Footprint</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{product.carbonFootprint}kg</div>
                  <div className="text-sm text-muted-foreground">CO2 equivalent</div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Caught in {product.caughtLocation}</div>
                  <div className="text-muted-foreground">{formatDate(product.caughtDate)}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Anchor className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Vessel: {product.vesselName}</div>
                  <div className="text-muted-foreground">Method: {product.fishingMethod}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Available at {product.retailer}</div>
                  <div className="text-muted-foreground">Since {formatDate(product.shelfDate)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">FishScore Breakdown</h2>
          <ScoreBreakdown fishScore={fishScore} />
        </div>

        {/* Supply Chain & Temperature */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <SupplyChainTimeline product={product} />
          <TemperatureChart product={product} />
        </div>

        {/* Additional Info */}
        <Card>
          <CardHeader>
            <CardTitle>Why Choose This Product?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                This {product.name.toLowerCase()} has been carefully tracked from ocean to your plate. With a FishScore
                of {fishScore.overall}/100, it represents a{" "}
                {fishScore.overall >= 90 ? "excellent" : fishScore.overall >= 75 ? "good" : "fair"} choice for consumers
                who care about freshness, sustainability, and health. The product has maintained optimal temperature
                throughout its journey and comes from {product.quotaCompliant ? "quota-compliant" : ""} fishing
                operations.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
