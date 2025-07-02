
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Minus, Plus, X } from "lucide-react"


const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
 return (
    <Card className="bg-white/70 backdrop-blur-sm border-pink-100">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              width={120}
              height={150}
              className="rounded-lg object-cover"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">{item.name}</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Color: {item.color}</p>
                  <p>Size: {item.size}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemove(item.id)}
                className="text-gray-400 hover:text-red-700"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="h-10 w-10"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 font-semibold">{item.quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="h-10 w-10"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-red-700">₦{(item.price * item.quantity).toFixed(2)}</span>
                  <span className="text-sm text-gray-400 line-through">
                    ₦{(item.originalPrice * item.quantity).toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-green-600">
                  Save ₦{((item.originalPrice - item.price) * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

}

export default CartItem