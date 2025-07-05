const API_URL = import.meta.env.VITE_API_URL
import axios from "axios";


export const registerProduct = async (product) => {
  const response = await axios.post(`${API_URL}/products/registerProduct`, product, {
    withCredentials: true, 
  });
  
  return response.data;
};

export const registerBulkProduct = async (products) => {
  const response = await axios.post(`${API_URL}/products/bulkRegister`, products, {
    withCredentials: true, 
  });
  
  return response.data;
};

export const updateProduct = async (productId, products) => {
  const response = await axios.post(`${API_URL}/products/updateProduct/${productId}`, products, {
    withCredentials: true, 
  });
  
  return response.data;
};