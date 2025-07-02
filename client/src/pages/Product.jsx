
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingBag, Star, Minus, Plus, ArrowLeft, Truck, Shield, RotateCcw } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import PageHeader from "@/components/categories/PageHeader"
import Reviews from "@/components/ui/Reviews"





const Product = () => {
  const [selectedSize, setSelectedSize] = useState("M")
  const [selectedColor, setSelectedColor] = useState("Rose Pink")
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [wishlisted, setWishlisted] = useState(false)

  const [reviews, setReviews] = useState([
  {
    userId: 1,
    userName: "Anate",
    userPhoto: "/profile.png",
    review: "Fast delivery.. really comfy",
  },
  {
    userId: 1,
    userName: "Anate",
    userPhoto: "/profile.png",
    review: "Fast delivery.. really comfy",
  },
  {
    userId: 1,
    userName: "Anate",
    userPhoto: "/profile.png",
    review: "Fast delivery.. really comfy",
  },
  {
    userId: 1,
    userName: "Anate",
    userPhoto: "/profile.png",
    review: "Fast delivery.. really comfy",
  },
  {
    userId: 1,
    userName: "Anate",
    userPhoto: "/profile.png",
    review: "Fast delivery.. really comfy",
  },
  {
    userId: 1,
    userName: "Anate",
    userPhoto: "/profile.png",
    review: "Fast delivery.. really comfy",
  },
])

  const toggleWishlist = () => {
    setWishlisted((prev) => !prev)
  }

  const product = {
    name: "Silk Dreams Bra Set",
    price: 89000.99,
    originalPrice: 120000.00,
    rating: 4.8,
    reviews: 124,
    description:
      "Indulge in luxury with our Silk Dreams Bra Set. Crafted from the finest silk and delicate lace, this set combines comfort with elegance. The underwire provides perfect support while the soft cups ensure all-day comfort.",
    features: [
      "Premium silk construction",
      "Delicate French lace details",
      "Underwire support",
      "Adjustable straps",
      "Matching panties included",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
        {colorName: "Night Blue", colorValue: "#122756"},
        {colorName: "White almunium", colorValue: "#a5a5a5"},
        {colorName: "Opal green", colorValue: "#015d52"},
        {colorName: "Copper brown", colorValue: "#8e402a"},
    ],
    images: [
      "/product_one.png",
      "/product_two.png",
     "/product_three.png",
     "/product_four.png",
    ],
  }

  const relatedProducts = [
    {
      id: 1,
      name: "Silk Dreams Bra Set",
      price: 50000,
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
      {/* Header */}
      <PageHeader/>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-lg">
              <img
                src={product.images[activeImage] || "/placeholder.svg"}
                alt={product.name}
                width={500}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`aspect-square p-0 overflow-hidden ${
                    activeImage === index ? "border-red-700 border-2" : "border-gray-200"
                  }`}
                  onClick={() => setActiveImage(index)}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </Button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-4 bg-gradient-to-r from-pink-500 to-red-800 text-white">Best Seller</Badge>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.reviews} reviews)</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-red-700">₦{product.price}</span>
                <span className="text-xl text-gray-400 line-through">₦{product.originalPrice}</span>
                <Badge variant="outline" className="text-red-700 border-red-700">
                  25% OFF
                </Badge>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {/* Color Selection */}
            <div>
              <h3 className="font-semibold mb-3">Color: {selectedColor}</h3>
              <div className="flex space-x-3">
                {product.colors.map((color, index) => (
                  <Button
  key={color.colorName}
  variant="outline"
  className={`w-12 h-12 rounded-full p-0 border-2 ${
    selectedColor === color.colorName ? "border-red-700 scale-110" : "border-gray-300"
  }`}
  style={{ backgroundColor: color.colorValue }}
  onClick={() => setSelectedColor(color.colorName)}
/>

                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold mb-3">Size: {selectedSize}</h3>
              <div className="flex space-x-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    className={
                      selectedSize === size
                        ? "bg-red-700 text-white hover:bg-red-800"
                        : "border-gray-300 hover:border-red-700"
                    }
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
              <Link href="#" className="text-sm text-red-700 hover:underline mt-2 inline-block">
                Size Guide
              </Link>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 font-semibold">{quantity}</span>
                  <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)} className="h-10 w-10">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <Button size="lg" className="w-full bg-gradient-to-r from-pink-500 to-red-800 text-white py-3">
                Add to Cart - ₦{product.price}
              </Button>

        {wishlisted ? (
                  <Button
                size="lg"
                variant="outline"
                className="w-full border-red-700 text-red-700 hover:bg-red-50 bg-transparent"
                 onClick={toggleWishlist}
              >
                <Heart className="w-4 h-4 fill-red-700 text-red-700"  />
                Remove from Wishlist
              </Button>
        ):(      <Button
                size="lg"
                variant="outline"
                className="w-full border-red-700 text-red-700 hover:bg-red-50 bg-transparent"
                 onClick={toggleWishlist}
              >
                <Heart className="w-4 h-4"  />
                Add to Wishlist
              </Button>)}
            </div>

            {/* Features */}
            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-red-700 rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

          </div>
          
        </div>
        <Reviews reviews={reviews} />

        {/* Related Products */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-pink-600 to-red-800 bg-clip-text text-transparent">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-pink-100">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={250}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">{product.name}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-red-700">{product.price}</span>
                      <Link to={`/product/${product.id}`}>

                        <Button size="sm" className="bg-gradient-to-r from-pink-500 to-red-800 text-white">
                             View
                      </Button>
                      
                      </Link>
                     
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )

}

export default Product