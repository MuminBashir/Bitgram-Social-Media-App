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
  Register,
  ResetPassword,
  UpdatePassword,
  UpdateProfile,
} from "./components";
import { loadUser } from "./Actions/User";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

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
          element={isAuthenticated ? <Navigate to="/account" /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/account" /> : <Register />}
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
            isAuthenticated ? <Navigate to="/update/password" /> : <ForgotPassword/>
          }
        />
        <Route
          path="/password/reset/:token"
          element={
            isAuthenticated ? <Navigate to="/update/password" /> : <ResetPassword/>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
