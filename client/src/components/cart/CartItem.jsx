import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, X } from "lucide-react";
import { Link } from "react-router-dom";

const CartItem = ({ item, onIncrement, onDecrement, onRemove }) => {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border-pink-100">
      <CardContent className="p-4 sm:p-6 relative"> {/* 👈 relative needed */}
      
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="text-gray-400 hover:text-red-700 absolute top-2 right-2 z-10"
        >
          <X className="w-5 h-5" />
        </Button>

        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
          {/* Product Image */}
          <div className="relative">
             <Link to={`/product/${item.productId}`}>
               <img
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              width={120}
              height={150}
              className="rounded-lg object-cover"
            />
             </Link>
          
          </div>

          {/* Product Details */}
          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pr-10"> {/* space for X */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>Color: {item.color}</p>
                  <p>Size: {item.size}</p>
                </div>
              </div>
            </div>

            {/* Quantity & Price */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-4">
              {/* Quantity controls */}
              <div className="flex items-center justify-start">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onDecrement}
                    className="h-10 w-10"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 font-semibold">{item.quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onIncrement}
                    className="h-10 w-10"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Price Info */}
              <div className="text-left sm:text-right">
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-red-700">
                    ₦{(item.price * item.quantity).toFixed(2)}
                  </span>
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
  );
};

export default CartItem;
