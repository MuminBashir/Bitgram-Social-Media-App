import axios from "axios";
axios.defaults.withCredentials = true;

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LoginRequest",
    });

    const { data } = await axios.post(
      "/api/v1/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "LoginSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoginFailure",
      payload: error.response.data.message,
    });
  }
};

export const registerUser =
  (avatar, name, email, password) => async (dispatch) => {
    try {
      dispatch({
        type: "RegisterRequest",
      });

      const { data } = await axios.post(
        "/api/v1/register",
        { avatar, name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "RegisterSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "RegisterFailure",
        payload: error.response.data.message,
      });
    }
  };

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });

    const { data } = await axios.get("/api/v1/me");

    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFailure",
      payload: error.response.data.message,
    });
  }
};

export const getPostOfFollowing = () => async (dispatch) => {
  try {
    dispatch({
      type: "postOfFollowingRequest",
    });

    const { data } = await axios.get("/api/v1/posts");

    dispatch({
      type: "postOfFollowingSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "postOfFollowingFailure",
      payload: error.response.data.message,
    });
  }
};

export const getAllUsers =
  (name = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: "allUsersRequest",
      });

      const { data } = await axios.get(`/api/v1/users?name=${name}`);

      dispatch({
        type: "allUsersSuccess",
        payload: data.users,
      });
    } catch (error) {
      dispatch({
        type: "allUsersFailure",
        payload: error.response.data.message,
      });
    }
  };

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LogoutUserRequest",
    });

    await axios.get("/api/v1/logout");

    dispatch({
      type: "LogoutUserSuccess",
    });
  } catch (error) {
    dispatch({
      type: "LogoutUserFailure",
      payload: error.response.data.message,
    });
  }
};

export const updateProfile = (avatar, name, email) => async (dispatch) => {
  try {
    dispatch({
      type: "UpdateProfileRequest",
    });

    const { data } = await axios.put(
      "/api/v1/update/profile",
      { avatar, name, email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "UpdateProfileSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "UpdateProfileFailure",
      payload: error.response.data.message,
    });
  }
};

export const updatePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({
        type: "UpdatePasswordRequest",
      });

      const { data } = await axios.put(
        "/api/v1/update/password",
        { oldPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "UpdatePasswordSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "UpdatePasswordFailure",
        payload: error.response.data.message,
      });
    }
  };

export const deleteProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: "DeleteProfileRequest",
    });

    const { data } = await axios.delete("/api/v1/delete/me");

    dispatch({
      type: "DeleteProfileSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "DeleteProfileFailure",
      payload: error.response.data.message,
    });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: "ForgotPasswordRequest",
    });

    const { data } = await axios.post(
      "/api/v1/forgot/password",
      { email },
      { headers: { "Content-Type": "application/json" } }
    );

    dispatch({
      type: "ForgotPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "ForgotPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

export const resetPassword = (token, password) => async (dispatch) => {
  try {
    dispatch({
      type: "ResetPasswordRequest",
    });

    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      { password },
      { headers: { "Content-Type": "application/json" } }
    );

    dispatch({
      type: "ResetPasswordSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "ResetPasswordFailure",
      payload: error.response.data.message,
    });
  }
};

export const getUserProfile = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getUserRequest",
    });

    const { data } = await axios.get(`/api/v1/user/${id}`);

    dispatch({
      type: "getUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "getUserFailure",
      payload: error.response.data.message,
    });
  }
};

export const followUnfollowUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "followRequest",
    });

    const { data } = await axios.get(`/api/v1/follow/${id}`);

    dispatch({
      type: "followSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "followFailure",
      payload: error.response.data.message,
    });
  }
};
