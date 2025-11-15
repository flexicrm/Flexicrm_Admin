import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const initialState = {
  accessToken: Cookies.get("crmaccess") || null,
  isFirstlogin: Cookies.get("isFirstlogin") === "true" || false,
  refreshToken: Cookies.get("refreshToken") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isFirstlogin = true;

      Cookies.set("accessToken", action.payload.accessToken);
      Cookies.set("refreshToken", action.payload.refreshToken);
      Cookies.set("isFirstlogin", "true");
    },
    logout: (state) => {
      setInterval(() => {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        Cookies.remove("isFirstlogin");
        state.accessToken = null;
        state.refreshToken = null;
        state.isFirstlogin = false;
      }, [1000]);
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
