import { createContext, useContext, useState, useEffect } from "react";
import {
  placeOrder,
  getUserOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} from "@/services/orderService";
import { toast } from "react-toastify";
import { useApp } from "./AppContext";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, loggedIn } = useApp();


  useEffect(() => {
    if (loggedIn && !user?.isAdmin) {
      fetchUserOrders();
    }
  }, [loggedIn]);


  const fetchUserOrders = async () => {
    try {
      setLoading(true);
      const data = await getUserOrders();
      setOrders(data|| []);
    } catch (err) {
      toast.error("Error fetching your orders");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

 
  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      const data = await getAllOrders();
      setOrders(data || []);
    } catch (err) {
      toast.error("Error fetching all orders");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const handlePlaceOrder = async (transaction, address) => {
    try {
      setLoading(true);
      const result = await placeOrder(transaction, address);
      toast.success("Order placed successfully!");
      return result;
    } catch (error) {
      toast.error("Failed to place order");
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

 
  const getOrderDetails = async (id) => {
    try {
      return await getOrderById(id);
    } catch (error) {
      toast.error("Error fetching order details");
      console.error(error);
    }
  };

  
  const handleUpdateStatus = async (id, status) => {
    try {
      const result = await updateOrderStatus(id, status);
      toast.success("Order status updated!");
      return result;
    } catch (error) {
      toast.error("Failed to update status");
      console.error(error);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        fetchUserOrders,
        fetchAllOrders,
        handlePlaceOrder,
        getOrderDetails,
        handleUpdateStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
