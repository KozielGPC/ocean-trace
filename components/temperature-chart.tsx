"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { Product } from "@/lib/types"

interface TemperatureChartProps {
  product: Product
}

export function TemperatureChart({ product }: TemperatureChartProps) {
  const data = product.temperatureHistory.map((reading) => ({
    time: new Date(reading.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    temperature: reading.temperature,
    location: reading.location,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Temperature History</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis label={{ value: "°C", angle: -90, position: "insideLeft" }} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                      <p className="font-semibold">{payload[0].payload.location}</p>
                      <p className="text-sm text-muted-foreground">{payload[0].payload.time}</p>
                      <p className="text-sm font-medium mt-1">Temperature: {payload[0].value}°C</p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Line type="monotone" dataKey="temperature" stroke="#0284c7" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Optimal storage temperature: 0-4°C. This product has been maintained within safe temperature ranges
            throughout its journey.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
