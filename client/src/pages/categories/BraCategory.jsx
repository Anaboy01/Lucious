import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Grid, List, ChevronDown, ChevronUp } from "lucide-react"
import { use, useEffect, useState } from "react"
import ProductCard from "@/components/ui/ProductCard"
import PageHeader from "@/components/categories/PageHeader"
import { useProduct } from "@/context/ProductContext"




const BraCategory = () => {
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [selectedColors, setSelectedColors] = useState([])
  const [selectedSizes, setSelectedSizes] = useState([])
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [openSection, setOpenSection] = useState(null)
  const { fetchProductCategory} = useProduct()
  const [products, setProducts] = useState(
    [
  ]
  )

  useEffect(() => {
    const productCategory = async () => {
      const res = await fetchProductCategory("Bras")
      setProducts(res)
    }

    productCategory()
  },[])

  const toggleColor = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    )
  }

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    )
  }


const filteredProducts = products
  .filter((product) => {
    const colorNames = product.colors?.map((c) => c.colorName.toLowerCase()) || [];
    const sizeLabels = product.sizes?.map((s) => s.size.toLowerCase()) || [];

    return (
      product.price >= priceRange[0] &&
      product.price <= priceRange[1] &&
      (selectedColors.length === 0 || selectedColors.some((color) => colorNames.includes(color.toLowerCase()))) &&
      (selectedSizes.length === 0 || selectedSizes.some((size) => sizeLabels.includes(size.toLowerCase())))
    );
  })
  .sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      default:
        return 0;
    }
  });



  const CollapsibleSection = ({ title, children, sectionKey }) => (
    <Collapsible open={openSection === sectionKey} onOpenChange={() => setOpenSection(openSection === sectionKey ? null : sectionKey)}>
      <CollapsibleTrigger className="flex justify-between items-center w-full py-2 cursor-pointer">
        <h4 className="font-medium text-gray-700">{title}</h4>
        {openSection === sectionKey ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-2">{children}</CollapsibleContent>
    </Collapsible>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
      <PageHeader title="Luscious Lingerie" />
      <div className="container mx-auto px-4 py-8">
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-red-800 bg-clip-text text-transparent">
            Bras Collection
          </h1>
          <p className="text-gray-600 max-w-2xl">Discover our exquisite collection of bras designed for comfort, support, and elegance. From everyday essentials to special occasion pieces.</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 space-y-6">
            <Card className=" bg-white/70 backdrop-blur-sm border-pink-100">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 text-gray-800">Filters</h3>

                <CollapsibleSection title="Size" sectionKey="size">
                  <div className="grid grid-cols-3 gap-2">
                    {"XS S M L XL XXL".split(" ").map((size) => (
                      <Button
                        key={size}
                        variant={selectedSizes.includes(size) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleSize(size)}
                        className={selectedSizes.includes(size) ? "bg-red-700 text-white" : "hover:border-red-700 hover:text-red-700 bg-transparent"}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </CollapsibleSection>

                <CollapsibleSection title="Color" sectionKey="color">
                  <div className="space-y-2">
                    {"blue red green wine blush black brown".split(" ").map((color) => (
                      <div key={color} className="flex items-center space-x-2">
                        <Checkbox id={color} checked={selectedColors.includes(color)} onCheckedChange={() => toggleColor(color)} />
                        <Label htmlFor={color} className="text-sm text-gray-600">{color}</Label>
                      </div>
                    ))}
                  </div>
                </CollapsibleSection>

                <div className="flex flex-col gap-2">

                   <p>Price (₦)</p>
                  <Slider
                    defaultValue={[1000, 50000]}
                    min={0}
                    max={1000000}
                    step={1000}
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value)}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-1 text-[12px]">
                    <span>{priceRange[0].toLocaleString()}</span>
                    <span><span>{priceRange[1].toLocaleString()}</span></span>
                  </div>

                </div>

                  
                
              </CardContent>
            </Card>
          </div>

          <div className="flex-1">
            <Card className="mb-6 bg-white/70 backdrop-blur-sm border-pink-100">
              <CardContent className="p-4">
                <div className="flex flex-col gap-3  items-left lg:flex-row lg:items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-600">{filteredProducts.length} products</span>
                    <div className="flex items-center space-x-2">
                      <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")} className={viewMode === "grid" ? "bg-red-700 text-white" : ""}><Grid className="w-4 h-4" /></Button>
                      <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")} className={viewMode === "list" ? "bg-red-700 text-white" : ""}><List className="w-4 h-4" /></Button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">Sort by:</span>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="featured">Featured</SelectItem>
                          <SelectItem value="price-low">Price: Low to High</SelectItem>
                          <SelectItem value="price-high">Price: High to Low</SelectItem>
                          <SelectItem value="newest">Newest</SelectItem>
                          <SelectItem value="rating">Highest Rated</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2">
                <Button variant="outline" className="border-red-700 text-red-700 hover:bg-red-50 bg-transparent">Previous</Button>
                <Button className="bg-red-700 text-white">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline" className="border-red-700 text-red-700 hover:bg-red-50 bg-transparent">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BraCategory
