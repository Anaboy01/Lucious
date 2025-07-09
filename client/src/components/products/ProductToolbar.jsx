
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid, List, Filter } from "lucide-react"


const ProductToolbar = ({
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  totalProducts,
  onToggleFilters,
  showMobileFilters,
}) => {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border-pink-100">
      <CardContent className="p-4">
        <div className="flex flex-col gap-2 lg:flex-row items-start lg:items-center justify-between ">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">{totalProducts} products</span>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => onViewModeChange("grid")}
                className={viewMode === "grid" ? "bg-red-700 text-white" : ""}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => onViewModeChange("list")}
                className={viewMode === "list" ? "bg-red-700 text-white" : ""}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
            <Button variant="outline" size="sm" onClick={onToggleFilters} className="lg:hidden bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <Select value={sortBy} onValueChange={onSortChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

}

export default ProductToolbar