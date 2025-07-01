import ProductCard from "../ui/ProductCard";


const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Silk Dreams Bra Set",
      price: 5000099,
      originalPrice: 30000000,
      image: "/silkDream.png",
      rating: 4.8,
      reviews: 124,
      isNew: true,
    },
    {
      id: 2,
      name: "Lace Whisper Collection",
      price: 250000,
      originalPrice: 75000.00,
      image: "/laceWhisper.png",
      rating: 4.9,
      reviews: 89,
      isNew: false,
    },
    {
      id: 3,
      name: "Velvet Rose Lingerie",
      price: 50000,
      originalPrice: 130000,
      image: "/velvetRose.png",
      rating: 4.7,
      reviews: 156,
      isNew: true,
    },
    {
      id: 4,
      name: "Midnight Elegance Set",
      price: 78000,
      originalPrice: 105000,
      image: "/midNight.png",
      rating: 4.8,
      reviews: 203,
      isNew: false,
    },
  ]

  return (
    <section className="py-16 px-4 animate-fadeInUp" style={{ animationDelay: "1.4s" }}>
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-red-800 bg-clip-text text-transparent">
            Featured Collections
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">Handpicked pieces that celebrate femininity and elegance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  )

}

export default FeaturedProducts