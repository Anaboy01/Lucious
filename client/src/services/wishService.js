const API_URL = import.meta.env.VITE_API_URL
import axios from "axios";

// backend service for wish list

export const getWish = async () => {
  const response = await axios.get(`${API_URL}/wish`, {
    withCredentials: true, 
  });

  console.log(response.data);
  
  return response.data;
};
export const clearWish = async () => {
  const response = await axios.delete(`${API_URL}/wish/clear`, {
    withCredentials: true, 
  });

  console.log(response.data);
  
  return response.data;
};

export const addWish = async (id) => {
  const response = await axios.post(`${API_URL}/wish/add`, {id},{
    withCredentials: true, 
  });
  
  return response.data;
};

export const removeWish = async (id) => {
  const response = await axios.delete(`${API_URL}/wish/removeWish`,{
    data: { id },
    withCredentials: true, 
  });
  
  return response.data;
};