import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, TrendingUp, Users, Package, DollarSign } from "lucide-react"
import { mockRetailerAnalytics } from "@/lib/mock-data"
import { ScanTrendChart } from "@/components/scan-trend-chart"
import { SustainabilityPieChart } from "@/components/sustainability-pie-chart"
import { TopProductsTable } from "@/components/top-products-table"

export default function DashboardPage() {
  const analytics = mockRetailerAnalytics

  const stats = [
    {
      title: "Total Scans",
      value: analytics.totalScans.toLocaleString(),
      icon: Users,
      description: "Consumer engagements this month",
      trend: "+12.5%",
    },
    {
      title: "Avg Ocean Trace",
      value: analytics.avgOcean Trace,
      icon: TrendingUp,
      description: "Across all products",
      trend: "+3.2 points",
    },
    {
      title: "Waste Reduction",
      value: `${analytics.wasteReduction}%`,
      icon: Package,
      description: "Compared to industry average",
      trend: "Excellent",
    },
    {
      title: "Revenue Impact",
      value: `$${(analytics.revenueImpact / 1000).toFixed(1)}k`,
      icon: DollarSign,
      description: "Additional revenue from transparency",
      trend: "+8.3%",
    },
  ]

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-semibold">Back to Home</span>
            </Link>
            <Button>Export Report</Button>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-1">Business Analytics</h1>
            <p className="text-muted-foreground">{analytics.retailerName}</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardDescription>{stat.title}</CardDescription>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                    <span className="text-xs font-medium text-seaweed-600">{stat.trend}</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <ScanTrendChart data={analytics.scanTrend} />
          <SustainabilityPieChart data={analytics.sustainabilityPreference} />
        </div>

        {/* Top Products */}
        <TopProductsTable products={analytics.topProducts} />

        {/* Insights */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-seaweed-500 mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Strong sustainability preference</p>
                    <p className="text-sm text-muted-foreground">
                      80% of scans are for products rated "Good" or "Excellent" in sustainability
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-ocean-500 mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Peak scanning hours</p>
                    <p className="text-sm text-muted-foreground">
                      Most consumer engagement occurs between 5-7 PM on weekdays
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Premium products trending</p>
                    <p className="text-sm text-muted-foreground">
                      Wild-caught products see 45% higher scan rates than farm-raised
                    </p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Increase sustainable product inventory</p>
                    <p className="text-sm text-muted-foreground">High consumer demand for MSC-certified products</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Promote Ocean Trace in-store</p>
                    <p className="text-sm text-muted-foreground">Add QR codes to more product displays</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Optimize pricing for Atlantic Cod</p>
                    <p className="text-sm text-muted-foreground">Lower Ocean Trace suggests price adjustment needed</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
