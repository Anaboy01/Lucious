import CartItem from "@/components/cart/CartItem"
import PageHeader from "@/components/categories/PageHeader"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ShoppingBag, Truck, Shield } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"



const Cart = () => {
   const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Silk Dreams Bra Set",
      price: 89000.99,
      originalPrice: 120000.0,
      image: "/silkDream.png",
      color: "Rose Pink",
      size: "M",
      quantity: 1,
    },
    {
      id: 2,
      name: "Lace Whisper Collection",
      price: 65000.99,
      originalPrice: 85000.0,
      image: "/laceWhisper.png",
      color: "Wine Red",
      size: "L",
      quantity: 2,
    },
    {
      id: 3,
      name: "Velvet Rose Lingerie",
      price: 95000.99,
      originalPrice: 130000.0,
      image: "/velvetRose.png",
      color: "Blush",
      size: "S",
      quantity: 1,
    },
  ])

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter((item) => item.id !== id))
    } else {
      setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const savings = cartItems.reduce((sum, item) => sum + (item.originalPrice - item.price) * item.quantity, 0)
  const shipping = subtotal > 200000 ? 0 : 10000
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
      <PageHeader title="Luscious Lingerie" showBackButton backHref="/" />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink-600 to-red-800 bg-clip-text text-transparent">
            Shopping Cart
          </h1>
          <p className="text-gray-600">{cartItems.length} items in your cart</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Add some beautiful lingerie to get started!</p>
            <Link href="/">
              <Button className="bg-gradient-to-r from-pink-500 to-red-800 text-white">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} onUpdateQuantity={updateQuantity} onRemove={removeItem} />
              ))}
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card className="bg-white/70 backdrop-blur-sm border-pink-100">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Order Summary</h3>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">₦{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>You Save</span>
                      <span>-₦{savings.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-semibold">{shipping === 0 ? "FREE" : `₦${shipping.toFixed(2)}`}</span>
                    </div>
                    {shipping === 0 && (
                      <div className="flex items-center text-sm text-green-600">
                        <Truck className="w-4 h-4 mr-1" />
                        Free shipping applied!
                      </div>
                    )}
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-red-700">₦{total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <Button size="lg" className="w-full mt-6 bg-gradient-to-r from-pink-500 to-red-800 text-white">
                    Proceed to Checkout
                  </Button>

                  <div className="grid grid-cols-2 gap-4 mt-4 text-center text-sm text-gray-600">
                    <div className="flex items-center justify-center">
                      <Shield className="w-4 h-4 mr-1" />
                      Secure Payment
                    </div>
                    <div className="flex items-center justify-center">
                      <Truck className="w-4 h-4 mr-1" />
                      Free Returns
                    </div>
                  </div>
                </CardContent>
              </Card>

            

              {/* Recently Viewed */}
              {/* <Card className="bg-white/70 backdrop-blur-sm border-pink-100">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">You might also like</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src="/placeholder.svg?height=60&width=50"
                        alt="Recommended item"
                        width={50}
                        height={60}
                        className="rounded object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Rose Garden Panties</p>
                        <p className="text-sm text-red-700 font-semibold">₦24.99</p>
                      </div>
                      <Button size="sm" variant="outline" className="border-red-700 text-red-700 bg-transparent">
                        Add
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card> */}
            </div>
          </div>
        )}
      </div>
    </div>
  )

}

export default Cart

