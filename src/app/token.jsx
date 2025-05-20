// import React, { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { API_BASE_URL } from "../utils";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [authHeaders, setAuthHeaders] = useState(() => {
//     const userId = localStorage.getItem("userId");

//     return {
//       Authorization: `Bearer ${userId}`,
//     };
//   });

  // api
//   const refreshToken = async () => {
//     const storedRefreshToken = localStorage.getItem("refreshToken");

//     try {
//       const response = await axios.post(`${API_BASE_URL}/user/refreshToken`, {
//         refreshToken: storedRefreshToken,
//       });

//       const newAccessToken = response.data;

//       // console.log("response in refreshToken api", response.data);

//       return newAccessToken;
//     } catch (error) {
//       console.error("Error refreshing access token:", error);
//       throw error;
//     }
//   };
//   // api

//   useEffect(() => {
//     // if (localStorage.getItem("userId")) {
//       const refreshAccessToken = async () => {
//         try {
//           const newAccessToken = await refreshToken();

//           const userId = newAccessToken?.token;
//           const newRefreshToken = newAccessToken?.refreshToken;

//           localStorage.setItem("userId", userId);
//           localStorage.setItem("refreshToken", newRefreshToken);

//           setAuthHeaders({
//             Authorization: `Bearer ${newAccessToken?.token}`,
//           });
//         } catch (error) {
//           console.error("Error refreshing access token:", error);
//         }
//       };

//       // const checkTokenInterval = setInterval(refreshAccessToken, 12000);

//       // const checkTokenInterval = setInterval(refreshAccessToken, 3600000);
//       const checkTokenInterval = setInterval(refreshAccessToken, 1810000);

//       return () => clearInterval(checkTokenInterval);
//     // }
//   }, []);

//   return (
//     <AuthContext.Provider value={authHeaders}>{children}</AuthContext.Provider>
//   );
// };

// export const useAuthHeaders = () => {
//   return useContext(AuthContext);
// };


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


    // console.log("Stored Refresh Token:", storedRefreshToken); // Debugging log

  
    
    const headers = {
      Authorization: `Bearer ${storedRefreshToken}`,
      "Content-Type": "application/json",
      //  'Access-Control-Allow-Origin': '*',
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/refresh`,
        { refreshToken: storedRefreshToken },
        { headers }
      ).then(res =>{
        // console.log(res.data.data,"{{{{{{{{{{{{{{{{{{{{{{{{")
      })
      
      const newAccessToken = response.data.data;
      // console.log("response in refreshToken api", response.data);
    
      return newAccessToken;
    } catch (error) {
      // console.error("Error refreshing access token:", error);
      throw error;
    }
  };

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const newAccessToken = await refreshToken();
        // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ NewAccesss-Token", newAccessToken);
        // console.log(accessToken,"DDDDDDDDDDDDDDDDDDDDDDDDffffffffffffffffff")
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

