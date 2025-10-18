'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Brain, 
  ThumbsUp, 
  ThumbsDown, 
  AlertTriangle, 
  CheckCircle, 
  Thermometer,
  Leaf,
  Heart,
  Shield
} from 'lucide-react'
import type { Product, OceanTraceScore } from '@/lib/types'

interface AIAnalysisProps {
  product: Product
  oceanTraceScore: OceanTraceScore
}

interface AnalysisResult {
  overallRecommendation: 'excellent' | 'good' | 'fair' | 'poor'
  recommendation: string
  keyStrengths: string[]
  keyConcerns: string[]
  detailedAnalysis: {
    freshness: string
    sustainability: string
    health: string
    blockchain: string
  }
  finalVerdict: string
}

export function AIAnalysis({ product, oceanTraceScore }: AIAnalysisProps) {
  const getOverallRecommendation = (score: number): 'excellent' | 'good' | 'fair' | 'poor' => {
    if (score >= 90) return 'excellent'
    if (score >= 75) return 'good'
    if (score >= 60) return 'fair'
    return 'poor'
  }

  const generateRecommendation = (product: Product, score: OceanTraceScore): string => {
    const daysOld = Math.floor((Date.now() - new Date(product.caughtDate).getTime()) / (1000 * 60 * 60 * 24))
    
    if (score.overall >= 90) {
      return `This ${product.name.toLowerCase()} is an excellent choice! With a score of ${score.overall}/100, it represents one of the highest quality seafood products available.`
    } else if (score.overall >= 75) {
      return `This ${product.name.toLowerCase()} is a good choice for consumers seeking quality seafood. With a solid score of ${score.overall}/100, it offers good value and quality.`
    } else if (score.overall >= 60) {
      return `This ${product.name.toLowerCase()} is a fair choice, scoring ${score.overall}/100. While not exceptional, it meets basic quality standards.`
    } else {
      return `This ${product.name.toLowerCase()} scores ${score.overall}/100, indicating significant quality concerns. We recommend considering alternative options.`
    }
  }

  const generateStrengths = (product: Product, score: OceanTraceScore): string[] => {
    const strengths: string[] = []
    
    if (score.freshness >= 85) strengths.push('Exceptional freshness maintained through optimal cold chain')
    if (score.sustainability >= 85) strengths.push('Excellent sustainability practices and certifications')
    if (score.health >= 85) strengths.push('Outstanding nutritional profile and health benefits')
    if (product.isMSCCertified) strengths.push('MSC Certified for sustainable fishing practices')
    if (product.isBlockchainVerified) strengths.push('Fully verified blockchain traceability record')
    
    const daysOld = Math.floor((Date.now() - new Date(product.caughtDate).getTime()) / (1000 * 60 * 60 * 24))
    if (daysOld <= 2) strengths.push('Caught within 48 hours - peak freshness')
    
    const tempViolations = product.temperatureHistory.filter(t => t.temperature > 4).length
    if (tempViolations === 0) strengths.push('Perfect temperature control throughout supply chain')
    
    return strengths.length > 0 ? strengths : ['Meets basic quality standards']
  }

  const generateConcerns = (product: Product, score: OceanTraceScore): string[] => {
    const concerns: string[] = []
    
    if (score.freshness < 70) concerns.push('Freshness concerns due to extended time from catch')
    if (score.sustainability < 70) concerns.push('Sustainability practices could be improved')
    if (score.health < 70) concerns.push('Health profile shows some concerns')
    
    const daysOld = Math.floor((Date.now() - new Date(product.caughtDate).getTime()) / (1000 * 60 * 60 * 24))
    if (daysOld > 5) concerns.push('Product is approaching freshness limits')
    
    const tempViolations = product.temperatureHistory.filter(t => t.temperature > 4).length
    if (tempViolations > 0) concerns.push(`${tempViolations} temperature violation(s) detected`)
    
    if (!product.isMSCCertified && score.sustainability < 80) concerns.push('Not MSC certified - sustainability unverified')
    if (!product.isBlockchainVerified) concerns.push('Blockchain verification incomplete')
    
    return concerns
  }

  const generateDetailedAnalysis = (product: Product, score: OceanTraceScore) => {
    const daysOld = Math.floor((Date.now() - new Date(product.caughtDate).getTime()) / (1000 * 60 * 60 * 24))
    
    return {
      freshness: score.freshness >= 85 
        ? `Excellent freshness (${score.freshness}/100). Caught ${daysOld} days ago with perfect cold chain maintenance. Temperature records show optimal conditions throughout the supply chain.`
        : score.freshness >= 70
        ? `Good freshness (${score.freshness}/100). Caught ${daysOld} days ago with generally well-maintained cold chain. Minor temperature variations detected.`
        : `Fair freshness (${score.freshness}/100). Caught ${daysOld} days ago. Some temperature violations detected, affecting overall freshness score.`,
      
      sustainability: score.sustainability >= 85
        ? `Excellent sustainability (${score.sustainability}/100). ${product.fishingMethod} method, ${product.sustainabilityRating} rating, with MSC certification and quota compliance.`
        : score.sustainability >= 70
        ? `Good sustainability (${score.sustainability}/100). ${product.fishingMethod} method with ${product.sustainabilityRating} rating. Some certifications present.`
        : `Fair sustainability (${score.sustainability}/100). ${product.fishingMethod} method with ${product.sustainabilityRating} rating. Limited sustainability certifications.`,
      
      health: score.health >= 85
        ? `Excellent health profile (${score.health}/100). ${product.mercuryLevel} mercury levels with ${product.omega3Content}mg omega-3 per 100g. Outstanding nutritional value.`
        : score.health >= 70
        ? `Good health profile (${score.health}/100). ${product.mercuryLevel} mercury levels with ${product.omega3Content}mg omega-3 per 100g. Solid nutritional benefits.`
        : `Fair health profile (${score.health}/100). ${product.mercuryLevel} mercury levels with ${product.omega3Content}mg omega-3 per 100g. Limited nutritional advantages.`,
      
      
      blockchain: product.isBlockchainVerified
        ? `Complete blockchain verification. All ${product.blockchainHashes.length} supply chain records are cryptographically verified and immutable. Full transparency from ocean to plate.`
        : `Blockchain verification incomplete. Some supply chain records may be missing or unverified. Limited transparency available.`
    }
  }

  const generateFinalVerdict = (product: Product, score: OceanTraceScore): string => {
    const recommendation = getOverallRecommendation(score.overall)
    
    switch (recommendation) {
      case 'excellent':
        return `🏆 HIGHLY RECOMMENDED: This ${product.name.toLowerCase()} is an exceptional choice that exceeds quality expectations. The combination of freshness, sustainability, health benefits, and blockchain verification makes it a premium product worth the investment. Perfect for health-conscious consumers who prioritize quality and transparency.`
      
      case 'good':
        return `✅ RECOMMENDED: This ${product.name.toLowerCase()} is a solid choice that delivers good quality and value. While not perfect, it meets most quality standards and offers a reliable option for everyday consumption. Good balance of quality and affordability.`
      
      case 'fair':
        return `⚠️ CAUTIOUS RECOMMENDATION: This ${product.name.toLowerCase()} meets basic standards but has some quality concerns. Consider your priorities - if budget is the main factor, it's acceptable. However, if quality is important, consider exploring higher-scoring alternatives.`
      
      case 'poor':
        return `❌ NOT RECOMMENDED: This ${product.name.toLowerCase()} has significant quality issues that make it a poor choice. Multiple concerns across freshness, sustainability, health, or value suggest this product may not meet your expectations. We strongly recommend considering alternatives.`
      
      default:
        return 'Analysis incomplete. Please try again.'
    }
  }

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'excellent': return 'bg-green-100 text-green-800 border-green-200'
      case 'good': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'fair': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'poor': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'excellent': return <ThumbsUp className="h-4 w-4" />
      case 'good': return <CheckCircle className="h-4 w-4" />
      case 'fair': return <AlertTriangle className="h-4 w-4" />
      case 'poor': return <ThumbsDown className="h-4 w-4" />
      default: return <Brain className="h-4 w-4" />
    }
  }

  // Generate analysis immediately without button
  const analysisResult: AnalysisResult = {
    overallRecommendation: getOverallRecommendation(oceanTraceScore.overall),
    recommendation: generateRecommendation(product, oceanTraceScore),
    keyStrengths: generateStrengths(product, oceanTraceScore),
    keyConcerns: generateConcerns(product, oceanTraceScore),
    detailedAnalysis: generateDetailedAnalysis(product, oceanTraceScore),
    finalVerdict: generateFinalVerdict(product, oceanTraceScore)
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          AI Analysis & Recommendation
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        <div className="space-y-6">
            {/* Overall Recommendation */}
            <div className={`p-4 rounded-lg border ${getRecommendationColor(analysisResult.overallRecommendation)}`}>
              <div className="flex items-center gap-2 mb-2">
                {getRecommendationIcon(analysisResult.overallRecommendation)}
                <span className="font-semibold">
                  {analysisResult.overallRecommendation.charAt(0).toUpperCase() + analysisResult.overallRecommendation.slice(1)} Choice
                </span>
                <Badge variant="secondary" className="ml-auto">
                  {oceanTraceScore.overall}/100
                </Badge>
              </div>
              <p className="text-sm">{analysisResult.recommendation}</p>
            </div>

            {/* Key Strengths */}
            {analysisResult.keyStrengths.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Key Strengths
                </h4>
                <ul className="space-y-2">
                  {analysisResult.keyStrengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-green-500 mt-1">•</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Key Concerns */}
            {analysisResult.keyConcerns.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  Areas of Concern
                </h4>
                <ul className="space-y-2">
                  {analysisResult.keyConcerns.map((concern, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span>{concern}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Key Insights */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Brain className="h-4 w-4 text-blue-600" />
                Key Insights
              </h4>
              <div className="space-y-3">
                {analysisResult.keyStrengths.length > 0 && (
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-sm text-green-800">Strengths</span>
                    </div>
                    <ul className="space-y-1">
                      {analysisResult.keyStrengths.map((strength, idx) => (
                        <li key={idx} className="text-sm text-green-700 flex items-start gap-2">
                          <span className="text-green-600 mt-0.5">•</span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {analysisResult.keyConcerns.length > 0 && (
                  <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span className="font-medium text-sm text-yellow-800">Areas to Consider</span>
                    </div>
                    <ul className="space-y-1">
                      {analysisResult.keyConcerns.map((concern, idx) => (
                        <li key={idx} className="text-sm text-yellow-700 flex items-start gap-2">
                          <span className="text-yellow-600 mt-0.5">•</span>
                          <span>{concern}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Final Verdict */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Brain className="h-4 w-4 text-blue-600" />
                AI Final Verdict
              </h4>
              <p className="text-sm leading-relaxed">{analysisResult.finalVerdict}</p>
            </div>

        </div>
      </CardContent>
    </Card>
  )
}
