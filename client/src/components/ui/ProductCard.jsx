import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Star } from "lucide-react"

const ProductCard = ({product, index = 0}) => {
  return (
    <Card
      className="group hover:shadow-xl transition-all duration-300 border-pink-100 hover:border-red-200 bg-white/70 backdrop-blur-sm animate-fadeInUp"
      style={{ animationDelay: `${1.6 + index * 0.1}s` }}
    >
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={250}
            height={300}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.isNew && (
            <Badge className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-red-800 text-white border-0">
              New
            </Badge>
          )}
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-3 right-3 bg-white/80 hover:bg-white text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Heart className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-4">
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
          </div>

          <h4 className="font-semibold text-gray-800 mb-2 group-hover:text-red-700 transition-colors">
            {product.name}
          </h4>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-red-700">₦{product.price}</span>
              <span className="text-sm text-gray-400 line-through">₦{product.originalPrice}</span>
            </div>
            <Button
              size="sm"
              className="bg-gradient-to-r from-pink-500 to-red-800 hover:from-pink-600 hover:to-red-900 text-white"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductCard
