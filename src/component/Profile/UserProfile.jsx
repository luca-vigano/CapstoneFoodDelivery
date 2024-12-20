import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../State/Authentication/Action";

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  console.log("auth", auth);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-center">
      <div className="flex flex-col items-center justify-center">
        <AccountCircleIcon sx={{ fontSize: "9rem" }} />
        <h1 className="py-5 text-5xl font-semibold">{auth.user?.fullName}</h1>
        <h5 className="text-3xl">{auth.user?.email}</h5>
        <Button
          variant="contained"
          onClick={handleLogout}
          color="secondary"
          sx={{ margin: "2rem 0rem" }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
