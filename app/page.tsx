import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Waves, Scan, BarChart3, Leaf, Shield, Heart, Link2, Lock, Zap, Globe } from "lucide-react"

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
            Blockchain-powered seafood traceability from ocean to plate. Immutable records, AI-driven insights, and complete transparency for every catch.
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

      {/* Blockchain Technology Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Link2 className="h-8 w-8 text-blue-600" />
              <h2 className="text-3xl font-bold">Blockchain-Powered Transparency</h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Every step in the seafood supply chain is recorded on an immutable blockchain, creating an unbreakable chain of custody from ocean to your plate.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="border-blue-200 bg-white/80">
              <CardHeader className="text-center">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Immutable Records</CardTitle>
                <CardDescription>
                  Each transaction is cryptographically sealed and cannot be altered or tampered with
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-green-200 bg-white/80">
              <CardHeader className="text-center">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Tamper-Proof</CardTitle>
                <CardDescription>
                  Any attempt to modify data breaks the chain, immediately alerting stakeholders to potential fraud
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-purple-200 bg-white/80">
              <CardHeader className="text-center">
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Global Access</CardTitle>
                <CardDescription>
                  All stakeholders can verify and access supply chain data in real-time, anywhere in the world
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-orange-200 bg-white/80">
              <CardHeader className="text-center">
                <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg">Instant Verification</CardTitle>
                <CardDescription>
                  Verify authenticity and trace the complete journey of any seafood product in seconds
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg border border-blue-200">
            <h3 className="text-2xl font-bold text-center mb-6">How Blockchain Transforms Seafood Traceability</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-blue-800">Traditional Supply Chain Problems</h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Fragmented data across multiple systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Easy to manipulate or falsify records</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Limited transparency for consumers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Slow verification processes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>High risk of fraud and counterfeiting</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-green-800">Blockchain-Powered Solutions</h4>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Unified, decentralized data ecosystem</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Cryptographically secured, immutable records</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Complete transparency for all stakeholders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Instant, automated verification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Built-in fraud detection and prevention</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-balance">Blockchain + AI: The Perfect Combination</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-seaweed-100 flex items-center justify-center mb-4">
                  <Leaf className="h-6 w-6 text-seaweed-600" />
                </div>
                <CardTitle>Blockchain Sustainability</CardTitle>
                <CardDescription>
                  Immutable records of fishing methods, quotas, and environmental impact with blockchain verification
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-ocean-100 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-ocean-600" />
                </div>
                <CardTitle>AI-Powered Freshness</CardTitle>
                <CardDescription>
                  Machine learning algorithms analyze blockchain-recorded temperature history and supply chain data for accurate freshness prediction
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-coral-100 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-coral-600" />
                </div>
                <CardTitle>Verified Health Data</CardTitle>
                <CardDescription>
                  Blockchain-verified nutritional information, mercury levels, and omega-3 content with AI-driven health insights
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                  <Link2 className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle>Supply Chain Transparency</CardTitle>
                <CardDescription>
                  Complete blockchain trail from catch to retail with AI-powered anomaly detection and real-time monitoring
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

      {/* Technology Gaps & Solutions Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Closing the Technology Gaps</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We're addressing the key challenges in seafood traceability through innovative blockchain and AI solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-red-700">Current Industry Challenges</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-red-800">Data Fragmentation</h4>
                    <p className="text-sm text-red-700">Supply chain data scattered across multiple systems and stakeholders</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-red-800">Trust & Verification</h4>
                    <p className="text-sm text-red-700">Difficulty verifying authenticity and preventing fraud in supply chains</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-red-800">Real-time Monitoring</h4>
                    <p className="text-sm text-red-700">Limited ability to monitor conditions and detect issues in real-time</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-red-800">Consumer Transparency</h4>
                    <p className="text-sm text-red-700">Consumers lack access to detailed product information and journey</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-green-700">Our Blockchain + AI Solutions</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-green-800">Unified Blockchain Network</h4>
                    <p className="text-sm text-green-700">All stakeholders contribute to a single, immutable ledger ensuring data integrity</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-green-800">Cryptographic Verification</h4>
                    <p className="text-sm text-green-700">Every record is cryptographically signed and linked, making tampering impossible</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-green-800">AI-Powered Analytics</h4>
                    <p className="text-sm text-green-700">Machine learning algorithms analyze blockchain data for insights and anomaly detection</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-green-800">Consumer-First Design</h4>
                    <p className="text-sm text-green-700">Intuitive interface that makes complex blockchain data accessible to everyone</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-blue-200">
              <h3 className="text-2xl font-bold mb-4">The Future of Seafood Traceability</h3>
              <p className="text-lg text-muted-foreground mb-6 max-w-3xl mx-auto">
                By combining blockchain's immutability with AI's intelligence, we're creating a new standard for food transparency 
                that benefits everyone: consumers make informed choices, businesses build trust, and the ocean ecosystem is protected 
                through better accountability.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/scan">
                  <Button size="lg" className="text-lg px-8">
                    <Scan className="mr-2 h-5 w-5" />
                    Experience Blockchain Traceability
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline" className="text-lg px-8">
                    Learn About Our Technology
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-ocean-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-balance">Experience Blockchain-Powered Transparency</h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Join the future of food traceability with immutable blockchain records and AI-powered insights
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
