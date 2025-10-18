"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Scan, Search, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { mockProducts } from "@/lib/mock-data"

export default function ScanPage() {
  const [qrCode, setQrCode] = useState("")
  const [scanning, setScanning] = useState(false)
  const router = useRouter()

  const handleScan = () => {
    if (!qrCode.trim()) return

    setScanning(true)
    // Simulate scanning delay
    setTimeout(() => {
      const product = mockProducts.find((p) => p.qrCode.toLowerCase() === qrCode.toLowerCase())
      if (product) {
        router.push(`/product/${product.id}`)
      } else {
        alert("Product not found. Try one of these codes: FISH-AK-SAL-001, FISH-YF-TUN-003, FISH-PC-HAL-005")
        setScanning(false)
      }
    }, 800)
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">Back to Home</span>
          </Link>
          <div className="flex items-center gap-2">
            <Scan className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Scan Product</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Scan QR Code</CardTitle>
            <CardDescription>
              Enter the QR code from your seafood product to see its complete traceability
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter QR code (e.g., FISH-AK-SAL-001)"
                  value={qrCode}
                  onChange={(e) => setQrCode(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleScan()}
                  className="text-lg"
                />
                <Button onClick={handleScan} disabled={scanning || !qrCode.trim()} size="lg">
                  {scanning ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-5 w-5" />
                      Scan
                    </>
                  )}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                In a real implementation, you would use your device camera to scan QR codes automatically
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo Products */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Try These Demo Products</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {mockProducts.map((product) => (
              <Card
                key={product.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => router.push(`/product/${product.id}`)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{product.name}</CardTitle>
                      <CardDescription className="text-sm">{product.qrCode}</CardDescription>
                    </div>
                    <div className="aspect-square w-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
