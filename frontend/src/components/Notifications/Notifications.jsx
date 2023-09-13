import React, { useEffect } from "react";
import "./Notifications.css";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { NotificationCard, Loading } from "../";
import { loadUser } from "../../Actions/User";

const Notifications = () => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const { user, loading } = useSelector((state) => state.user);
  return (
    <div className="notification">
      <div className="notificationContainer">
        <Typography variant={isSmallScreen ? "h6" : "h4"}>
          Notifications
        </Typography>
        {loading ? (
          <Loading />
        ) : user && user.notifications.length > 0 ? (
          user.notifications.map((item) => (
            <NotificationCard
              key={item._id}
              user={item.user}
              notification={item.notification}
              createdAt={item.createdAt}
              postImage = {item.post ? item.post.image.url : null}
            />
          ))
        ) : (
          <Typography marginTop="40%">No notifications to show</Typography>
        )}
      </div>
    </div>
  );
};

export default Notifications;
