import React, { useState } from "react";
import "./CommentCard.css";
import { Link } from "react-router-dom";
import { Button, Dialog, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment,
  getMyPosts,
  getUserPosts,
  updateComment,
} from "../../Actions/Posts";
import { getPostOfFollowing } from "../../Actions/User";

const CommentCard = ({
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  isAccount,
  isUser,
}) => {
  const [editToggle, setEditToggle] = useState(false);
  const [EditCommentValue, setEditCommentValue] = useState(comment);

  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const { user } = useSelector((state) => state.user);
  const { user: getUser } = useSelector((state) => state.getUser);
  const dispatch = useDispatch();

  const handleDeleteComment = async () => {
    await dispatch(deleteComment(postId, commentId));

    if (isAccount) {
      dispatch(getMyPosts());
    } else if (isUser) {
      dispatch(getUserPosts(getUser._id));
    } else {
      dispatch(getPostOfFollowing());
    }
  };
  const handleEditComment = async (e) => {
    e.preventDefault();
    await dispatch(updateComment(postId, commentId, EditCommentValue));

    if (isAccount) {
      dispatch(getMyPosts());
    } else if (isUser) {
      dispatch(getUserPosts(getUser._id));
    } else {
      dispatch(getPostOfFollowing());
    }
  };

  return (
    <div className="commentUser">
      <Link to={`/user/${userId}`}>
        <img src={avatar} alt={name} />
        <Typography style={{ minWidth: "6vmax" }}>{name}</Typography>
      </Link>
      <Typography marginLeft="15px" marginRight="15%" width="40%">
        {comment}
      </Typography>

      {isAccount ? (
        <div>
          {userId === user._id ? (
            <Button onClick={() => setEditToggle(!editToggle)}>
              <Edit />
            </Button>
          ) : null}
          <Button onClick={handleDeleteComment}>
            <Delete />
          </Button>
        </div>
      ) : userId === user._id ? (
        <div>
          <Button onClick={() => setEditToggle(!editToggle)}>
            <Edit />
          </Button>
          <Button onClick={handleDeleteComment}>
            <Delete />
          </Button>
        </div>
      ) : null}

      <Dialog open={editToggle} onClose={() => setEditToggle(!editToggle)}>
        <div className="EditDialogBox">
          <Typography variant={isSmallScreen ? "h6" : "h4"}>Edit Comment</Typography>

          <form className="editForm" onSubmit={handleEditComment}>
            <input
              type="text"
              value={EditCommentValue}
              onChange={(e) => setEditCommentValue(e.target.value)}
              placeholder="Comment Here..."
              required
            />

            <Button type="submit" variant="contained">
              Edit
            </Button>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default CommentCard;
