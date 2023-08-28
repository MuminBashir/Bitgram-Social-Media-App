import React from "react";
import { User } from "../";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="homeleft"></div>
      <div className="homeright">
        <User
          userId={"user._id"}
          name={"Mumin Bashir"}
          avatar={"https://avatars.githubusercontent.com/u/94466348?v=4"}
        />
      </div>
    </div>
  );
};

export default Home;
