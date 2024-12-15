import React, { useEffect } from "react";
import OrderCard from "./OrderCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsersOrders } from "../State/Order/Action";

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
      <h1 className="text-xl text-center py-7 font-semibold">My orders</h1>
      <div className="space-y-5 w-full lg:w-1/2">
        {order.orders.map((order) => (
          <OrderCard order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
