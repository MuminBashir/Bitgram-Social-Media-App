import { createReducer } from "@reduxjs/toolkit";
const initialState = {
  isAuthenticated: false,
};

export const userReducer = createReducer(initialState, {
  LoginRequest: (state) => {
    state.loading = true;
  },
  LoginSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  LoginFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  RegisterRequest: (state) => {
    state.loading = true;
  },
  RegisterSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  RegisterFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },
  LoadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  LoadUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },
  LogoutUserRequest: (state) => {
    state.loading = true;
  },
  LogoutUserSuccess: (state) => {
    state.loading = false;
    state.user = null;
    state.isAuthenticated = false;
  },
  LogoutUserFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = true;
  },
  UpdateProfileRequest: (state) => {
    state.loading = true;
  },
  UpdateProfileSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  UpdateProfileFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  UpdatePasswordRequest: (state) => {
    state.loading = true;
  },
  UpdatePasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  UpdatePasswordFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  DeleteProfileRequest: (state) => {
    state.loading = true;
  },
  DeleteProfileSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  DeleteProfileFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  ForgotPasswordRequest: (state) => {
    state.loading = true;
  },
  ForgotPasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  ForgotPasswordFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  ResetPasswordRequest: (state) => {
    state.loading = true;
  },
  ResetPasswordSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload;
  },
  ResetPasswordFailure: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessage: (state) => {
    state.message = null;
  },
});

export const postOfFollowingReducer = createReducer(
  {},
  {
    postOfFollowingRequest: (state) => {
      state.loading = true;
    },
    postOfFollowingSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    postOfFollowingFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  }
);

export const allUsersReducer = createReducer(
  {},
  {
    allUsersRequest: (state) => {
      state.loading = true;
    },
    allUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    allUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  }
);

export const getUserReducer = createReducer(
  {},
  {
    getUserRequest: (state) => {
      state.loading = true;
    },
    getUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    getUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  }
);
