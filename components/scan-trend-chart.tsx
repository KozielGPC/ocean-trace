"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface ScanTrendChartProps {
  data: { date: string; scans: number }[]
}

export function ScanTrendChart({ data }: ScanTrendChartProps) {
  const chartData = data.map((item) => ({
    date: new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    scans: item.scans,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scan Activity Trend</CardTitle>
        <CardDescription>Daily consumer scans over the past 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                      <p className="font-semibold">{payload[0].payload.date}</p>
                      <p className="text-sm font-medium mt-1">{payload[0].value} scans</p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Line type="monotone" dataKey="scans" stroke="#0284c7" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
