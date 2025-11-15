"use client"
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../utils";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authHeaders, setAuthHeaders] = useState(() => {
    const accessToken = Cookies.get("accessToken");

    return {
      Authorization: `Bearer ${accessToken}`,
    };
  });

  const refreshToken = async () => {
    const storedRefreshToken = Cookies.get("refreshToken");
    const headers = {
      Authorization: `Bearer ${storedRefreshToken}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/refresh`,
        { refreshToken: storedRefreshToken },
        { headers }
      ).then(res => {
      })

      const newAccessToken = response.data.data;

      return newAccessToken;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const newAccessToken = await refreshToken();
        const accessToken = newAccessToken.data.accessToken;
        const newRefreshToken = newAccessToken.data.refreshToken;

        Cookies.set("accessToken", accessToken);
        Cookies.set("refreshToken", newRefreshToken);

        setAuthHeaders({
          Authorization: `Bearer ${accessToken}`,
        });
      } catch (error) {
        console.error("Error refreshing access token:", error);
      }
    };
    const checkTokenInterval = setInterval(refreshAccessToken, 60 * 60 * 1000);
    return () => clearInterval(checkTokenInterval);
  }, []);

  return (
    <AuthContext.Provider value={authHeaders}>{children}</AuthContext.Provider>
  );
};

export const useAuthHeaders = () => {
  return useContext(AuthContext);
};

