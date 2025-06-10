// "use client";
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   accessToken: null,
//   isFirstlogin: false,
//   refreshToken: null,
// };

// console.log("initialState", initialState);

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setCredentials: (state, action) => {
//       // Log the actual data within action.payload
//       console.log("action.payload", JSON.stringify(action.payload, null, 2));

//       state.accessToken = action.payload.accessToken;
//       state.refreshToken = action.payload.refreshToken;
//       state.isFirstlogin = true;
//     },
//     logout: (state) => {
//       state.accessToken = null;
//       state.refreshToken = null;
//       state.isFirstlogin = false;
//     },
//   },
// });

// export const { setCredentials, logout } = authSlice.actions;

// export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

import Cookies from "js-cookie";
const initialState = {
  accessToken: Cookies.get("crmaccess") || null,
  isFirstlogin: Cookies.get("isFirstlogin") === "true" || false,
  refreshToken: Cookies.get("refreshToken") || null,
};
// const router = useRouter();
// const slugname = useSelector((state) => state.auth.slugname);

// console.log("initialState", initialState);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      // Log the actual data within action.payload
      // console.log("action.payload", JSON.stringify(action.payload, null, 2));

      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isFirstlogin = true;

      Cookies.set("accessToken", action.payload.accessToken);
      Cookies.set("refreshToken", action.payload.refreshToken);
      Cookies.set("isFirstlogin", "true");
      // Update localStorage
     
      // Log the state after update
      // console.log("updatedState", JSON.stringify(state, null, 2));
    },
    logout: (state) => {
      setInterval(() => {
        // Clear localStorage
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
