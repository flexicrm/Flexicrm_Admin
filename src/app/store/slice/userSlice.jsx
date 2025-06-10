// slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  singleitem: [],
  cutomber: [],
  Customber: [],
  singledata: {},
  refreshdata: false,
  finalTotals: [],
  subtotals: [],
  discounts: [],
  valuesdataleads: [],
  report: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setSingleitem: (state, action) => {
      state.singleitem = action.payload;
    },
    setCustomerId: (state, action) => {
      state.cutomber = action.payload;
    },
    setCustomber: (state, action) => {
      // console.log(action, "action");
      state.Customber = action.payload;
    },
    setSingledata: (state, action) => {
      state.singledata = action.payload;
    },
    setRefreshdata: (state, action) => {
      state.refreshdata = action.payload;
    },
    setFinalTotal: (state, action) => {
      state.finalTotals = action.payload;
    },
    setSubtotal: (state, action) => {
      state.subtotals = action.payload;
    },
    setDiscount: (state, action) => {
      state.discounts = action.payload;
    },
    setValues: (state, action) => {
      state.valuesdataleads = action.payload;
    },
    setReport: (state, action) => {
      state.report = action.payload;
    },
  },
});

export const {
  setData,
  setSingleitem,
  setCustomerId,
  setCustomber,
  setSingledata,
  setRefreshdata,
  setFinalTotal,
  setSubtotal,
  setDiscount,
  setValues,
  setReport,
} = userSlice.actions;

export default userSlice.reducer;
