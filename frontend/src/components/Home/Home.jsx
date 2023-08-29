import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Post, User, Loading } from "../";
import "./Home.css";
import { getAllUsers, getPostOfFollowing } from "../../Actions/User";
import { Typography } from "@mui/material";

const Home = () => {
  const dispatch = useDispatch();

  const { loading, posts, error } = useSelector(
    (state) => state.postOfFollowing
  );

  const { users, loading: usersLoading } = useSelector(
    (state) => state.allUsers
  );

  useEffect(() => {
    dispatch(getPostOfFollowing());
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="home">
      <div className="homeleft">
        {loading ? (
          <Loading />
        ) : posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post.image.url}
              likes={post.likes}
              comments={post.comments}
              ownerId={post.owner._id}
              ownerName={post.owner.name}
              ownerImage={post.owner.avatar.url}
            />
          ))
        ) : (
          <Typography variant="h6">No posts yet</Typography>
        )}
      </div>
      <div className="homeright">
        {usersLoading ? (
          <Loading />
        ) : users && users.length > 0 ? (
          users.map((user) => (
            <User
              key={user._id}
              userId={user._id}
              name={user.name}
              avatar={user.avatar.url}
            />
          ))
        ) : (
          <Typography>No users yet</Typography>
        )}
      </div>
    </div>
  );
};

export default Home;
