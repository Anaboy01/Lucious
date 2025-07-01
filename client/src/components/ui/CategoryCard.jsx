import { Link } from "react-router-dom"



const CategoryCard = ({category, index = 0}) => {
   return (
    <Link to={category.link} className="relative group cursor-pointer animate-fadeInUp" style={{ animationDelay: `${2.2 + index * 0.2}s` }}>
      <div className={`aspect-square rounded-2xl overflow-hidden bg-gradient-to-br ${category.bg}`}>
        <img
          src={category.image}
          alt={`${category.name} Collection`}
          width={400}
          height={400}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl flex items-end">
        <div className="p-6 text-white">
          <h4 className="text-2xl font-bold mb-2">{category.name}</h4>
          <p className="text-sm opacity-90">{category.desc}</p>
        </div>
      </div>
    </Link>
  )

}

export default CategoryCard