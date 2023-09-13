import React from "react";
import "./NotificationCard.css";
import { Link } from "react-router-dom";
import moment from "moment";
import { Typography } from "@mui/material";

const NotificationCard = ({ user, notification, createdAt, postImage }) => {
  return (
    <div className="notificationBox">
      <div className="mainNotificationBox">
        <div className="notificationUser">
          <Link to={`/user/${user._id}`}>
            <img src={user.avatar.url} alt={user.name} />
          </Link>
        <Typography>{notification}</Typography>
        </div>
        {postImage && <img className="postImage" src={postImage} alt="post" />}
      </div>
      <Typography variant="caption" textAlign="end">
        {moment(createdAt).startOf("ss").fromNow()}
      </Typography>
    </div>
  );
};

export default NotificationCard;
