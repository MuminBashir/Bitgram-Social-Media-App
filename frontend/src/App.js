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
          element={!isAuthenticated ? <Login /> : <Navigate to="/account" />}
        />
        <Route
          path="/register"
          element={!isAuthenticated ? <Register /> : <Navigate to="/account" />}
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
      </Routes>
    </Router>
  );
}

export default App;
