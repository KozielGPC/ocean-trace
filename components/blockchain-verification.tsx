'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Shield, 
  CheckCircle, 
  AlertCircle, 
  Copy, 
  ExternalLink,
  Hash,
  Clock,
  MapPin
} from 'lucide-react'
import type { Product, BlockchainRecord } from '@/lib/types'
import { verifyProductBlockchain } from '@/lib/blockchain'

interface BlockchainVerificationProps {
  product: Product
}

export function BlockchainVerification({ product }: BlockchainVerificationProps) {
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<boolean | null>(null)
  const [expandedRecord, setExpandedRecord] = useState<string | null>(null)

  const handleVerify = async () => {
    setIsVerifying(true)
    // Simulate verification delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const isValid = verifyProductBlockchain(product.blockchainHashes)
    setVerificationResult(isValid)
    setIsVerifying(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      year: 'numeric'
    })
  }

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case 'catch': return '🐟'
      case 'processing': return '🏭'
      case 'transport': return '🚛'
      case 'retail': return '🏪'
      default: return '📍'
    }
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'catch': return 'bg-blue-100 text-blue-800'
      case 'processing': return 'bg-amber-100 text-amber-800'
      case 'transport': return 'bg-emerald-100 text-emerald-800'
      case 'retail': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 flex-shrink-0" />
            <span className="truncate">Blockchain Verification</span>
          </CardTitle>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            {product.isBlockchainVerified && (
              <Badge variant="secondary" className="bg-green-100 text-green-800 self-start sm:self-center">
                <CheckCircle className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            )}
            <Button 
              onClick={handleVerify} 
              disabled={isVerifying}
              size="sm"
              variant="outline"
              className="w-full sm:w-auto"
            >
              {isVerifying ? 'Verifying...' : 'Verify Chain'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Verification Status */}
        <div className="mb-6">
          {verificationResult !== null && (
            <div className={`flex items-center gap-2 p-3 rounded-lg ${
              verificationResult 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              {verificationResult ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600" />
              )}
              <span className={`font-medium ${
                verificationResult ? 'text-green-800' : 'text-red-800'
              }`}>
                {verificationResult 
                  ? 'Blockchain verification successful - Data integrity confirmed'
                  : 'Blockchain verification failed - Data may be compromised'
                }
              </span>
            </div>
          )}
        </div>

        {/* Blockchain Records */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm text-muted-foreground">
            Supply Chain Records ({product.blockchainHashes.length} blocks)
          </h4>
          
          <div className="space-y-3">
            {product.blockchainHashes.map((record, index) => (
              <div 
                key={record.id} 
                className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-lg flex-shrink-0">{getStageIcon(record.stage)}</span>
                    <Badge className={`${getStageColor(record.stage)} flex-shrink-0`}>
                      {record.stage.charAt(0).toUpperCase() + record.stage.slice(1)}
                    </Badge>
                    <span className="text-sm text-muted-foreground flex-shrink-0">
                      Block #{index + 1}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant={record.verified ? "secondary" : "destructive"} className="flex-shrink-0">
                      {record.verified ? "Verified" : "Unverified"}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedRecord(
                        expandedRecord === record.id ? null : record.id
                      )}
                      className="flex-shrink-0"
                    >
                      {expandedRecord === record.id ? 'Collapse' : 'Details'}
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="truncate">{record.data.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <span className="truncate">{formatTimestamp(record.timestamp)}</span>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedRecord === record.id && (
                  <div className="mt-4 pt-4 border-t space-y-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Hash className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Block Hash</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(record.hash)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="bg-muted p-2 rounded text-xs font-mono break-all overflow-x-auto">
                        {record.hash}
                      </div>
                    </div>

                    {record.previousHash && (
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Hash className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Previous Hash</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(record.previousHash!)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="bg-muted p-2 rounded text-xs font-mono break-all overflow-x-auto">
                          {record.previousHash}
                        </div>
                      </div>
                    )}

                    <div>
                      <span className="text-sm font-medium">Record Data</span>
                      <div className="bg-muted p-2 rounded text-xs mt-1 overflow-x-auto">
                        <pre className="whitespace-pre-wrap break-words">
                          {JSON.stringify(record.data, null, 2)}
                        </pre>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>Block ID: {record.id}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(record.id)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Blockchain Info */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h5 className="font-medium text-sm mb-2">About Blockchain Verification</h5>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Each record in the supply chain is cryptographically linked to the previous one, 
            creating an immutable chain of custody. This ensures that the data cannot be 
            altered without detection, providing complete transparency and trust in the 
            product's journey from ocean to plate.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
