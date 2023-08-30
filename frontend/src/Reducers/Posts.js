import { createReducer } from "@reduxjs/toolkit";
const initialState = {};

export const likeReducer = createReducer(
    initialState,
  {
    likeRequest: (state) => {
      state.loading = true;
    },
    likeSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    likeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addCommentRequest: (state) => {
      state.loading = true;
    },
    addCommentSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    addCommentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateCommentRequest: (state) => {
      state.loading = true;
    },
    updateCommentSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateCommentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteCommentRequest: (state) => {
      state.loading = true;
    },
    deleteCommentSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteCommentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  }
);
