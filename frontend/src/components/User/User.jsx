import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const User = ({ userId, name, avatar }) => {
  return (
    <Link to={`/user/${userId}`} className="homeUser">
      <img
        src={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdopg02mVDtsYi9vdcszqMBCicOE4JCEqfYg&usqp=CAU"
        }
        alt={name}
      />
      <Typography>{name}</Typography>
    </Link>
  );
};

export default User;
