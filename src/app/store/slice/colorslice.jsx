import { createSlice } from "@reduxjs/toolkit";




const initialState ={
    colors:"#fff",
    // background:"#fff",
    // fontFamily:"arial",
    // fontSize:12,
}

const colorslice = createSlice({
    name:"color",
    initialState,
    reducers:{
        setChangeColor(state,action){
            state.colors=action.payload;
        }
       
    }
})
export const {setChangeColor,changeBackground,changeFontFamily,changeFontSize}=colorslice.actions
export default colorslice.reducer;
