import { configureStore } from "@reduxjs/toolkit";
import {
  allUsersReducer,
  getUserReducer,
  postOfFollowingReducer,
  userReducer,
} from "./Reducers/User";
import {
  likeReducer,
  myPostsReducer,
  userPostsReducer,
} from "./Reducers/Posts";

const store = configureStore({
  reducer: {
    user: userReducer,
    postOfFollowing: postOfFollowingReducer,
    allUsers: allUsersReducer,
    like: likeReducer,
    myPosts: myPostsReducer,
    getUser: getUserReducer,
    userPosts: userPostsReducer,
  },
});

export default store;
