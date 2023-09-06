import React from "react";
import "./Loading.css";
import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
  return (
    <div className="loadingPage">
       <CircularProgress color="primary" />
    </div>
  );
};

export default Loading;
