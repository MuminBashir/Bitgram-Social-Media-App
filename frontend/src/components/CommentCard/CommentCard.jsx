import React, { useState } from "react";
import "./CommentCard.css";
import { Link } from "react-router-dom";
import { Button, Dialog, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, updateComment } from "../../Actions/Posts";
import { getPostOfFollowing } from "../../Actions/User";

const CommentCard = ({
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  isAccount,
}) => {
  const [editToggle, setEditToggle] = useState(false);
  const [EditCommentValue, setEditCommentValue] = useState(comment);

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleDeleteComment = async () => {
    await dispatch(deleteComment(postId, commentId));

    if (isAccount) {
    } else {
      dispatch(getPostOfFollowing());
    }
  };
  const handleEditComment = async (e) => {
    e.preventDefault();
    await dispatch(updateComment(postId, commentId, EditCommentValue));

    if (isAccount) {
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
      <Typography marginRight="15%" width="40%">
        {comment}
      </Typography>

      {isAccount ? (
        <>
          <Button onClick={handleDeleteComment}>
            <Delete />
          </Button>
          <Button onClick={handleEditComment}>
            <Edit />
          </Button>
        </>
      ) : userId === user._id ? (
        <>
          <Button onClick={() => setEditToggle(!editToggle)}>
            <Delete />
          </Button>
          <Button onClick={() => setEditToggle(!editToggle)}>
            <Edit />
          </Button>
        </>
      ) : null}

      <Dialog open={editToggle} onClose={() => setEditToggle(!editToggle)}>
        <div className="EditDialogBox">
          <Typography variant="h4">Edit Comment</Typography>

          <form className="commentForm" onSubmit={handleEditComment}>
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
