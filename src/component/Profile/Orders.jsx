import React, { useEffect } from "react";
import OrderCard from "./OrderCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsersOrders } from "../State/Order/Action";
import { Grid2 } from "@mui/material";

const Orders = () => {
  const { auth, order } = useSelector((store) => store);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersOrders(token));
  }, [auth.token]);

  return (
    <div className="flex items-center flex-col">
      <h1 className="text-5xl  text-center py-7 font-semibold">My Orders</h1>
      <Grid2
        container
        spacing={2}
        justifyContent="center"
        sx={{ width: "100%", maxWidth: "1200px" }}
      >
        {order.orders.map((order, index) => (
          <Grid2 key={index} size={{ xs: 12, lg: 4 }}>
            <OrderCard order={order} />
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
};

export default Orders;
