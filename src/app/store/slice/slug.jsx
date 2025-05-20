
import { createSlice } from '@reduxjs/toolkit';
import Cookies from "js-cookie";
const initialState = {
  slugname: Cookies.get('subdomainqqq') || null,
};

const slugSlice = createSlice({
  name: 'slug',
  initialState,
  reducers: {
    setSlugname: (state, action) => {
      Cookies.set('subdomain==================', action);
      state.slugname = action?.payload?.slugname;
      console.log(JSON.stringify(state, null, 2), 'state');
    },
  },
});

export const { setSlugname } = slugSlice.actions;
export default slugSlice.reducer;
