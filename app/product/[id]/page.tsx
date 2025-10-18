import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Share2, MapPin, Calendar, Anchor, Shield } from "lucide-react"
import { mockProducts } from "@/lib/mock-data"
import { calculateOceanTraceScore } from "@/lib/ocean-trace"
import { ScoreBreakdown } from "@/components/score-breakdown"
import { SupplyChainTimeline } from "@/components/supply-chain-timeline"
import { SupplyChainMap } from "@/components/supply-chain-map"
import { BlockchainVerification } from "@/components/blockchain-verification"
import { AIAnalysis } from "@/components/ai-analysis"

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
        {/* Batch ID - Top Right of Page Content */}
        <div className="flex justify-end mb-6">
          <div className="flex items-center gap-2 text-sm">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium text-muted-foreground">Batch ID:</span>
            <Badge variant="outline" className="font-mono text-xs">
              {product.qrCode}
            </Badge>
          </div>
        </div>

        {/* Product Header with Image on Right */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-balance">{product.name}</h1>
            <p className="text-lg text-muted-foreground mb-4">{product.species}</p>
            
            {/* Ocean Trace Score - Simple colored label */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm font-medium text-muted-foreground">Ocean Trace Score:</span>
              <Badge 
                variant="secondary" 
                className={`text-sm ${
                  oceanTraceScore.overall >= 90 ? 'bg-green-100 text-green-800' :
                  oceanTraceScore.overall >= 75 ? 'bg-blue-100 text-blue-800' :
                  oceanTraceScore.overall >= 60 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}
              >
                {oceanTraceScore.overall}/100
              </Badge>
            </div>
            
            <div className="flex gap-2 flex-wrap mb-6">
              {product.isMSCCertified && <Badge variant="secondary">MSC Certified</Badge>}
              {product.quotaCompliant && <Badge variant="secondary">Stock Compliant</Badge>}
              {product.isBlockchainVerified && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  <Shield className="h-3 w-3 mr-1" />
                  Blockchain Verified
                </Badge>
              )}
              <Badge 
                variant="secondary" 
                className={`${
                  oceanTraceScore.freshness >= 90 ? 'bg-green-100 text-green-800' :
                  oceanTraceScore.freshness >= 75 ? 'bg-blue-100 text-blue-800' :
                  oceanTraceScore.freshness >= 60 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}
              >
                {oceanTraceScore.freshness >= 90 ? 'Peak Freshness' :
                 oceanTraceScore.freshness >= 75 ? 'Very Fresh' :
                 oceanTraceScore.freshness >= 60 ? 'Fresh' :
                 'Fair Freshness'}
              </Badge>
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

        {/* Left Side Cards: AI Analysis and Nutrition */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* AI Analysis - Left side */}
          <div>
            <AIAnalysis product={product} oceanTraceScore={oceanTraceScore} />
          </div>
          
          {/* Right side - Stacked Nutrition and Additional Info */}
          <div className="space-y-6">
            {/* Nutrition Information */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Nutrition Information</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {/* Key Nutritional Highlights */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-2 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">{product.omega3Content}mg</div>
                      <div className="text-xs text-green-700">Omega-3</div>
                    </div>
                    <div className="text-center p-2 bg-blue-50 rounded-lg">
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${
                          product.mercuryLevel === 'low' ? 'bg-green-100 text-green-800' :
                          product.mercuryLevel === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        {product.mercuryLevel}
                      </Badge>
                      <div className="text-xs text-blue-700 mt-1">Mercury</div>
                    </div>
                    <div className="text-center p-2 bg-purple-50 rounded-lg">
                      <div className="text-lg font-bold text-purple-600">{oceanTraceScore.health}</div>
                      <div className="text-xs text-purple-700">Health Score</div>
                    </div>
                  </div>

                  {/* Detailed Nutrition Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between py-1">
                      <span className="text-muted-foreground">Protein:</span>
                      <span className="font-medium">High</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-muted-foreground">Fat:</span>
                      <span className="font-medium">Low</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-muted-foreground">Vitamin D:</span>
                      <span className="font-medium">Excellent</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-muted-foreground">Selenium:</span>
                      <span className="font-medium">High</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-muted-foreground">B12:</span>
                      <span className="font-medium">Excellent</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-muted-foreground">Iron:</span>
                      <span className="font-medium">Good</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Blockchain Verification */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Blockchain Verification
              </h3>
              <BlockchainVerification product={product} />
            </div>
          </div>
        </div>

        

        {/* Supply Chain Map & Timeline */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Supply Chain Journey</h2>
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
            <SupplyChainMap product={product} />
            <SupplyChainTimeline product={product} />
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Score Breakdown</h2>
          <ScoreBreakdown oceanTraceScore={oceanTraceScore} product={product} />
        </div>



      </main>
    </div>
  )
}
