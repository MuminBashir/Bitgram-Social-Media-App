import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import {
  Account,
  ForgotPassword,
  Header,
  Home,
  Login,
  NewPost,
  NotFound,
  Register,
  ResetPassword,
  Search,
  UpdatePassword,
  UpdateProfile,
  UserProfile,
} from "./components";
import { loadUser } from "./Actions/User";

function App() {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (
      window.location.pathname !== "/register" &&
      window.location.pathname !== "/forgot/password" &&
      !window.location.pathname.includes("/password/reset/")
    ) {
      dispatch(loadUser());
    }
    const handleBeforeUnload = () => {
      localStorage.setItem("lastPath", window.location.pathname);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [dispatch]);

  let lastPath = localStorage.getItem("lastPath");
  if (lastPath === "/login") {
    lastPath = "/";
  }
  const redirectToPath = lastPath || "/";

  return (
    <Router>
      {isAuthenticated && <Header />}
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to={redirectToPath} /> : <Login />
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to={redirectToPath} /> : <Register />
          }
        />
        <Route
          path="/account"
          element={isAuthenticated ? <Account /> : <Navigate to="/login" />}
        />
        <Route
          path="/newpost"
          element={isAuthenticated ? <NewPost /> : <Navigate to="/login" />}
        />
        <Route
          path="/update/profile"
          element={
            isAuthenticated ? <UpdateProfile /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/update/password"
          element={
            isAuthenticated ? <UpdatePassword /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/forgot/password"
          element={
            isAuthenticated ? (
              <Navigate to="/update/password" />
            ) : (
              <ForgotPassword />
            )
          }
        />
        <Route
          path="/password/reset/:token"
          element={
            isAuthenticated ? (
              <Navigate to="/update/password" />
            ) : (
              <ResetPassword />
            )
          }
        />
        <Route
          path="/user/:id"
          element={isAuthenticated ? <UserProfile /> : <Navigate to="/login" />}
        />

        <Route
          path="/search"
          element={isAuthenticated ? <Search /> : <Navigate to="/login" />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
