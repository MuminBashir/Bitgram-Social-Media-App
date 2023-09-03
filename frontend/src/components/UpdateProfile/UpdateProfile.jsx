import React, { useEffect, useState } from "react";
import "./UpdateProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Typography } from "@mui/material";
import { useAlert } from "react-alert";
import { loadUser, updateProfile } from "../../Actions/User";

const UpdateProfile = () => {
  const { loading, user, error, message } = useSelector((state) => state.user);

  const [prevAvatar, setPrevAvatar] = useState(user.avatar.url);
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const dispatch = useDispatch();
  const alert = useAlert();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
        setPrevAvatar(Reader.result);
      }
    };
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile(avatar, name, email));
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
  }, [dispatch, alert, error, message]);

  return (
    <div className="updateProfile">
      <form className="updateProfileForm" onSubmit={updateProfileHandler}>
        <Typography
          sx={{ padding: "2vmax", fontSize: { xs: "2rem", md: "2.5rem" } }}
        >
          Update your profile
        </Typography>

        <Avatar
          src={prevAvatar}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <input
          type="text"
          className="updateProfileInputs"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          className="updateProfileInputs"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Button disabled={loading} type="submit">
          Update
        </Button>
      </form>
    </div>
  );
};

export default UpdateProfile;
