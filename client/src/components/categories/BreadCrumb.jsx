import { Home } from "lucide-react"
import { Link } from "react-router-dom"




const BreadCrumb = ({items}) => {
  return (
    <nav className="mb-8">
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        {items.map((item, index) => (
          <div key={item.name} className="flex items-center space-x-2">
            {index > 0 && <span>/</span>}
            {item.href ? (
              <Link to={item.href} className="hover:text-red-700">
                <Home /> 
              </Link>
            ) : (
              <span className="text-red-700 font-semibold">{item.name}</span>
            )}
          </div>
        ))}
      </div>
    </nav>
  )
}

export default BreadCrumb