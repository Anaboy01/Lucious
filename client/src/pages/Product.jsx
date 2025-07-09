import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageHeader from "@/components/categories/PageHeader";
import Reviews from "@/components/ui/Reviews";
import { useProduct } from "@/context/ProductContext";
import LoadingScreen from "@/components/LoadingScreen";
import { useWish } from "@/context/WishContext";
import { toast } from "react-toastify";
import { useCart } from "@/context/CartContext";


const Product = () => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const { id } = useParams();
  const { fetchProductById, fetchProductCategory } = useProduct();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
    const {
      wishList,
      handleAddWish,
      handleRemoveWish,
    } = useWish()
   const {addToCart } = useCart()

  const toggleWishlist = async () => {
  try {
    if (!product) return;

    if (wishlisted) {
      await handleRemoveWish(product.id);
      setWishlisted(false);
      toast.info("Removed from wishlist");
    } else {
      await handleAddWish(product.id);
      setWishlisted(true);
      toast.success("Added to wishlist");
    }
  } catch (error) {
    toast.error("Something went wrong");
    console.error("Wishlist error:", error);
  }
};


const fetchProduct = async () => {
  const res = await fetchProductById(id);
  if (res) {
    setProduct(res);
    setReviews(res.reviews || []);

    // Set default selected size and color
    if (res.sizes?.length) {
      setSelectedSize(res.sizes[0].size);
    }
    if (res.colors?.length) {
      setSelectedColor(res.colors[0].colorName);
    }

    // Check if product is already in wishlist
 const isWishlisted = wishList.some(
  (item) => item._id === res._id || item.id === res.id
);
setWishlisted(isWishlisted);
    setWishlisted(isWishlisted);
    console.log(isWishlisted);

    // Fetch related products
    if (res?.category) {
      const cat = await fetchProductCategory(res.category);
      setRelatedProducts(cat || []);
    }
  }
};


  // Fetch product by ID
useEffect(() => {
  fetchProduct();
}, [id, wishList]);


  // Combine coverImage + images (remove duplicates)
  const getProductImages = () => {
    if (!product) return [];
    const all = [product.coverImage, ...(product.images || [])];
    return [...new Set(all)]; // Remove duplicates
  };

  const productImages = getProductImages();

  if (!product) {
    return <LoadingScreen />;
  }

  const handleAddToCart = async () => {
  if (!selectedSize || !selectedColor) {
    toast.warning("Please select size and color");
    return;
  }

  try {
    const image = product.coverImage || (product.images?.[0] || "");
    const data = await addToCart(product.id, {
      size: selectedSize,
      color: selectedColor,
      quantity,
      image,
    });
    toast.success(data.message);

  } catch (error) {
    console.error("Add to cart error:", error);
    toast.error("Failed to add to cart");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
      <PageHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-white shadow-lg">
              <img
                src={productImages[activeImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {productImages.map((image, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`aspect-square p-0 overflow-hidden ${
                    activeImage === index
                      ? "border-red-700 border-2"
                      : "border-gray-200"
                  }`}
                  onClick={() => setActiveImage(index)}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </Button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              {(() => {
                const now = new Date();
                const addedDate = new Date(product.dateAdded);
                const diffInDays = (now - addedDate) / (1000 * 60 * 60 * 24);

                return (
                  <Badge className="mb-4 bg-gradient-to-r from-pink-500 to-red-800 text-white">
                    {diffInDays <= 30 ? "New" : "Best Seller"}
                  </Badge>
                );
              })()}
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  ({product.reviews?.length || 0} reviews)
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-red-700">
                  ₦{product.price}
                </span>
                <span className="text-xl text-gray-400 line-through">
                  ₦{product.originalPrice}
                </span>
                {product.originalPrice > product.price && (
                  <Badge
                    variant="outline"
                    className="text-red-700 border-red-700"
                  >
                    {Math.floor(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100
                    )}
                    % OFF
                  </Badge>
                )}
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Color */}
            <div>
              <h3 className="font-semibold mb-3">Color: {selectedColor}</h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <Button
                    key={color.colorName}
                    variant="outline"
                    className={`w-12 h-12 rounded-full p-0 border-2 ${
                      selectedColor === color.colorName
                        ? "border-red-700 scale-110"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.colorValue }}
                    onClick={() => setSelectedColor(color.colorName)}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <h3 className="font-semibold mb-3">Size: {selectedSize}</h3>
              <div className="flex space-x-2">
                {product.sizes.map((s) => (
                  <Button
                    key={s.size}
                    variant={selectedSize === s.size ? "default" : "outline"}
                    className={
                      selectedSize === s.size
                        ? "bg-red-700 text-white hover:bg-red-800"
                        : "border-gray-300 hover:border-red-700"
                    }
                    onClick={() => setSelectedSize(s.size)}
                  >
                    {s.size}
                  </Button>
                ))}
              </div>
              <Link
                to="#"
                className="text-sm text-red-700 hover:underline mt-2 inline-block"
              >
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
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-pink-500 to-red-800 text-white py-3"
                onClick={handleAddToCart}
              >
                Add to Cart - ₦₦{(product.price * quantity).toLocaleString()}
              </Button>

             <Button
  size="lg"
  variant="outline"
  className="w-full border-red-700 text-red-700 hover:bg-red-50 bg-transparent"
  onClick={toggleWishlist}
>
  <Heart className={`w-4 h-4 ${wishlisted ? "fill-red-700 text-red-700" : ""}`} />
  {wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
</Button>

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

        {/* Reviews */}
        <Reviews
          reviews={reviews}
          product={product}
          fetchProduct={fetchProduct}
        />

        {/* Related Products */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-pink-600 to-red-800 bg-clip-text text-transparent">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(relatedProducts.length <= 6
              ? relatedProducts
              : [...relatedProducts].sort(() => 0.5 - Math.random()).slice(0, 6)
            ).map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-xl transition-all duration-300 border-pink-100"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.coverImage || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      {product.name}
                    </h4>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-red-700">
                        ₦{product.price}
                      </span>
                      <Link to={`/product/${product.id}`}>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-pink-500 to-red-800 text-white"
                        >
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
  );
};

export default Product;
