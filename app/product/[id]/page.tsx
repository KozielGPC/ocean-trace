import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Share2, MapPin, Calendar, Anchor, Shield, Leaf } from "lucide-react"
import { mockProducts } from "@/lib/mock-data"
import { calculateOceanTraceScore } from "@/lib/ocean-trace"
import { ScoreBadge } from "@/components/score-badge"
import { ScoreBreakdown } from "@/components/score-breakdown"
import { SupplyChainTimeline } from "@/components/supply-chain-timeline"
import { SupplyChainMap } from "@/components/supply-chain-map"
import { BlockchainVerification } from "@/components/blockchain-verification"
import { AIAnalysis } from "@/components/ai-analysis"
import { TemperatureChart } from "@/components/temperature-chart"

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = mockProducts.find((p) => p.id === id)

  if (!product) {
    notFound()
  }

  const oceanTraceScore = calculateOceanTraceScore(product)

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
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Header with Image on Right */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-balance">{product.name}</h1>
            <p className="text-lg text-muted-foreground mb-6">{product.species}</p>
            
            <div className="flex gap-2 flex-wrap mb-6">
              {product.isMSCCertified && <Badge variant="secondary">MSC Certified</Badge>}
              {product.quotaCompliant && <Badge variant="secondary">Quota Compliant</Badge>}
              {product.isBlockchainVerified && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  <Shield className="h-3 w-3 mr-1" />
                  Blockchain Verified
                </Badge>
              )}
              <Badge variant="outline">{product.fishingMethod}</Badge>
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

          <div>
            <div className="aspect-video rounded-xl overflow-hidden bg-card">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Left Side Cards: Score & AI Analysis */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* AI Analysis - Left side */}
          <div className="min-h-[600px]">
            <AIAnalysis product={product} oceanTraceScore={oceanTraceScore} />
          </div>
          
          {/* Right side cards - stacked vertically */}
          <div className="min-h-[600px] flex flex-col gap-6">
            {/* Ocean Trace Score Card */}
            <Card className="flex-1 min-h-0">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-lg mb-4">Ocean Trace Score</CardTitle>
                <div className="flex justify-center">
                  <ScoreBadge score={oceanTraceScore.overall} size="lg" />
                </div>
              </CardHeader>
            </Card>

            {/* CO2 Footprint Card */}
            <Card className="flex-1 min-h-0">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-green-600" />
                  Environmental Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col justify-center h-full">
                <div className="space-y-4">
                  <div>
                    <div className="text-2xl font-bold text-green-600">{product.carbonFootprint}kg</div>
                    <div className="text-sm text-muted-foreground">CO2 equivalent</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Carbon footprint from catch to retail
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sustainability Rating Card */}
            <Card className="flex-1 min-h-0">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  Sustainability
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col justify-center h-full">
                <div className="space-y-4">
                  <div>
                    <Badge 
                      variant="secondary" 
                      className={`text-lg px-4 py-2 ${
                        product.sustainabilityRating === 'excellent' ? 'bg-green-100 text-green-800' :
                        product.sustainabilityRating === 'good' ? 'bg-blue-100 text-blue-800' :
                        product.sustainabilityRating === 'fair' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      {product.sustainabilityRating.charAt(0).toUpperCase() + product.sustainabilityRating.slice(1)}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>Method: {product.fishingMethod}</div>
                    {product.isMSCCertified && <div className="text-green-600">✓ MSC Certified</div>}
                    {product.quotaCompliant && <div className="text-green-600">✓ Quota Compliant</div>}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Score Breakdown</h2>
          <ScoreBreakdown oceanTraceScore={oceanTraceScore} />
        </div>

        {/* Supply Chain Map & Timeline */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Supply Chain Journey</h2>
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
            <SupplyChainMap product={product} />
            <SupplyChainTimeline product={product} />
          </div>
        </div>

        {/* Blockchain Verification */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Blockchain Verification</h2>
          <BlockchainVerification product={product} />
        </div>

        {/* Temperature Chart */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Temperature History</h2>
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
                This {product.name.toLowerCase()} has been carefully tracked from ocean to your plate. With a Ocean Trace
                of {oceanTraceScore.overall}/100, it represents a{" "}
                {oceanTraceScore.overall >= 90 ? "excellent" : oceanTraceScore.overall >= 75 ? "good" : "fair"} choice for consumers
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
