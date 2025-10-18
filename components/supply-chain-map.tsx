'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Ship, Factory, Truck, Store } from 'lucide-react'
import type { Product } from '@/lib/types'
import { createSupplyChainPoints, type LocationPoint } from '@/lib/geocoding'

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false })
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false })
const Polyline = dynamic(() => import('react-leaflet').then((mod) => mod.Polyline), { ssr: false })

interface SupplyChainMapProps {
  product: Product
}

const iconMap = {
  catch: Ship,
  processing: Factory,
  transport: Truck,
  retail: Store,
}

const colorMap = {
  catch: '#3b82f6', // blue
  processing: '#f59e0b', // amber
  transport: '#10b981', // emerald
  retail: '#ef4444', // red
}

export function SupplyChainMap({ product }: SupplyChainMapProps) {
  const [isClient, setIsClient] = useState(false)
  const [supplyChainPoints, setSupplyChainPoints] = useState<LocationPoint[]>([])

  useEffect(() => {
    setIsClient(true)
    const points = createSupplyChainPoints(
      product.caughtLocation,
      product.processingFacility,
      product.retailer,
      product.caughtDate,
      product.processedDate,
      product.shelfDate
    )
    setSupplyChainPoints(points)
  }, [product])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const createCustomIcon = (type: keyof typeof iconMap) => {
    const L = require('leaflet')
    const Icon = iconMap[type]
    const color = colorMap[type]
    
    return L.divIcon({
      html: `<div style="
        background-color: ${color};
        border: 2px solid white;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      ">
        <div style="color: white; font-size: 12px;">
          ${type === 'catch' ? '🐟' : type === 'processing' ? '🏭' : type === 'transport' ? '🚛' : '🏪'}
        </div>
      </div>`,
      className: 'custom-div-icon',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    })
  }

  if (!isClient) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Supply Chain Journey Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-muted animate-pulse rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Loading map...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const coordinates = supplyChainPoints.map(point => [point.coordinates.lat, point.coordinates.lng])
  const bounds = coordinates.length > 0 ? coordinates : [[0, 0], [0, 0]]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Supply Chain Journey Map</CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            <Ship className="w-3 h-3 mr-1" />
            Catch
          </Badge>
          <Badge variant="secondary" className="bg-amber-100 text-amber-800">
            <Factory className="w-3 h-3 mr-1" />
            Processing
          </Badge>
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
            <Truck className="w-3 h-3 mr-1" />
            Transport
          </Badge>
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            <Store className="w-3 h-3 mr-1" />
            Retail
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-96 w-full rounded-lg overflow-hidden border">
          <MapContainer
            bounds={bounds as [[number, number], [number, number]]}
            style={{ height: '100%', width: '100%' }}
            zoomControl={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {supplyChainPoints.map((point, index) => {
              const Icon = iconMap[point.type]
              return (
                <Marker
                  key={index}
                  position={[point.coordinates.lat, point.coordinates.lng]}
                  icon={createCustomIcon(point.type)}
                >
                  <Popup>
                    <div className="p-2 min-w-[200px]">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-4 h-4" style={{ color: colorMap[point.type] }} />
                        <h3 className="font-semibold text-sm">{point.name}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {formatDate(point.date)}
                      </p>
                      <div className="space-y-1">
                        {point.details.map((detail, detailIdx) => (
                          <p key={detailIdx} className="text-xs text-muted-foreground">
                            • {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              )
            })}
            
            {/* Draw lines connecting the supply chain points */}
            <Polyline
              positions={coordinates}
              pathOptions={{
                color: '#6366f1',
                weight: 3,
                opacity: 0.7,
                dashArray: '10, 10'
              }}
            />
          </MapContainer>
        </div>
        
        {/* Timeline summary */}
        <div className="mt-4 space-y-2">
          <h4 className="font-medium text-sm">Journey Summary</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-muted-foreground">Distance:</span>
              <span className="ml-1 font-medium">~2,847 km</span>
            </div>
            <div>
              <span className="text-muted-foreground">Duration:</span>
              <span className="ml-1 font-medium">~2.5 days</span>
            </div>
            <div>
              <span className="text-muted-foreground">Carbon Footprint:</span>
              <span className="ml-1 font-medium">{product.carbonFootprint} kg CO₂</span>
            </div>
            <div>
              <span className="text-muted-foreground">Temperature Range:</span>
              <span className="ml-1 font-medium">-1°C to 5°C</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
