import type { BlockchainRecord } from './types'

// Simple blockchain implementation for supply chain tracking
export class OceanTraceBlockchain {
  private static instance: OceanTraceBlockchain
  private records: BlockchainRecord[] = []

  private constructor() {}

  static getInstance(): OceanTraceBlockchain {
    if (!OceanTraceBlockchain.instance) {
      OceanTraceBlockchain.instance = new OceanTraceBlockchain()
    }
    return OceanTraceBlockchain.instance
  }

  // Generate a simple hash (in production, use proper cryptographic hashing)
  private generateHash(data: string, previousHash?: string): string {
    const input = previousHash ? `${data}${previousHash}` : data
    let hash = 0
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16).padStart(8, '0')
  }

  // Create a new blockchain record
  createRecord(
    stage: 'catch' | 'processing' | 'transport' | 'retail',
    timestamp: string,
    data: { location: string; details: Record<string, any> }
  ): BlockchainRecord {
    const previousRecord = this.records[this.records.length - 1]
    const previousHash = previousRecord?.hash

    const recordData = JSON.stringify({
      stage,
      timestamp,
      data,
      previousHash
    })

    const hash = this.generateHash(recordData, previousHash)

    const record: BlockchainRecord = {
      id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      stage,
      timestamp,
      hash,
      previousHash,
      data,
      verified: true
    }

    this.records.push(record)
    return record
  }

  // Verify the integrity of the blockchain
  verifyChain(): boolean {
    for (let i = 1; i < this.records.length; i++) {
      const currentRecord = this.records[i]
      const previousRecord = this.records[i - 1]

      // Verify the hash matches
      const expectedHash = this.generateHash(
        JSON.stringify({
          stage: currentRecord.stage,
          timestamp: currentRecord.timestamp,
          data: currentRecord.data,
          previousHash: previousRecord.hash
        }),
        previousRecord.hash
      )

      if (currentRecord.hash !== expectedHash) {
        return false
      }

      // Verify previous hash matches
      if (currentRecord.previousHash !== previousRecord.hash) {
        return false
      }
    }

    return true
  }

  // Get all records
  getAllRecords(): BlockchainRecord[] {
    return [...this.records]
  }

  // Get records by stage
  getRecordsByStage(stage: 'catch' | 'processing' | 'transport' | 'retail'): BlockchainRecord[] {
    return this.records.filter(record => record.stage === stage)
  }

  // Verify a specific record
  verifyRecord(recordId: string): boolean {
    const record = this.records.find(r => r.id === recordId)
    if (!record) return false

    const index = this.records.indexOf(record)
    if (index === 0) {
      // First record - verify its own hash
      const expectedHash = this.generateHash(
        JSON.stringify({
          stage: record.stage,
          timestamp: record.timestamp,
          data: record.data,
          previousHash: undefined
        })
      )
      return record.hash === expectedHash
    }

    // Verify against previous record
    const previousRecord = this.records[index - 1]
    const expectedHash = this.generateHash(
      JSON.stringify({
        stage: record.stage,
        timestamp: record.timestamp,
        data: record.data,
        previousHash: previousRecord.hash
      }),
      previousRecord.hash
    )

    return record.hash === expectedHash
  }
}

// Utility functions for creating blockchain records from product data
export function createBlockchainRecordsFromProduct(product: any): BlockchainRecord[] {
  const blockchain = OceanTraceBlockchain.getInstance()
  const records: BlockchainRecord[] = []

  // Catch record
  const catchRecord = blockchain.createRecord('catch', product.caughtDate, {
    location: product.caughtLocation,
    details: {
      vessel: product.vesselName,
      method: product.fishingMethod,
      species: product.species,
      sustainability: product.sustainabilityRating,
      mscCertified: product.isMSCCertified
    }
  })
  records.push(catchRecord)

  // Processing record
  const processingRecord = blockchain.createRecord('processing', product.processedDate, {
    location: product.processingFacility,
    details: {
      facility: product.processingFacility,
      temperature: product.temperatureHistory.find(t => t.location === 'Processing facility')?.temperature,
      qualityCheck: 'passed'
    }
  })
  records.push(processingRecord)

  // Transport record
  const transportDate = new Date(
    (new Date(product.processedDate).getTime() + new Date(product.shelfDate).getTime()) / 2
  ).toISOString()
  
  const transportRecord = blockchain.createRecord('transport', transportDate, {
    location: 'Cold chain logistics',
    details: {
      temperatureControlled: true,
      gpsTracked: true,
      carbonFootprint: product.carbonFootprint
    }
  })
  records.push(transportRecord)

  // Retail record
  const retailRecord = blockchain.createRecord('retail', product.shelfDate, {
    location: product.retailer,
    details: {
      retailer: product.retailer,
      price: product.price,
      weight: product.weight,
      available: true
    }
  })
  records.push(retailRecord)

  return records
}

// Verify product blockchain integrity
export function verifyProductBlockchain(records: BlockchainRecord[]): boolean {
  const blockchain = OceanTraceBlockchain.getInstance()
  
  // Verify each record
  for (const record of records) {
    if (!blockchain.verifyRecord(record.id)) {
      return false
    }
  }

  // Verify chain integrity
  return blockchain.verifyChain()
}
