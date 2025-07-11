const API_URL = import.meta.env.VITE_API_URL
import axios from "axios";

// backend service for wish list

export const placeOrder = async (transaction, address) => {
  const response = await axios.post(`${API_URL}/order/`,{transaction, address}, {
    withCredentials: true, 
  });
   console.log(response.data);
  
  return response.data;
};

export const getUserOrders = async () => {
  const response = await axios.get(`${API_URL}/order/getUserOrder`,{
    withCredentials: true, 
  });
  console.log(response.data);
  return response.data;
};

export const getAllOrders = async () => {
  const response = await axios.get(`${API_URL}/order/adminOrders`,{
    withCredentials: true, 
  });
  
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await axios.get(`${API_URL}/order/getOrder/${id}`,{
    withCredentials: true, 
  });
  
  return response.data;
};
export const updateOrderStatus = async (id, status) => {
  const response = await axios.put(`${API_URL}/order/updateStatus/${id}`,{status},{
    withCredentials: true, 
  });
  console.log(response)
  
  return response.data;
};

