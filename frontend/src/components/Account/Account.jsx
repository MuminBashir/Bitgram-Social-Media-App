import React, { useEffect, useState } from "react";
import "./Account.css";
import { useDispatch, useSelector } from "react-redux";
import { getMyPosts } from "../../Actions/Posts";
import { Loading, Post, User } from "../";
import { Avatar, Button, Dialog, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { logoutUser } from "../../Actions/User";

const Account = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const {
    user,
    loading: userLoading,
  } = useSelector((state) => state.user);
  const { loading, posts, error } = useSelector((state) => state.myPosts);
  const { message, error: likeError } = useSelector((state) => state.like);

  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);

  const logoutHandler = () => {
    dispatch(logoutUser());
    alert.success("Logged out successfully");
  };

  useEffect(() => {
    dispatch(getMyPosts());
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
    <div className="account">
      <div className="accountleft">
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
              isAccount={true}
              isDelete={true}
            />
          ))
        ) : (
          <Typography variant="h6">You have not made any posts yet.</Typography>
        )}
      </div>
      <div className="accountright">
        {userLoading ? (
          <Loading />
        ) : (
          <>
            {" "}
            <Avatar
              src={user.avatar.url}
              alt={user.name}
              sx={{ height: "8vmax", width: "8vmax" }}
            />
            <Typography variant="h6">{user.name}</Typography>
            <div>
              <button onClick={() => setFollowersToggle(!followersToggle)}>
                <Typography>Followers</Typography>
              </button>
              <Typography>{user.followers.length}</Typography>
            </div>
            <div>
              <button onClick={() => setFollowingToggle(!followingToggle)}>
                <Typography>Following</Typography>
              </button>
              <Typography>{user.following.length}</Typography>
            </div>
            <div>
              <Typography>Posts</Typography>

              <Typography>{user.posts.length}</Typography>
            </div>
            <Button variant="contained" onClick={logoutHandler}>
              Logout
            </Button>
            <Link to="/update/profile">Edit Profile</Link>
            <Link to="/update/password">Change Password</Link>
            <Button variant="text" style={{ color: "red", margin: "2vmax" }}>
              Delete Profile
            </Button>
          </>
        )}

        <Dialog
          open={followersToggle}
          onClose={() => setFollowersToggle(!followersToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Followers</Typography>
            {user && user.followers.length > 0 ? (
              user.followers.map((follower) => (
                <User
                  key={follower._id}
                  userId={follower._id}
                  name={follower.name}
                  avatar={follower.avatar.url}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax 0" }}>
                You have no followers
              </Typography>
            )}
          </div>
        </Dialog>

        <Dialog
          open={followingToggle}
          onClose={() => setFollowingToggle(!followingToggle)}
        >
          <div className="DialogBox">
            <Typography variant="h4">Following</Typography>
            {user && user.following.length > 0 ? (
              user.following.map((follow) => (
                <User
                  key={follow._id}
                  userId={follow._id}
                  name={follow.name}
                  avatar={follow.avatar.url}
                />
              ))
            ) : (
              <Typography style={{ margin: "2vmax 0" }}>
                You are not following anyone
              </Typography>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default Account;
