import { createContext, useContext, useEffect, useState } from "react";
import {
  registerUser,
  loginUser,
  logoutUser,
  checkLoginStatus,
  getCustomers,
  getUserProfile
} from "../services/authService";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [customers, setCustomers] = useState([])

  const checkAuth = async () => {
    try {
      setLoading(true);
      const res = await checkLoginStatus();
      setLoggedIn(res);
        if (res) {
      const userData = await getUserProfile(); 
      setUser(userData);
    } else {
      setUser(null);
    }
    } catch (err) {
        setUser(null); 
      console.error("Auth check failed", err);
      setLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  const register = async (data) => {
    try {
      setLoading(true);
      const res = await registerUser(data);
      setMessage(res.message);
      await checkAuth();
    } catch (err) {
        setUser(null);
      setMessage(err.response?.data?.message || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (data) => {
    try {
      setLoading(true);
      const res = await loginUser(data);
      setMessage(res.message);
      await checkAuth();
    } catch (err) {
        setUser(null); //
      setMessage(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getAllCustomers = async () => {
    try {
        const res = await getCustomers();
        setCustomers(res);
       
    } catch (err) {
    setCustomers([]); 
      setMessage(err.response?.data?.message || "Failed to fetch customers");
    }
  }

  const logout = async () => {
    try {
      setLoading(true);
    await logoutUser();
      toast.success("Logout successful");
      await checkAuth();
    } catch (err) {
      setMessage("Logout failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
   
  
  }, []);

  useEffect(() => {
  if (user?.isAdmin) {
    const fetchCustomers = async () => {
      await getAllCustomers();
    };
    fetchCustomers();
  }
}, [user?.isAdmin]);


  

  

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        loggedIn,
        loading,
        message,
        setMessage,
        login,
        logout,
        register,
        getAllCustomers,
        customers
      }}
    >
      {children}
    </AppContext.Provider>
  );
};


export const useApp = () => {
    const context = useContext(AppContext);
    return context
}