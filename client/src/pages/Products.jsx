import BreadCrumb from "@/components/categories/BreadCrumb"
import PageHeader from "@/components/categories/PageHeader"
import FloatingNavbar from "@/components/home/FloatingNavbar"
import Pagination from "@/components/products/Pagination"
import ProductFilters from "@/components/products/ProductFilters"
import ProductGrid from "@/components/products/ProductGrid"
import ProductSearch from "@/components/products/ProductSearch"
import ProductToolbar from "@/components/products/ProductToolbar"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useState, useMemo } from "react"


const Products = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [currentPage, setCurrentPage] = useState(1)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [filters, setFilters] = useState({
    category: "",
    colors: [],
    sizes: [],
    brands: [],
    priceRange: [0, 250000],
  })

  const itemsPerPage = 9

  // Mock products data - in real app this would come from API
  const allProducts = [
    {
      id: 1,
      name: "Silk Dreams Bra Set",
      price: 89000.99,
      originalPrice: 120000.00,
      image: "/silkDream.png",
      rating: 4.8,
      reviews: 124,
      isNew: true,
      category: "Bras",
      colors: ["Rose Pink", "Wine Red", "Blush"],
      sizes: ["S", "M", "L", "XL"],
      brand: "Silk Dreams",
      featured: true,
    },
    {
      id: 2,
      name: "Lace Whisper Collection",
      price: 65000.99,
      originalPrice: 85000.00,
      image: "/laceBra.png",
      rating: 4.9,
      reviews: 89,
      isNew: false,
      category: "Sets",
      colors: ["Wine Red", "Deep Rose"],
      sizes: ["XS", "S", "M", "L"],
      brand: "Luscious",
      featured: true,
    },
    {
      id: 3,
      name: "Velvet Rose Lingerie",
      price: 95000.99,
      originalPrice: 130000.00,
      image: "/velvetRose.png",
      rating: 4.7,
      reviews: 156,
      isNew: true,
      category: "Lingerie",
      colors: ["Rose Pink", "Blush", "Wine Red"],
      sizes: ["S", "M", "L"],
      brand: "Velvet Touch",
      featured: false,
    },
    {
      id: 4,
      name: "Midnight Elegance Set",
      price: 78000.99,
      originalPrice: 105000.00,
      image: "/midNight.png",
      rating: 4.8,
      reviews: 203,
      isNew: false,
      category: "Sets",
      colors: ["Wine Red", "Deep Rose", "Black"],
      sizes: ["M", "L", "XL"],
      brand: "Midnight",
      featured: true,
    },
    {
      id: 5,
      name: "Rose Garden Bra",
      price: 72000.99,
      originalPrice: 95000.00,
      image: "/roseBra.png",
      rating: 4.6,
      reviews: 87,
      isNew: true,
      category: "Bras",
      colors: ["Rose Pink", "Blush"],
      sizes: ["XS", "S", "M"],
      brand: "Rose Collection",
      featured: false,
    },
    {
      id: 6,
      name: "Wine Elegance Set",
      price: 110000.99,
      originalPrice: 145000.00,
      image: "/wineSet.png",
      rating: 4.9,
      reviews: 234,
      isNew: false,
      category: "Sets",
      colors: ["Wine Red", "Deep Rose", "Rose Pink"],
      sizes: ["S", "M", "L", "XL"],
      brand: "Luscious",
      featured: true,
    },
    {
      id: 7,
      name: "Satin Dreams Panties",
      price: 34000.99,
      originalPrice: 45000.00,
      image: "/satin.png",
      rating: 4.5,
      reviews: 156,
      isNew: false,
      category: "Panties",
      colors: ["Rose Pink", "Wine Red", "Black", "White"],
      sizes: ["XS", "S", "M", "L", "XL"],
      brand: "Silk Dreams",
      featured: false,
    },
    {
      id: 8,
      name: "Luxury Sleepwear Set",
      price: 125000.99,
      originalPrice: 160000.00,
      image: "/luxury.png",
      rating: 4.8,
      reviews: 98,
      isNew: true,
      category: "Sleepwear",
      colors: ["Blush", "Wine Red", "Navy"],
      sizes: ["S", "M", "L", "XL"],
      brand: "Velvet Touch",
      featured: false,
    },
    {
      id: 9,
      name: "Classic Comfort Bra",
      price: 45000.99,
      originalPrice: 60000.00,
      image: "/bracat.png",
      rating: 4.4,
      reviews: 267,
      isNew: false,
      category: "Bras",
      colors: ["Nude", "Black", "White"],
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      brand: "Rose Collection",
      featured: false,
    },
    {
      id: 10,
      name: "Romantic Lace Teddy",
      price: 88000.99,
      originalPrice: 115000.00,
      image: "/laceTeddy.png",
      rating: 4.7,
      reviews: 143,
      isNew: true,
      category: "Lingerie",
      colors: ["Rose Pink", "Wine Red", "Black"],
      sizes: ["S", "M", "L"],
      brand: "Midnight",
      featured: true,
    },
    {
      id: 11,
      name: "Essential Cotton Set",
      price: 52000.99,
      originalPrice: 70000.00,
      image: "/EssCotton.png",
      rating: 4.3,
      reviews: 189,
      isNew: false,
      category: "Sets",
      colors: ["White", "Nude", "Black"],
      sizes: ["XS", "S", "M", "L", "XL"],
      brand: "Rose Collection",
      featured: false,
    },
    {
      id: 12,
      name: "Delicate Mesh Bodysuit",
      price: 92000.99,
      originalPrice: 125000.00,
      image: "/deli.png",
      rating: 4.6,
      reviews: 76,
      isNew: true,
      category: "Lingerie",
      colors: ["Black", "Wine Red", "Navy"],
      sizes: ["S", "M", "L"],
      brand: "Luscious",
      featured: false,
    },
  ]



  // Filter and search products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter((product) => product.category === filters.category)
    }

    // Color filter
    if (filters.colors.length > 0) {
      filtered = filtered.filter((product) => product.colors.some((color) => filters.colors.includes(color)))
    }

    // Size filter
    if (filters.sizes.length > 0) {
      filtered = filtered.filter((product) => product.sizes.some((size) => filters.sizes.includes(size)))
    }

    // Brand filter
    if (filters.brands.length > 0) {
      filtered = filtered.filter((product) => filters.brands.includes(product.brand))
    }

    // Price filter
    filtered = filtered.filter(
      (product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1],
    )

    return filtered
  }, [searchTerm, filters, allProducts])

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts]

    switch (sortBy) {
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price)
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price)
      case "rating":
        return sorted.sort((a, b) => b.rating - a.rating)
      case "newest":
        return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
      case "popular":
        return sorted.sort((a, b) => b.reviews - a.reviews)
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name))
      case "featured":
      default:
        return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }
  }, [filteredProducts, sortBy])

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)
  const paginatedProducts = sortedProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1) // Reset to first page when filters change
  }

  const handleClearFilters = () => {
    setFilters({
      category: "",
      colors: [],
      sizes: [],
      brands: [],
      priceRange: [0, 200],
    })
    setCurrentPage(1)
  }

  const handleSearchChange = (term) => {
    setSearchTerm(term)
    setCurrentPage(1) // Reset to first page when search changes
  }

  const handleClearSearch = () => {
    setSearchTerm("")
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
      <PageHeader />

      <div >
        <div className="container mx-auto px-4 py-8">
        

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-red-800 bg-clip-text text-transparent">
              All Products
            </h1>
            <p className="text-gray-600 max-w-2xl">
              Discover our complete collection of premium lingerie, from everyday essentials to special occasion pieces.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <ProductSearch
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              onClearSearch={handleClearSearch}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Filters Sidebar */}
            <div className="hidden lg:block lg:w-80">
              <ProductFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
              />
            </div>

            {/* Mobile Filters Overlay */}
            {showMobileFilters && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
                <div className="absolute right-0 top-0 h-full w-80 bg-white overflow-y-auto">
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Filters</h3>
                      <Button variant="ghost" size="icon" onClick={() => setShowMobileFilters(false)}>
                        <X className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <ProductFilters
                      filters={filters}
                      onFiltersChange={handleFiltersChange}
                      onClearFilters={handleClearFilters}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Products Grid */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="mb-6">
                <ProductToolbar
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  totalProducts={sortedProducts.length}
                  onToggleFilters={() => setShowMobileFilters(true)}
                  showMobileFilters={showMobileFilters}
                />
              </div>

              {/* Products */}
              <div className="mb-8">
                <ProductGrid products={paginatedProducts} viewMode={viewMode} />
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={sortedProducts.length}
                itemsPerPage={itemsPerPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default Products