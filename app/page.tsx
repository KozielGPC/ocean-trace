import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Waves, Scan, BarChart3, Leaf, Shield, Heart } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="ocean-gradient text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Waves className="h-12 w-12" />
            <h1 className="text-5xl font-bold">Ocean Trace</h1>
          </div>
          <p className="text-xl text-ocean-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            AI-powered seafood traceability from ocean to plate. Scan any seafood product to discover its freshness,
            sustainability, and health impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/scan">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                <Scan className="mr-2 h-5 w-5" />
                Scan Product
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                <BarChart3 className="mr-2 h-5 w-5" />
                Business Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-balance">Transparency You Can Trust</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-seaweed-100 flex items-center justify-center mb-4">
                  <Leaf className="h-6 w-6 text-seaweed-600" />
                </div>
                <CardTitle>Sustainability</CardTitle>
                <CardDescription>
                  Know the environmental impact of your seafood choices with detailed sustainability ratings
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-ocean-100 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-ocean-600" />
                </div>
                <CardTitle>Freshness</CardTitle>
                <CardDescription>
                  AI-powered freshness prediction based on catch date, temperature history, and supply chain data
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-coral-100 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-coral-600" />
                </div>
                <CardTitle>Health</CardTitle>
                <CardDescription>
                  Detailed health information including mercury levels, omega-3 content, and nutritional benefits
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Products Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Try It Now</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Click on any product to see its complete Ocean Trace analysis
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: "prod-001",
                name: "Wild Alaskan Salmon",
                score: 92,
                image: "/fresh-wild-alaskan-salmon-fillet.jpg",
              },
              { id: "prod-003", name: "Yellowfin Tuna", score: 85, image: "/fresh-yellowfin-tuna-steak.jpg" },
              { id: "prod-005", name: "Pacific Halibut", score: 94, image: "/fresh-pacific-halibut-steak.jpg" },
            ].map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                  <div className="aspect-video relative overflow-hidden bg-muted">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <div className="text-2xl font-bold text-seaweed-600">{product.score}</div>
                        <div className="text-sm text-muted-foreground">/100</div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-ocean-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-balance">Ready to Make Informed Seafood Choices?</h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Join thousands of consumers making sustainable, healthy seafood decisions every day
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/scan">
              <Button size="lg" className="text-lg px-8">
                <Scan className="mr-2 h-5 w-5" />
                Start Scanning
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p className="mb-2">Ocean Trace - Ocean Traceability Hackathon 2025</p>
          <p>From Sea to Dish - Intelligent Traceability for a Sustainable Ocean</p>
        </div>
      </footer>
    </div>
  )
}
