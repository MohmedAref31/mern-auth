import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startSignin: (state) => {
      state.loading = true;
    },
    signinSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.currentUser = action.payload;
    },
    signinFaild: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    startUpdate: (state) => {
      state.loading = true;
    },
    updateSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.currentUser = action.payload;
    },
    updateFaild: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signoutSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    signoutStart: (state) => {
      state.loading = true;
    },
    signoutFaild: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  startSignin,
  signinSuccess,
  signinFaild,
  signoutSuccess,
  signoutStart,
  startUpdate,
  updateSuccess,
  updateFaild
} = userSlice.actions;

export default userSlice.reducer;
