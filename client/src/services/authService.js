const API_URL = import.meta.env.VITE_API_URL
import axios from "axios";

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users`, userData, {
    withCredentials: true, 
  });
  
  return response.data;
};


export const registerAdmin = async (adminData) => {
    const response = await axios.post(`${API_URL}/users/registerAdmin`, adminData, { withCredentials: true });
      return response.data;
  ;

}

export const loginUser =async (userData) => {
    const response = await axios.post(`${API_URL}/users/login`, userData, { withCredentials: true })
    
     return response.data;
}

export const getUserProfile = async () => {
    const response = await axios.get(`${API_URL}/users/getProfile`, {withCredentials: true});

    return response.data;
}

export const getCustomers = async () => {
    const response = await axios.get(`${API_URL}/users/customers`, {withCredentials: true});
    

    return response.data;
}
 

export const logoutUser = async () => {
    const response = await  axios.get(`${API_URL}/users/logout`, { withCredentials: true });
    
     return response.data;
}


export const checkLoginStatus = async () => {
    const response = await axios.get(`${API_URL}/users/loginStatus`, { withCredentials: true });
     return response.data;
}