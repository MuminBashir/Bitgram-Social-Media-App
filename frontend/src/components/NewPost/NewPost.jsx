import React, { useEffect, useState } from "react";
import "./NewPost.css";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { createNewPost } from "../../Actions/Posts";
import { loadUser } from "../../Actions/User";

const NewPost = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  const { loading, message, error } = useSelector((state) => state.like);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createNewPost(caption, image));
    dispatch(loadUser());
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, alert, message, error]);

  return (
    <div className="newPost">
      <form className="newPostForm" onSubmit={handleSubmit}>
        <Typography variant="h3">New Post</Typography>
        {image && <img src={image} alt="post" />}

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        <Typography variant="caption" color="rgba(0,0,0,0.75)">
          Max size 50 Mb
        </Typography>

        <input
          type="text"
          placeholder="Caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <Button disabled={loading} type="submit" variant="contained">
          Post
        </Button>
      </form>
    </div>
  );
};

export default NewPost;
