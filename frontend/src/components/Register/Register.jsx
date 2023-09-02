import React, { useEffect, useState } from "react";
import "./Register.css";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { registerUser } from "../../Actions/User";
import { useAlert } from "react-alert";

const Register = () => {
  const [avatar, setAvatar] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdopg02mVDtsYi9vdcszqMBCicOE4JCEqfYg&usqp=CAU"
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error } = useSelector((state) => state.user);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
  };

  const registerHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser(avatar, name, email, password));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [dispatch, alert, error]);

  return (
    <div className="register">
      <form className="registerForm" onSubmit={registerHandler}>
        <Typography
          sx={{ padding: "2vmax", fontSize: { xs: "2rem", md: "2.5rem" } }}
        >
          SignUp to Bitgram
        </Typography>

        <Avatar
          src={avatar}
          alt="User"
          sx={{ height: "10vmax", width: "10vmax" }}
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <input
          type="text"
          className="registerInputs"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          className="registerInputs"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="registerInputs"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Link to="/">
          <Typography>Already signed up? Login</Typography>
        </Link>

        <Button disabled={loading} type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Register;
