import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

const loadingTransition = createSlice({
  name: "loadingTransition",
  initialState,
  reducers: {
    startLoadingTransition: (state, action) => {
      state.isLoading = true;
    },
    stopLoadingTransition: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const { startLoadingTransition, stopLoadingTransition } =
  loadingTransition.actions;
export default loadingTransition.reducer;
