"use client";
import { createContext, useContext } from "react";

export const AuthContext = createContext({
  username: null,
  token: null,
  isAuthenticated: false,
  myorder: [],
  login: () => {},
  logout: () => {},
  getMyOrders: () => {},
});

export const useAuth = () => useContext(AuthContext);
