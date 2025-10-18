"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

interface SustainabilityPieChartProps {
  data: {
    excellent: number
    good: number
    fair: number
    poor: number
  }
}

export function SustainabilityPieChart({ data }: SustainabilityPieChartProps) {
  const chartData = [
    { name: "Excellent", value: data.excellent, color: "#22c55e" },
    { name: "Good", value: data.good, color: "#38bdf8" },
    { name: "Fair", value: data.fair, color: "#fbbf24" },
    { name: "Poor", value: data.poor, color: "#f43f5e" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sustainability Preferences</CardTitle>
        <CardDescription>Consumer choices by sustainability rating</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                      <p className="font-semibold">{payload[0].name}</p>
                      <p className="text-sm font-medium mt-1">{payload[0].value}% of scans</p>
                    </div>
                  )
                }
                return null
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
