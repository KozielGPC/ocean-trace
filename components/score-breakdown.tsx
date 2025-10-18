import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Leaf, Thermometer, Heart, Shield, Ship, Clock, Droplets, Target } from "lucide-react"
import type { OceanTraceScore, Product } from "@/lib/types"

interface ScoreBreakdownProps {
  oceanTraceScore: OceanTraceScore
  product: Product
}

export function ScoreBreakdown({ oceanTraceScore, product }: ScoreBreakdownProps) {
  const categories = [
    {
      name: "Freshness",
      score: oceanTraceScore.freshness,
      icon: Thermometer,
      color: "text-ocean-600",
      bgColor: "bg-ocean-100",
      factors: oceanTraceScore.breakdown.freshnessFactors,
    },
    {
      name: "Health",
      score: oceanTraceScore.health,
      icon: Heart,
      color: "text-coral-600",
      bgColor: "bg-coral-100",
      factors: oceanTraceScore.breakdown.healthFactors,
    },
  ]

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50 border-green-200'
    if (score >= 75) return 'text-blue-600 bg-blue-50 border-blue-200'
    if (score >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    return 'text-red-600 bg-red-50 border-red-200'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent'
    if (score >= 75) return 'Good'
    if (score >= 60) return 'Fair'
    return 'Poor'
  }

  return (
    <div className="space-y-8">
      {/* Main Score Categories */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Enhanced Freshness Card */}
        <Card className="relative overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-ocean-100 flex items-center justify-center">
                  <Thermometer className="h-6 w-6 text-ocean-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Freshness</CardTitle>
                  <p className="text-xs text-muted-foreground">{getScoreLabel(oceanTraceScore.freshness)} Performance</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-ocean-600">{oceanTraceScore.freshness}</div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Progress value={oceanTraceScore.freshness} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0</span>
                <span>100</span>
              </div>
            </div>

            {/* Temperature Monitoring */}
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Thermometer className="h-4 w-4 text-blue-600" />
                <h4 className="font-semibold text-sm text-blue-800">Temperature Monitoring</h4>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-center">
                  <div className="font-bold text-blue-600">{product.temperatureHistory[0]?.temperature || 2}°C</div>
                  <div className="text-blue-700">Current Temp</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-green-600">Maintained</div>
                  <div className="text-green-700">Cold Chain</div>
                </div>
              </div>
            </div>

            {/* Time Information */}
            <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-purple-600" />
                <h4 className="font-semibold text-sm text-purple-800">Timeline</h4>
              </div>
              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-purple-700">Caught:</span>
                  <span className="font-medium">{new Date(product.caughtDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-700">Processed:</span>
                  <span className="font-medium">{new Date(product.processedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-700">Facility:</span>
                  <span className="font-medium text-xs">{product.processingFacility}</span>
                </div>
              </div>
            </div>
            
            {/* Key Factors */}
            <div className={`p-3 rounded-lg border ${getScoreColor(oceanTraceScore.freshness)}`}>
              <h4 className="font-semibold text-sm mb-2">Quality Indicators</h4>
              <ul className="space-y-1">
                {oceanTraceScore.breakdown.freshnessFactors.map((factor, idx) => (
                  <li key={idx} className="text-xs flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Health Card */}
        <Card className="relative overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-coral-100 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-coral-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Health</CardTitle>
                  <p className="text-xs text-muted-foreground">{getScoreLabel(oceanTraceScore.health)} Performance</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-coral-600">{oceanTraceScore.health}</div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Progress value={oceanTraceScore.health} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0</span>
                <span>100</span>
              </div>
            </div>

            {/* Nutritional Highlights */}
            <div className="grid grid-cols-2 gap-3">
              {/* Omega-3 Content */}
              <div className="p-3 bg-green-50 rounded-lg text-center">
                <div className="text-xl font-bold text-green-600 mb-1">{product.omega3Content}mg</div>
                <div className="text-xs text-green-700">Omega-3 per 100g</div>
              </div>
              
              {/* Mercury Level */}
              <div className="p-3 bg-blue-50 rounded-lg text-center">
                <Badge 
                  variant="secondary" 
                  className={`text-sm px-2 py-1 mb-1 ${
                    product.mercuryLevel === 'low' ? 'bg-green-100 text-green-800' :
                    product.mercuryLevel === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}
                >
                  {product.mercuryLevel.charAt(0).toUpperCase() + product.mercuryLevel.slice(1)}
                </Badge>
                <div className="text-xs text-blue-700">Mercury Level</div>
              </div>
            </div>

            {/* Health Benefits */}
            <div className="p-3 bg-gradient-to-r from-green-50 to-coral-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-green-600" />
                <h4 className="font-semibold text-sm text-green-800">Health Benefits</h4>
              </div>
              <div className="text-xs space-y-1">
                {product.omega3Content > 2000 && (
                  <div className="flex items-center gap-2 text-green-700">
                    <span className="text-green-600">✓</span>
                    <span>Excellent source of omega-3 fatty acids</span>
                  </div>
                )}
                {product.mercuryLevel === 'low' && (
                  <div className="flex items-center gap-2 text-green-700">
                    <span className="text-green-600">✓</span>
                    <span>Low mercury content - safe for regular consumption</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-green-700">
                  <span className="text-green-600">✓</span>
                  <span>High protein content</span>
                </div>
                <div className="flex items-center gap-2 text-green-700">
                  <span className="text-green-600">✓</span>
                  <span>Rich in essential vitamins and minerals</span>
                </div>
              </div>
            </div>
            
            {/* Key Factors */}
            <div className={`p-3 rounded-lg border ${getScoreColor(oceanTraceScore.health)}`}>
              <h4 className="font-semibold text-sm mb-2">Nutritional Analysis</h4>
              <ul className="space-y-1">
                {oceanTraceScore.breakdown.healthFactors.map((factor, idx) => (
                  <li key={idx} className="text-xs flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Sustainability Card */}
        <Card className="md:col-span-1">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Sustainability</CardTitle>
                  <p className="text-xs text-muted-foreground">{getScoreLabel(oceanTraceScore.sustainability)} Performance</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-green-600">{oceanTraceScore.sustainability}</div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Progress Bar */}
            <div className="relative">
              <Progress value={oceanTraceScore.sustainability} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0</span>
                <span>100</span>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* Carbon Footprint */}
              <div className="p-3 bg-green-50 rounded-lg text-center">
                <div className="text-xl font-bold text-green-600 mb-1">{product.carbonFootprint}kg</div>
                <div className="text-xs text-green-700">CO2 Footprint</div>
              </div>
              
              {/* Sustainability Rating */}
              <div className="p-3 bg-blue-50 rounded-lg text-center">
                <Badge 
                  variant="secondary" 
                  className={`text-sm px-2 py-1 mb-1 ${
                    product.sustainabilityRating === 'excellent' ? 'bg-green-100 text-green-800' :
                    product.sustainabilityRating === 'good' ? 'bg-blue-100 text-blue-800' :
                    product.sustainabilityRating === 'fair' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}
                >
                  {product.sustainabilityRating.charAt(0).toUpperCase() + product.sustainabilityRating.slice(1)}
                </Badge>
                <div className="text-xs text-blue-700">Rating</div>
              </div>
            </div>

            {/* Fishing Method Highlight */}
            <div className="p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Ship className="h-4 w-4 text-green-600" />
                <h4 className="font-semibold text-sm text-green-800">Fishing Method</h4>
              </div>
              <div className="text-sm font-medium text-green-700 mb-1">{product.fishingMethod}</div>
              <div className="text-xs text-green-600">
                {product.fishingMethod === 'Trawling' ? 'Bottom fishing with nets' :
                 product.fishingMethod === 'Longline' ? 'Hook and line fishing' :
                 product.fishingMethod === 'Pole and Line' ? 'Hand-operated fishing' :
                 'Sustainable fishing technique'}
              </div>
            </div>

            {/* Certifications & Key Factors */}
            <div className="space-y-3">
              {/* Certifications */}
              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-sm mb-2 text-green-800">Certifications</h4>
                <div className="flex flex-wrap gap-2">
                  {product.isMSCCertified && (
                    <Badge variant="outline" className="text-xs bg-green-100 text-green-800 border-green-300">
                      ✓ MSC Certified
                    </Badge>
                  )}
                  {product.quotaCompliant && (
                    <Badge variant="outline" className="text-xs bg-green-100 text-green-800 border-green-300">
                      ✓ Quota Compliant
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs bg-blue-100 text-blue-800 border-blue-300">
                    ✓ Traceability Verified
                  </Badge>
                </div>
              </div>

              {/* Key Factors */}
              <div className={`p-3 rounded-lg border ${getScoreColor(oceanTraceScore.sustainability)}`}>
                <h4 className="font-semibold text-sm mb-2">Key Factors</h4>
                <ul className="space-y-1">
                  {oceanTraceScore.breakdown.sustainabilityFactors.map((factor, idx) => (
                    <li key={idx} className="text-xs flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}