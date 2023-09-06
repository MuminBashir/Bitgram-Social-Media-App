import React, { useState } from "react";
import "./Search.css";
import { Button, Typography } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../Actions/User";
import { User } from "../";

const Search = () => {
  const dispatch = useDispatch();

  const { users, loading } = useSelector((state) => state.allUsers);

  const [name, setName] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    dispatch(getAllUsers(name));
  };

  return (
    <div className="search">
      <form className="searchForm" onSubmit={searchHandler}>
        <input
          type="text"
          placeholder="Search"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Button disabled={loading} type="submit">
          <Button>
            <SearchOutlined />
          </Button>
          Search
        </Button>

        <div className="searchResults">
          {users && users.length > 0 ? (
            users.map((user) => (
              <User
                key={user._id}
                userId={user._id}
                name={user.name}
                avatar={user.avatar.url}
              />
            ))
          ) : (
            <Typography color="rgba(0,0,0,0.55)" textAlign="center">No user found</Typography>
          )}
        </div>
      </form>
    </div>
  );
};

export default Search;
