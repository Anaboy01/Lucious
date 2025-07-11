import CartItem from "@/components/cart/CartItem";
import PageHeader from "@/components/categories/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Truck, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { useApp } from "@/context/AppContext";
import { useOrder } from "@/context/OrderContext";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, clearUserCart } = useCart();
  const {user} = useApp()
  const {handlePlaceOrder} = useOrder()
  const [addressData, setAddressData] = useState({
  state: "",
  lga: "",
  address: ""
});



  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  const handleIncrement = async (id) => {
    
     try {
     const  res = await  increaseQuantity(id);
     
    if (res) {
      toast.success(res.message)
    }
   } catch (error) {
    console.error(error);
   }
  };

  const handleDecrement = async( id) => {
 
   try {
     const  res = await  decreaseQuantity(id);
    if (res) {
      toast.info(res.message)
    }
   } catch (error) {
    console.error(error);
   }
    
  };



  const removeItem = async(id) => {
     try {
     const  res = await removeFromCart(id);
   
    if (res) {
      toast.info(res.message)
    }
   } catch (error) {
    console.error(error);
   }
   
  };

  const clear = async () => {
      try {
     const  res = await clearUserCart();
    
    if (res) {
      toast.info(res.message)
    }
   } catch (error) {
    console.error(error);
   }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const savings = cartItems.reduce((sum, item) => sum + (item.originalPrice - item.price) * item.quantity, 0);
  const shipping = subtotal > 200000 ? 0 : 10000;
  const total = subtotal + shipping;

  const FW_PUBLIC = import.meta.env.VITE_FW_PUBLIC_KEY

   const config = {
    public_key: FW_PUBLIC,
    tx_ref: Date.now(),
    amount: total,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: user?.email,
       phone_number: '070********',
      name: user?.name,
    },
    customizations: {
      title: 'Lucious Lingierie',
      description: 'Payment for items in cart',
      logo: 'https://res.cloudinary.com/dispu86tu/image/upload/v1752149679/luscious_lingerie_logo_092115_bx86if.png',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handleCheckout = () => {
  if (!addressData.state || !addressData.lga || !addressData.address) {
    toast.error("Please complete your delivery address.");
    return;
  }

  handleFlutterPayment({
    callback: async (response) => {
      try {
      

        if (response.status === "successful") {
          await handlePlaceOrder(
            { type: "flutterwave", txn: response },
            addressData
          );
          toast.success("Order placed successfully!");
        } else {
          toast.error("Payment failed or was cancelled.");
        }
      } catch (error) {
        console.error("Order placement error:", error);
        toast.error("Failed to place order.");
      } finally {
        closePaymentModal(); // Always close the modal
      }
    },
    onClose: () => {
      console.log("Payment modal closed");
    },
  });
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
      <PageHeader title="Luscious Lingerie" showBackButton backHref="/" />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start justify-between ">
             <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink-600 to-red-800 bg-clip-text text-transparent">
            Shopping Cart
          </h1>
          <p className="text-gray-600">{cartItems.length} items in your cart</p>
        </div>

        <Button 
          className="bg-gradient-to-r from-pink-500 to-red-800 text-white"
          onClick={clear}
        >
          Clear Cart
        </Button>
        </div>
       

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Add some beautiful lingerie to get started!</p>
            <Link to="/">
              <Button className="bg-gradient-to-r from-pink-500 to-red-800 text-white">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              
              {cartItems.map((item) => (
               
                    <CartItem
                  key={item.id}
                  item={item}
                  onIncrement={() => handleIncrement(item.cartItemId)}
                  onDecrement={() => handleDecrement(item.cartItemId)}
                  onRemove={() => removeItem(item.cartItemId)}
                />
               
              ))}
            </div>



           

            {/* Order Summary */}
            <div className="space-y-6">
                            <Card className="bg-white/70 backdrop-blur-sm border-pink-100 mb-6">
  <CardContent className="p-6">
    <h3 className="font-semibold text-gray-800 mb-4">Delivery Address</h3>

    <div className="space-y-4">
      <div>
        <label className="block text-gray-600 mb-1">State</label>
        <input
          type="text"
          value={addressData.state}
          onChange={(e) => setAddressData({ ...addressData, state: e.target.value })}
          className="w-full p-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="Enter your state"
        />
      </div>

      <div>
        <label className="block text-gray-600 mb-1">LGA</label>
        <input
          type="text"
          value={addressData.lga}
          onChange={(e) => setAddressData({ ...addressData, lga: e.target.value })}
          className="w-full p-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder="Enter your local government area"
        />
      </div>

      <div>
        <label className="block text-gray-600 mb-1">Address</label>
        <textarea
          value={addressData.address}
          onChange={(e) => setAddressData({ ...addressData, address: e.target.value })}
          className="w-full p-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          rows={3}
          placeholder="Street address, building, etc."
        />
      </div>
    </div>
  </CardContent>
</Card>
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
                      <span className="font-semibold">
                        {shipping === 0 ? "FREE" : `₦${shipping.toFixed(2)}`}
                      </span>
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

                  <Button
                    onClick={handleCheckout}
                  size="lg" className="w-full mt-6 bg-gradient-to-r from-pink-500 to-red-800 text-white">
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
