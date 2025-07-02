
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

const ProductFilters = ({ filters, onFiltersChange, onClearFilters }) => {
  const categories = ["All", "Bras", "Panties", "Sets", "Sleepwear", "Lingerie", "Accessories","Gym wears"]
  const colors = ["Rose Pink", "Wine Red", "Blush", "Deep Rose", "Black", "White", "Nude", "Navy"]
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"]
  const brands = ["Luscious", "Silk Dreams", "Rose Collection", "Velvet Touch", "Midnight"]

  const handleCategoryChange = (category) => {
    onFiltersChange({
      ...filters,
      category: category === "All" ? "" : category,
    })
  }

  const handleColorChange = (color, checked) => {
    const newColors = checked ? [...filters.colors, color] : filters.colors.filter((c) => c !== color)

    onFiltersChange({
      ...filters,
      colors: newColors,
    })
  }

  const handleSizeChange = (size, checked) => {
    const newSizes = checked ? [...filters.sizes, size] : filters.sizes.filter((s) => s !== size)

    onFiltersChange({
      ...filters,
      sizes: newSizes,
    })
  }

  const handleBrandChange = (brand, checked) => {
    const newBrands = checked ? [...filters.brands, brand] : filters.brands.filter((b) => b !== brand)

    onFiltersChange({
      ...filters,
      brands: newBrands,
    })
  }

  const handlePriceChange = (value) => {
    onFiltersChange({
      ...filters,
      priceRange: value,
    })
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.category) count++
    count += filters.colors.length
    count += filters.sizes.length
    count += filters.brands.length
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 250000) count++
    return count
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-pink-100">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Filters</h3>
            {getActiveFiltersCount() > 0 && (
              <Button variant="ghost" size="sm" onClick={onClearFilters} className="text-red-700 hover:text-red-800">
                Clear All ({getActiveFiltersCount()})
              </Button>
            )}
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <h4 className="font-medium mb-3 text-gray-700">Category</h4>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    filters.category === category || (category === "All" && !filters.category) ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => handleCategoryChange(category)}
                  className={
                    filters.category === category || (category === "All" && !filters.category)
                      ? "bg-red-700 text-white hover:bg-red-800"
                      : "hover:border-red-700 hover:text-red-700 bg-transparent"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="mb-6">
            <h4 className="font-medium mb-3 text-gray-700">Price Range</h4>
            <div className="px-2">
              <Slider
                value={filters.priceRange}
                onValueChange={handlePriceChange}
                max={250000}
                min={0}
                step={5}
                className="mb-3"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>₦{filters.priceRange[0]}</span>
                <span>₦{filters.priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Size Filter */}
          <div className="mb-6">
            <h4 className="font-medium mb-3 text-gray-700">Size</h4>
            <div className="grid grid-cols-3 gap-2">
              {sizes.map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox
                    id={`size-${size}`}
                    checked={filters.sizes.includes(size)}
                    onCheckedChange={(checked) => handleSizeChange(size, checked)}
                  />
                  <Label htmlFor={`size-${size}`} className="text-sm text-gray-600 cursor-pointer">
                    {size}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Color Filter */}
          <div className="mb-6">
            <h4 className="font-medium mb-3 text-gray-700">Color</h4>
            <div className="space-y-2">
              {colors.map((color) => (
                <div key={color} className="flex items-center space-x-2">
                  <Checkbox
                    id={`color-${color}`}
                    checked={filters.colors.includes(color)}
                    onCheckedChange={(checked) => handleColorChange(color, checked)}
                  />
                  <div
                    className={`w-4 h-4 rounded-full border border-gray-300 ${
                      color === "Rose Pink"
                        ? "bg-pink-300"
                        : color === "Wine Red"
                          ? "bg-red-800"
                          : color === "Blush"
                            ? "bg-pink-200"
                            : color === "Deep Rose"
                              ? "bg-red-600"
                              : color === "Black"
                                ? "bg-black"
                                : color === "White"
                                  ? "bg-white"
                                  : color === "Nude"
                                    ? "bg-amber-100"
                                    : "bg-blue-900"
                    }`}
                  />
                  <Label htmlFor={`color-${color}`} className="text-sm text-gray-600 cursor-pointer">
                    {color}
                  </Label>
                </div>
              ))}
            </div>
          </div>

        

          <Button className="w-full bg-gradient-to-r from-pink-500 to-red-800 text-white">Apply Filters</Button>
        </CardContent>
      </Card>

      {/* Active Filters Display */}
      {getActiveFiltersCount() > 0 && (
        <Card className="bg-white/70 backdrop-blur-sm border-pink-100">
          <CardContent className="p-4">
            <h4 className="font-medium mb-3 text-gray-700">Active Filters</h4>
            <div className="flex flex-wrap gap-2">
              {filters.category && (
                <Badge variant="secondary" className="bg-red-100 text-red-700 hover:bg-red-200">
                  {filters.category}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-4 w-4 p-0 hover:bg-red-300"
                    onClick={() => handleCategoryChange("All")}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              )}
              {filters.colors.map((color) => (
                <Badge key={color} variant="secondary" className="bg-pink-100 text-pink-700 hover:bg-pink-200">
                  {color}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-4 w-4 p-0 hover:bg-pink-300"
                    onClick={() => handleColorChange(color, false)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              ))}
              {filters.sizes.map((size) => (
                <Badge key={size} variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                  Size {size}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-4 w-4 p-0 hover:bg-blue-300"
                    onClick={() => handleSizeChange(size, false)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              ))}
              {filters.brands.map((brand) => (
                <Badge key={brand} variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                  {brand}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-4 w-4 p-0 hover:bg-purple-300"
                    onClick={() => handleBrandChange(brand, false)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              ))}
              {(filters.priceRange[0] > 0 || filters.priceRange[1] < 200) && (
                <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200">
                  ${filters.priceRange[0]} - ${filters.priceRange[1]}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-4 w-4 p-0 hover:bg-green-300"
                    onClick={() => handlePriceChange([0, 200])}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default ProductFilters