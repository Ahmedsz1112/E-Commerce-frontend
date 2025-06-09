"use client";
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { BASE_URL } from "@/components/constants/url";

const USERNAME_KEY = "username";
const TOKEN = "token";

const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);
  const isAuthenticated = !!token;
  const [loading, setLoading] = useState(true);
  const [myorder , setMyorder] = useState([])

  useEffect(() => {
    const username = localStorage.getItem(USERNAME_KEY);
    const token = localStorage.getItem(TOKEN);
    if (token) {
      setUsername(username);
      setToken(token);
    }
    setLoading(false);
  }, []);

  const login = (username, token) => {
    setUsername(username);
    setToken(token);
    localStorage.setItem(USERNAME_KEY, username);
    localStorage.setItem(TOKEN, token);
  };

  const logout = () => {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(TOKEN), setUsername(null);
    setToken(null);
  };

  const getMyOrders = async () => {
    const response = await fetch(`https://ecommerce-backend-production-8221.up.railway.app/user/my-order`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }); 

    if (!response.ok) {
      setError("error!!!!!!!!!!!!!!!!!!!!!!!");
      return;
    }

    const data = await response.json();
    console.log(data);
    

    if (!data) {
      setError("Iconrect token");
      return;
    }

    setMyorder(data)
  };

  return (
    <AuthContext.Provider
      value={{ username, token, isAuthenticated, loading, myorder , getMyOrders , login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
