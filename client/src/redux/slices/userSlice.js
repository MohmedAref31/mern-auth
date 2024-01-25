import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading : false,
    error:false,
    currentUser: null,
}


export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        startSignin:(state)=>{
            state.loading = true;
        },
        signinSuccess:(state, action)=>{
            state.loading = false;
            state.error = false;
            state.currentUser = action.payload;
        },
        signinFaild:(state, action)=>{
            state.loading = false;
            state.error = action.payload
        }
    }
})


export const {startSignin, signinSuccess, signinFaild} = userSlice.actions

export default  userSlice.reducer