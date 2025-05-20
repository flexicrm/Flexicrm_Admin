// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authslice';
import userReducer from "./slice/userSlice"
import slugReducer from "./slice/slug"
import colorslice from "./slice/colorslice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    slug: slugReducer,
    color: colorslice,
  }
});

export default store;
