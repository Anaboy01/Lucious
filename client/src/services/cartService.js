const API_URL = import.meta.env.VITE_API_URL
import axios from "axios";

// backend service for wish list

export const addCart = async (id, cartDetail) => {
  const response = await axios.post(`${API_URL}/cart/addtocart/${id}`,cartDetail, {
    withCredentials: true, 
  });

  console.log(response.data);
  
  return response.data;
};
export const removeCart = async (id) => {
  const response = await axios.delete(`${API_URL}/cart/removeFromCart`, {
    data: {id},
    withCredentials: true, 
  });

  console.log(response.data);
  
  return response.data;
};

export const clearCart = async () => {
  const response = await axios.delete(`${API_URL}/cart/clear`, {
    withCredentials: true, 
  });

  console.log(response.data);
  
  return response.data;
};

export const getCart = async () => {
  const response = await axios.get(`${API_URL}/cart/getcart`, {
    withCredentials: true, 
  });

  console.log(response.data);
  
  return response.data;
};


export const quantityIncreament = async (cartItemId) => {
  const response = await axios.patch(`${API_URL}/cart/add`,{cartItemId}, {
    withCredentials: true, 
  });

  console.log(response.data);
  
  return response.data;
};

export const quantityDecreament = async (cartItemId) => {
  const response = await axios.patch(`${API_URL}/cart/reduce`,{cartItemId}, {
    withCredentials: true, 
  });

  console.log(response.data);
  
  return response.data;
};

