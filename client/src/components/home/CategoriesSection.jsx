import CategoryCard from "../ui/CategoryCard"

const CategoriesSection = () => {
   const categories = [
    { name: "Bras", desc: "Perfect fit, ultimate comfort", bg: "from-pink-200 to-red-200", image:"/bracat.png", link:"/category/bras"},
    { name: "Panties", desc: "Everyday essentials", bg: "from-red-200 to-pink-200", image:"/pantcat.png",link:"/category/panties"},
    { name: "Sets", desc: "Complete collections", bg: "from-pink-300 to-red-300", image:"/setCat.png",link:"/category/sets"},
  ]

  return (
    <section className="py-16 px-4 bg-white/50 animate-fadeInUp" style={{ animationDelay: "2s" }}>
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-red-800 bg-clip-text text-transparent">
            Shop by Category
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <CategoryCard key={category.name} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoriesSection