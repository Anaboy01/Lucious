import { useEffect } from "react";
import { useOrder } from "@/context/OrderContext";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import PageHeader from "@/components/categories/PageHeader";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const UserOrders = () => {
  const { fetchUserOrders, orders, loading } = useOrder();
  

  useEffect(() => {
    fetchUserOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-pink-500" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-700">No orders yet</h2>
        <p className="text-gray-500">Place your first order to see it here.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50">
           <PageHeader/>
           <div className="max-w-5xl mx-auto py-10 px-4">
     
      <h1 className="text-3xl font-bold mb-8 text-pink-700">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order._id} className="bg-white/70 backdrop-blur-sm border-pink-100 mb-6">
            <CardContent className="p-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Order ID: {order._id}</h2>
                <p className="text-sm text-gray-500">
                  Date: {new Date(order.orderDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-green-600 font-medium">Status: {order.status}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {order.cartList.map((item, index) => (
                 <Link to={`/product/${item.productId}`}>
                     <div key={index} className="flex items-center space-x-4 border p-3 rounded-md">
                    <img
                      src={item.image || "/placeholder.png"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        ₦{item.price} x {item.quantity}
                      </p>
                      <p className="text-sm font-medium text-gray-700">
                        ₦{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                 </Link>
                ))}
              </div>

             <div className="flex flex-col md:flex-row md:justify-between ">
                 <div className="mt-6 border-t pt-4">
                <p className="text-gray-700">
                  <span className="font-semibold">Delivery Address:</span> {order.address.address},{" "}
                  {order.address.lga}, {order.address.state}
                </p>
                <p className="text-lg font-bold text-red-600 mt-2">
                  Total: ₦{order.amount_paid?.toFixed(2)}
                </p>
              </div>
              <Link to={`/orderReciept/${order._id}`}>
                <Button  className="mt-6 bg-gradient-to-r from-pink-500 to-red-800 text-white "> 
                    View Reciept
                </Button>
                    
              </Link>
             </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
    </div>
  );
};

export default UserOrders;
