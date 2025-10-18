import type { Product, OceanTraceScore } from "./types"

export function calculateOceanTraceScore(product: Product): OceanTraceScore {
  const freshness = calculateFreshness(product)
  const sustainability = calculateSustainability(product)
  const health = calculateHealth(product)
  const priceValue = calculatePriceValue(product)

  const overall = Math.round(freshness * 0.35 + sustainability * 0.3 + health * 0.2 + priceValue * 0.15)

  return {
    overall,
    freshness,
    sustainability,
    health,
    priceValue,
    breakdown: {
      freshnessFactors: getFreshnessFactors(product),
      sustainabilityFactors: getSustainabilityFactors(product),
      healthFactors: getHealthFactors(product),
      priceFactors: getPriceFactors(product),
    },
  }
}

function calculateFreshness(product: Product): number {
  const hoursSinceCaught = (Date.now() - new Date(product.caughtDate).getTime()) / (1000 * 60 * 60)
  const daysOld = hoursSinceCaught / 24

  // Base score on age
  let score = 100
  if (daysOld <= 2) score = 100
  else if (daysOld <= 3) score = 95
  else if (daysOld <= 4) score = 85
  else if (daysOld <= 5) score = 75
  else if (daysOld <= 6) score = 65
  else score = 50

  // Check temperature compliance
  const tempViolations = product.temperatureHistory.filter((t) => t.temperature > 4).length
  score -= tempViolations * 5

  return Math.max(0, Math.min(100, score))
}

function calculateSustainability(product: Product): number {
  let score = 0

  switch (product.sustainabilityRating) {
    case "excellent":
      score = 95
      break
    case "good":
      score = 80
      break
    case "fair":
      score = 60
      break
    case "poor":
      score = 30
      break
  }

  if (product.isMSCCertified) score += 5
  if (product.quotaCompliant) score += 5

  // Fishing method bonus
  if (product.fishingMethod === "Pole and line" || product.fishingMethod === "Longline") {
    score += 5
  } else if (product.fishingMethod === "Bottom trawl") {
    score -= 10
  }

  return Math.max(0, Math.min(100, score))
}

function calculateHealth(product: Product): number {
  let score = 70

  // Mercury level impact
  if (product.mercuryLevel === "low") score += 20
  else if (product.mercuryLevel === "moderate") score += 10
  else score -= 10

  // Omega-3 content bonus
  if (product.omega3Content > 2000) score += 10
  else if (product.omega3Content > 1000) score += 5

  return Math.max(0, Math.min(100, score))
}

function calculatePriceValue(product: Product): number {
  const pricePerPound = product.price / product.weight

  // Compare to market averages (simplified)
  const marketAvg: Record<string, number> = {
    "Sockeye Salmon": 22,
    "Atlantic Cod": 18,
    "Yellowfin Tuna": 35,
    "Nile Tilapia": 10,
    "Pacific Halibut": 30,
  }

  const speciesKey = product.species.split("(")[0].trim()
  const avgPrice = marketAvg[speciesKey] || 20

  const priceDiff = ((avgPrice - pricePerPound) / avgPrice) * 100

  let score = 75
  if (priceDiff > 10)
    score = 95 // Great deal
  else if (priceDiff > 0)
    score = 85 // Good price
  else if (priceDiff > -10)
    score = 75 // Fair price
  else score = 60 // Expensive

  return Math.max(0, Math.min(100, score))
}

function getFreshnessFactors(product: Product): string[] {
  const factors: string[] = []
  const daysOld = (Date.now() - new Date(product.caughtDate).getTime()) / (1000 * 60 * 60 * 24)

  if (daysOld <= 2) factors.push("Caught within 48 hours")
  else if (daysOld <= 4) factors.push(`Caught ${Math.round(daysOld)} days ago`)
  else factors.push(`Caught ${Math.round(daysOld)} days ago - approaching limit`)

  const tempViolations = product.temperatureHistory.filter((t) => t.temperature > 4).length
  if (tempViolations === 0) {
    factors.push("Perfect cold chain maintained")
  } else {
    factors.push(`${tempViolations} temperature variance(s) detected`)
  }

  factors.push(`Processed at ${product.processingFacility}`)

  return factors
}

function getSustainabilityFactors(product: Product): string[] {
  const factors: string[] = []

  factors.push(
    `${product.sustainabilityRating.charAt(0).toUpperCase() + product.sustainabilityRating.slice(1)} sustainability rating`,
  )

  if (product.isMSCCertified) factors.push("MSC Certified sustainable")
  if (product.quotaCompliant) factors.push("Quota compliant fishing")

  factors.push(`Fishing method: ${product.fishingMethod}`)
  factors.push(`Carbon footprint: ${product.carbonFootprint}kg CO2`)

  return factors
}

function getHealthFactors(product: Product): string[] {
  const factors: string[] = []

  factors.push(`Mercury level: ${product.mercuryLevel}`)
  factors.push(`Omega-3: ${product.omega3Content}mg per 100g`)

  if (product.omega3Content > 2000) {
    factors.push("Excellent source of omega-3 fatty acids")
  } else if (product.omega3Content > 1000) {
    factors.push("Good source of omega-3 fatty acids")
  }

  return factors
}

function getPriceFactors(product: Product): string[] {
  const factors: string[] = []
  const pricePerPound = product.price / product.weight

  factors.push(`$${pricePerPound.toFixed(2)} per pound`)
  factors.push(`Total: $${product.price.toFixed(2)} for ${product.weight}lb`)

  // Simplified market comparison
  factors.push("Competitive with market average")

  return factors
}
