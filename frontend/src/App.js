import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import {
  Account,
  Header,
  Home,
  Login,
  NewPost,
  Register,
  UpdatePassword,
  UpdateProfile,
} from "./components";
import { loadUser } from "./Actions/User";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  const checkTokenCookie = () => {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [name] = cookie.trim().split("=");
      if (name === "token") {
        // Cookie with the name "token" exists
        return true;
      }
    }
    // Cookie with the name "token" does not exist
    return false;
  };

  useEffect(() => {
    if (checkTokenCookie()) {
      dispatch(loadUser());
    }
  }, [dispatch]);

  return (
    <Router>
      {isAuthenticated && <Header />}
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
        <Route
          path="/account"
          element={isAuthenticated ? <Account /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Account /> : <Register />}
        />
        <Route
          path="/newpost"
          element={isAuthenticated ? <NewPost /> : <Login />}
        />
        <Route
          path="/update/profile"
          element={isAuthenticated ? <UpdateProfile /> : <Login />}
        />
        <Route
          path="/update/password"
          element={isAuthenticated ? <UpdatePassword /> : <Login />}
        />
      </Routes>
    </Router>
  );
}

export default App;
