export interface Product {
  id: string
  name: string
  species: string
  image: string
  qrCode: string

  // Catch information
  caughtDate: string
  caughtLocation: string
  fishingMethod: string
  vesselName: string

  // Processing information
  processedDate: string
  processingFacility: string

  // Retail information
  retailer: string
  shelfDate: string
  price: number
  weight: number

  // Sustainability data
  sustainabilityRating: "excellent" | "good" | "fair" | "poor"
  isMSCCertified: boolean
  quotaCompliant: boolean

  // Health data
  mercuryLevel: "low" | "moderate" | "high"
  omega3Content: number // mg per 100g

  // Supply chain data
  temperatureHistory: TemperatureReading[]
  carbonFootprint: number // kg CO2
  
  // Blockchain data
  blockchainHashes: BlockchainRecord[]
  isBlockchainVerified: boolean
}

export interface TemperatureReading {
  timestamp: string
  temperature: number // Celsius
  location: string
}

export interface BlockchainRecord {
  id: string
  stage: 'catch' | 'processing' | 'transport' | 'retail'
  timestamp: string
  hash: string
  previousHash?: string
  data: {
    location: string
    details: Record<string, any>
  }
  verified: boolean
}

export interface OceanTraceScore {
  overall: number // 0-100
  freshness: number
  sustainability: number
  health: number
  priceValue: number
  breakdown: {
    freshnessFactors: string[]
    sustainabilityFactors: string[]
    healthFactors: string[]
    priceFactors: string[]
  }
}

export interface Scan {
  id: string
  productId: string
  userId?: string
  timestamp: string
  location: string
}

export interface RetailerAnalytics {
  retailerId: string
  retailerName: string
  totalScans: number
  topProducts: {
    productId: string
    productName: string
    scans: number
    avgScore: number
  }[]
  scanTrend: {
    date: string
    scans: number
  }[]
  sustainabilityPreference: {
    excellent: number
    good: number
    fair: number
    poor: number
  }
  avgOceanTraceScore: number
  wasteReduction: number // percentage
  revenueImpact: number // dollars
}
