import React from "react";
import "./NotFound.css";
import { ErrorOutline } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="notFound">
      <div className="notFoundContainer">
        <ErrorOutline />

        <Typography variant="h2" style={{ padding: "2vmax" }}>
          Page Not Found
        </Typography>

        <Link to="/">
          <Typography variant="h5">Go to Home</Typography>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
