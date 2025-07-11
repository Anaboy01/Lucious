import { createContext, useContext, useEffect, useState } from "react";
import {
  addCart,
  removeCart,
  clearCart,
  getCart,
  quantityIncreament,
  quantityDecreament,
} from "@/services/cartService"; // adjust path as needed
import { useApp } from "./AppContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
    const {loggedIn} = useApp()

  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await getCart();
         if (!data) {
        return
      }
      setCart(data?.cartList || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (id, cartDetail) => {
    try {
      const res =await addCart(id, cartDetail);
      await fetchCart(); // refresh cart
       return res
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const removeFromCart = async (id) => {
    try {
     const res = await removeCart(id);
      await fetchCart();
      return res
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  const clearUserCart = async () => {
    try {
      const res =await clearCart();
      await fetchCart();
       return res
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  const increaseQuantity = async (cartItemId) => {
    try {
      const res = await quantityIncreament(cartItemId);
      await fetchCart();
      return res;
    } catch (err) {
      console.error("Error increasing quantity:", err);
    }
  };

  const decreaseQuantity = async (cartItemId) => {
    try {
      const res = await quantityDecreament(cartItemId);
      await fetchCart();
      return res
    } catch (err) {
      console.error("Error decreasing quantity:", err);
    }
  };

 useEffect(() => {
  if (loggedIn) {
    fetchCart()
  } else {
    setCart([]) 
  }
}, [loggedIn])

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        clearUserCart,
        increaseQuantity,
        decreaseQuantity,
        fetchCart,
        setCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
