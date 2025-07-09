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

export const reviewProduct = async (id, review) => {
  const response = await axios.post(`${API_URL}/products/review/${id}`, {review}, {
    withCredentials: true, 
  });
  
  return response.data;
};

export const updateProduct = async (id, product) => {
  const response = await axios.put(`${API_URL}/products/updateProduct/${id}`, product, {
    withCredentials: true, 
  });
  
  return response.data;
};

export const allProducts = async () => {
  const response = await axios.get(`${API_URL}/products/getProducts`, {
    withCredentials: true, 
  });
  
  
  return response.data;
};


export const getAProduct = async (id) => {
  const response = await axios.get(`${API_URL}/products/${id}`, {
    withCredentials: true, 
  });
 
  
  return response.data;
};
export const getCategories = async (category) => {
  const response = await axios.get(`${API_URL}/products/categories/${category}`, {
    withCredentials: true, 
  });
 
  
  return response.data;
};

