import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

const ProductFilters = ({ searchTerm, setSearchTerm, filters, setFilters, filteredCount, totalCount }) => {
 const clearFilters = () => {
    setSearchTerm("")
    setFilters({
      category: "all",
      stockStatus: "all",
      salesRange: "all",
    })
  }

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-pink-100">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search products by name, category, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-sm font-medium">Category</Label>
              <Select
                value={filters.category}
                onValueChange={(value) => setFilters((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="set">Sets</SelectItem>
                  <SelectItem value="bras">Bras</SelectItem>
                  <SelectItem value="bralletes">Bralletes</SelectItem>
                  <SelectItem value="gym-wears">Gym wears</SelectItem>
                  <SelectItem value="lingeries">Lingeries</SelectItem>
                  <SelectItem value="lounge-wears">Lounge wears</SelectItem>
                  <SelectItem value="panties">Panties</SelectItem>
                  <SelectItem value="shorts">Shorts</SelectItem>
                  <SelectItem value="sleep-wears">Sleep wears</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium">Stock Status</Label>
              <Select
                value={filters.stockStatus}
                onValueChange={(value) => setFilters((prev) => ({ ...prev, stockStatus: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stock Levels</SelectItem>
                  <SelectItem value="in_stock">In Stock (10+)</SelectItem>
                  <SelectItem value="low_stock">Low Stock (1-10)</SelectItem>
                  <SelectItem value="out_of_stock">Out of Stock (0)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium">Sales Range</Label>
              <Select
                value={filters.salesRange}
                onValueChange={(value) => setFilters((prev) => ({ ...prev, salesRange: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sales Levels</SelectItem>
                  <SelectItem value="high">High Sales (100+)</SelectItem>
                  <SelectItem value="medium">Medium Sales (20-99)</SelectItem>
                  <SelectItem value="low">Low Sales (0-19)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Filter Results Summary */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Showing {filteredCount} of {totalCount} products
            </span>
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

}

export default ProductFilters