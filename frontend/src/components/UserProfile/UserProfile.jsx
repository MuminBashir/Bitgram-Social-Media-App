import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading, Post, User } from "../";
import { Avatar, Button, Dialog, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { getMyPosts, getUserPosts } from "../../Actions/Posts";
import { getUserProfile } from "../../Actions/User";

const UserProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();

  const { user, loading: userLoading } = useSelector((state) => state.getUser);
  const { user: me } = useSelector((state) => state.user);
  const { loading, posts, error } = useSelector((state) => state.userPosts);
  const { message, error: likeError } = useSelector((state) => state.like);

  const [followersToggle, setFollowersToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  const [following, setFollowing] = useState(false);
  const [myProfile, setMyProfile] = useState(false);

  const followHandler = () => {
    setFollowing(!following);
  };

  useEffect(() => {
    if (params.id === me._id) {
      setMyProfile(true);
    }
    dispatch(getUserPosts(params.id));
    dispatch(getUserProfile(params.id));
  }, [dispatch, params.id, me._id]);

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
      dispatch(getMyPosts());
    }
  }, [dispatch, alert, error, likeError, message]);

  return (
    <div className="account">
      <div className="accountleft">
        {!posts || loading ? (
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
          <Typography variant="h6">User has not made any posts yet.</Typography>
        )}
      </div>
      <div className="accountright">
        {!user || userLoading ? (
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
            {myProfile ? (
              <></>
            ) : (
              <Button
                variant="contained"
                style={{ backgroundColor: following ? "red" : "blue" }}
                onClick={followHandler}
              >
                {following ? "Unfollow" : "Follow"}
              </Button>
            )}
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

export default UserProfile;
