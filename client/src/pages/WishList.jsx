import CartItem from "@/components/cart/CartItem";
import PageHeader from "@/components/categories/PageHeader";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ui/ProductCard";
import { ShoppingBag, Truck, Shield, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const WishList = () => {
  const wishItems = [
    {
      id: 1,
      name: "Silk Dreams Bra Set",
      price: 50000,
      originalPrice: 120000,
      image: "/silkBra.png",
      rating: 4.8,
      reviews: 124,
      isNew: true,
      colors: ["Rose Pink", "Wine Red", "Blush"],
      sizes: ["S", "M", "L"],
      dateAdded: "2024-06-01",
    },
    {
      id: 2,
      name: "Lace Whisper Collection",
      price: 65000,
      originalPrice: 85000,
      image: "/laceBra.png",
      rating: 4.9,
      reviews: 89,
      isNew: false,
      colors: ["Wine Red", "Deep Rose"],
      sizes: ["M", "L", "XL"],
      dateAdded: "2024-05-15",
    },
    {
      id: 3,
      name: "Velvet Rose Lingerie",
      price: 95000,
      originalPrice: 130000,
      image: "/velvetBra.png",
      rating: 4.7,
      reviews: 156,
      isNew: true,
      colors: ["Rose Pink", "Blush", "Wine Red"],
      sizes: ["XS", "S", "M"],
      dateAdded: "2024-06-10",
    },
    {
      id: 4,
      name: "Midnight Elegance Set",
      price: 78000,
      originalPrice: 105000,
      image: "/midNightBra.png",
      rating: 4.8,
      reviews: 203,
      isNew: false,
      colors: ["Wine Red", "Deep Rose"],
      sizes: ["L", "XL", "XXL"],
      dateAdded: "2024-04-20",
    },
    {
      id: 5,
      name: "Rose Garden Bra",
      price: 72000,
      originalPrice: 95000,
      image: "/roseBra.png",
      rating: 4.6,
      reviews: 87,
      isNew: true,
      colors: ["Rose Pink", "Blush"],
      sizes: ["S", "M"],
      dateAdded: "2024-06-25",
    },
    {
      id: 6,
      name: "Wine Elegance Set",
      price: 110000,
      originalPrice: 145000,
      image: "/wineBra.png",
      rating: 4.9,
      reviews: 234,
      isNew: false,
      colors: ["Wine Red", "Deep Rose", "Rose Pink"],
      sizes: ["M", "L", "XL"],
      dateAdded: "2024-05-05",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
      <PageHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink-600 to-red-800 bg-clip-text text-transparent">
            Your Wish List
          </h1>
          <p className="text-gray-600">
            {wishItems.length} items in your Wish List
          </p>
        </div>

        {wishItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">
              Your Wish List is empty
            </h2>
            <p className="text-gray-500 mb-8">
              Save your favorite lingeries to buy later!
            </p>
            <Link to="/products">
              <Button className="bg-gradient-to-r from-pink-500 to-red-800 text-white">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div>
            {/* Cart Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishItems.map((item, index) => (
                <ProductCard key={item.id} product={item} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishList;
