import ProductCard from "../ui/ProductCard";


const ProductGrid = ({ products, viewMode }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl">🔍</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
        <p className="text-gray-500">Try adjusting your filters or search terms</p>
      </div>
    )
  }

  return (
    <div
      className={`grid gap-6 ${
        viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3" : "grid-cols-1"
      }`}
    >
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} viewMode={viewMode} />
      ))}
    </div>
  )
}

export default ProductGrid