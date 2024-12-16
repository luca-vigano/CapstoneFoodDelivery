import React from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { green } from "@mui/material/colors";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { clearCartAction } from "../State/Cart/Action";
import { useDispatch } from "react-redux";

export const PaymentSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoToHome = () => {
    dispatch(clearCartAction());
    navigate("/");
  };

  return (
    <div className="min-h-screen px-5">
      <div className="flex flex-col items-center justify-center h-[90vh]">
        <div className="box w-full lg:w-1/4 flex flex-col items-center rounded-md">
          <TaskAltIcon sx={{ fontSize: "5rem", color: green[500] }} />
          <h1 className="py-5 text-2xl font-semibold">Order Success!</h1>
          <p className="py-2 text-center text-gray-300 text-lg">
            Thank you for choosing our restaurant
          </p>
          <Button
            onClick={handleGoToHome}
            variant="contained"
            className="py-5"
            sx={{ margin: "1rem 0rem" }}
          >
            Go To Home
          </Button>
        </div>
      </div>
    </div>
  );
};
