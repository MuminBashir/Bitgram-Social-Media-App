import React, { useState } from "react";
import "./Post.css";
import { Avatar, Button, Typography } from "@mui/material";
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Post = ({
  postId,
  caption,
  postImage,
  likes = [],
  comments = [],
  ownerId,
  ownerImage,
  ownerName,
  isDelete = false,
  isAccount = false,
}) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="post">
      <div className="postHeader">
        {isAccount && (
          <Button>
            <MoreVert />
          </Button>
        )}
      </div>

      <img src={postImage} alt="Post" />

      <div className="postDetails">
        <Avatar
          src={ownerImage}
          alt="User"
          sx={{ width: "3vmax", height: "3vmax" }}
        />

        <Link to={`/user/${ownerId}`}>
          <Typography fontWeight="700">{ownerName}</Typography>
        </Link>

        <Typography
          fontWeight="100"
          color="rgba(0,0,0,0.582)"
          sx={{ alignSelf: "center" }}
        >
          {caption}
        </Typography>
      </div>

      <button
        style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          margin: "1vmax 2vmax",
        }}
      >
        5 Likes
      </button>

      <div className="postFooter">
        <Button onClick={handleLike}>
          {liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}
        </Button>
        <Button>
          <ChatBubbleOutline />
        </Button>
        {isDelete && (
          <Button>
            <DeleteOutline />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Post;
