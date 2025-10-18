export interface Coordinates {
  lat: number
  lng: number
}

export interface LocationPoint {
  name: string
  coordinates: Coordinates
  type: 'catch' | 'processing' | 'transport' | 'retail'
  date: string
  details: string[]
}

// Mock geocoding service - in a real app, you'd use a service like Google Geocoding API
// or OpenStreetMap Nominatim API
export const geocodeLocation = (locationName: string): Coordinates => {
  const locationMap: Record<string, Coordinates> = {
    // Catch locations
    'Bristol Bay, Alaska': { lat: 58.2, lng: -158.3 },
    'North Sea, Norway': { lat: 61.0, lng: 3.0 },
    'Pacific Ocean, Hawaii': { lat: 21.3, lng: -157.8 },
    'Aquaculture Farm, Vietnam': { lat: 10.8, lng: 106.6 },
    'Gulf of Alaska': { lat: 57.0, lng: -150.0 },
    
    // Processing facilities
    'Alaska Seafood Processing Co.': { lat: 57.8, lng: -152.4 },
    'Bergen Fish Processing': { lat: 60.4, lng: 5.3 },
    'Hawaiian Seafood Co.': { lat: 21.3, lng: -157.8 },
    'Mekong Processing Plant': { lat: 10.8, lng: 106.6 },
    
    // Retail locations
    'Ocean Fresh Market': { lat: 47.6, lng: -122.3 }, // Seattle area
    
    // Transport routes (approximate midpoints)
    'Cold chain logistics': { lat: 50.0, lng: -120.0 }, // Between Alaska and Seattle
  }

  return locationMap[locationName] || { lat: 0, lng: 0 }
}

export const createSupplyChainPoints = (
  caughtLocation: string,
  processingFacility: string,
  retailer: string,
  caughtDate: string,
  processedDate: string,
  shelfDate: string
): LocationPoint[] => {
  const points: LocationPoint[] = []

  // Add catch point
  points.push({
    name: caughtLocation,
    coordinates: geocodeLocation(caughtLocation),
    type: 'catch',
    date: caughtDate,
    details: ['Fishing location', 'Fresh catch']
  })

  // Add processing point
  points.push({
    name: processingFacility,
    coordinates: geocodeLocation(processingFacility),
    type: 'processing',
    date: processedDate,
    details: ['Processing facility', 'Quality inspection']
  })

  // Add transport route point (approximate)
  const transportPoint = geocodeLocation('Cold chain logistics')
  const transportDate = new Date(
    (new Date(processedDate).getTime() + new Date(shelfDate).getTime()) / 2
  ).toISOString()
  
  points.push({
    name: 'Cold chain logistics',
    coordinates: transportPoint,
    type: 'transport',
    date: transportDate,
    details: ['Temperature controlled', 'GPS tracked']
  })

  // Add retail point
  points.push({
    name: retailer,
    coordinates: geocodeLocation(retailer),
    type: 'retail',
    date: shelfDate,
    details: ['Retail location', 'Available for purchase']
  })

  return points
}
