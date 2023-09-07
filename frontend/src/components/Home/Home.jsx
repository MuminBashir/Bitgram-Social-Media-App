import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Post, User, Loading } from "../";
import "./Home.css";
import { getAllUsers, getPostOfFollowing } from "../../Actions/User";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAlert } from "react-alert";

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const { loading, posts, error } = useSelector(
    (state) => state.postOfFollowing
  );

  const { user: me } = useSelector((state) => state.user);

  const { users, loading: usersLoading } = useSelector(
    (state) => state.allUsers
  );

  const { message, error: likeError } = useSelector((state) => state.like);

  useEffect(() => {
    dispatch(getPostOfFollowing());
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (likeError) {
      alert.error(likeError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, alert, error, likeError, message]);

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
              createdAt={post.createdAt}
            />
          ))
        ) : (
          <Typography variant="h5" marginTop={isSmallScreen ? "50%" : "2%"}>
            No Posts Yet
          </Typography>
        )}
      </div>
      <div className="homeright">
        <Typography variant="h6" textAlign="center">
          Suggested Users
        </Typography>
        {usersLoading ? (
          <Loading />
        ) : users && users.length > 0 ? (
          users.map((user, index) => {
            if (index > 5) {
              return null;
            }
            if (user._id === me._id) {
              return null;
            } else {
              return (
                <User
                  key={user._id}
                  userId={user._id}
                  name={user.name}
                  avatar={user.avatar.url}
                />
              );
            }
          })
        ) : (
          <Typography>No Users Yet</Typography>
        )}
      </div>
    </div>
  );
};

export default Home;
