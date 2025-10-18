import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Target, Lightbulb, TrendingUp, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-balance">About FishScore</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Bringing transparency and trust to seafood consumption through AI-powered traceability
          </p>
        </div>

        {/* Mission */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              FishScore was created to address the critical lack of transparency in the seafood industry. With 35% of
              seafood wasted and 70% of consumers uncertain about their seafood choices, we believe technology can
              bridge this gap. Our AI-powered platform tracks seafood from ocean to plate, providing consumers with the
              information they need to make sustainable, healthy, and informed decisions.
            </p>
          </CardContent>
        </Card>

        {/* How It Works */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">How FishScore Works</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">For Consumers</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Scan the QR code</p>
                      <p className="text-sm text-muted-foreground">On any seafood product in-store</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <p className="font-medium">View the FishScore</p>
                      <p className="text-sm text-muted-foreground">AI-powered rating from 0-100</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Make informed choices</p>
                      <p className="text-sm text-muted-foreground">Based on freshness, sustainability, and health</p>
                    </div>
                  </li>
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">For Retailers</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-seaweed-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Integrate FishScore</p>
                      <p className="text-sm text-muted-foreground">Add QR codes to products</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-seaweed-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Track consumer insights</p>
                      <p className="text-sm text-muted-foreground">Real-time analytics dashboard</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-seaweed-600 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Optimize operations</p>
                      <p className="text-sm text-muted-foreground">Reduce waste, increase revenue</p>
                    </div>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Impact */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Our Impact</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-seaweed-100 flex items-center justify-center mb-2">
                  <TrendingUp className="h-6 w-6 text-seaweed-600" />
                </div>
                <CardTitle className="text-3xl font-bold">23%</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Average waste reduction for partner retailers</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-ocean-100 flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-ocean-600" />
                </div>
                <CardTitle className="text-3xl font-bold">1,247</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Consumer scans helping drive sustainable choices</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mb-2">
                  <Lightbulb className="h-6 w-6 text-amber-600" />
                </div>
                <CardTitle className="text-3xl font-bold">84</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Average FishScore across all products</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <Card className="bg-ocean-50 border-ocean-200">
          <CardContent className="pt-6 text-center">
            <h3 className="text-xl font-bold mb-2">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-4">Join the movement toward transparent, sustainable seafood</p>
            <div className="flex gap-4 justify-center">
              <Link href="/scan">
                <Button>Scan a Product</Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline">View Demo Dashboard</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
