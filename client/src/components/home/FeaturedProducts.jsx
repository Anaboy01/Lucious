import { useProduct } from "@/context/ProductContext";
import ProductCard from "../ui/ProductCard";
import { useEffect, useState } from "react";


const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts]= useState([])
 const {products} = useProduct()
 useEffect(() => {
  setFeaturedProducts(products)
 },[products])

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
          {[...featuredProducts]
  .sort(() => 0.5 - Math.random()) // shuffle array
  .slice(0, 4) // take only 4
  .map((product, index) => (
    <ProductCard key={product.id} product={product} index={index} />
))}

        </div>
      </div>
    </section>
  )

}

export default FeaturedProducts