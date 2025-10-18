import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Ship, Factory, Truck, Store } from "lucide-react"
import type { Product } from "@/lib/types"

interface SupplyChainTimelineProps {
  product: Product
}

export function SupplyChainTimeline({ product }: SupplyChainTimelineProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
  }

  const timeline = [
    {
      icon: Ship,
      title: "Caught",
      location: product.caughtLocation,
      date: product.caughtDate,
      details: [
        `Vessel: ${product.vesselName}`,
        `Method: ${product.fishingMethod}`,
        `Species: ${product.species.split("(")[0].trim()}`,
      ],
    },
    {
      icon: Factory,
      title: "Processed",
      location: product.processingFacility,
      date: product.processedDate,
      details: ["Quality inspection passed", "Flash frozen for freshness"],
    },
    {
      icon: Truck,
      title: "Transported",
      location: "Cold chain logistics",
      date: new Date(
        (new Date(product.processedDate).getTime() + new Date(product.shelfDate).getTime()) / 2,
      ).toISOString(),
      details: ["Temperature controlled", "GPS tracked"],
    },
    {
      icon: Store,
      title: "Retail",
      location: product.retailer,
      date: product.shelfDate,
      details: [`Price: $${product.price.toFixed(2)}`, `Weight: ${product.weight}lb`],
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Supply Chain Journey</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {timeline.map((step, idx) => {
            const Icon = step.icon
            const isLast = idx === timeline.length - 1
            return (
              <div key={idx} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  {!isLast && <div className="w-0.5 h-full bg-border mt-2" />}
                </div>
                <div className="flex-1 pb-6">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold">{step.title}</h3>
                    <span className="text-sm text-muted-foreground">{formatDate(step.date)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{step.location}</p>
                  <ul className="space-y-1">
                    {step.details.map((detail, detailIdx) => (
                      <li key={detailIdx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
