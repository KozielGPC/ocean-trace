import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface TopProductsTableProps {
  products: {
    productId: string
    productName: string
    scans: number
    avgScore: number
  }[]
}

export function TopProductsTable({ products }: TopProductsTableProps) {
  const getScoreBadge = (score: number) => {
    if (score >= 90) return <Badge className="bg-seaweed-500">Excellent</Badge>
    if (score >= 75) return <Badge className="bg-ocean-500">Good</Badge>
    if (score >= 60) return <Badge className="bg-amber-500">Fair</Badge>
    return <Badge variant="destructive">Poor</Badge>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
        <CardDescription>Most scanned products and their average FishScores</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Scans</TableHead>
              <TableHead className="text-right">Avg Score</TableHead>
              <TableHead className="text-right">Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, idx) => (
              <TableRow key={product.productId}>
                <TableCell className="font-medium">#{idx + 1}</TableCell>
                <TableCell>{product.productName}</TableCell>
                <TableCell className="text-right">{product.scans.toLocaleString()}</TableCell>
                <TableCell className="text-right font-semibold">{product.avgScore}</TableCell>
                <TableCell className="text-right">{getScoreBadge(product.avgScore)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
