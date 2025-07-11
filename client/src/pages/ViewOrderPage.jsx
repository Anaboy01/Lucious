// pages/ViewOrderPage.jsx
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useOrder } from "@/context/OrderContext"; // Adjust path if needed
import OrderReceipt from "@/components/OrderReceipt"; // Receipt layout

const ViewOrderPage = () => {
  const { orderId } = useParams();
  const { getOrderDetails } = useOrder();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // 👈 Create navigate instance

const handleBack = () => {
  navigate(-1); // 👈 Go back to previous page
};

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await getOrderDetails(orderId);
      
        if (res) {
          setOrder(res);
        } else {
          setError("Order not found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch order details");
      } finally {
        setLoading(false);
      }
    };

    if (orderId) fetchOrder();
  }, [orderId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 p-4">
        <button
  onClick={handleBack}
  className="mb-4 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
>
  ← Back
</button>
      {loading && <p className="text-center text-gray-500">Loading order...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {order && <OrderReceipt order={order} />}
    </div>
  );
};

export default ViewOrderPage;
