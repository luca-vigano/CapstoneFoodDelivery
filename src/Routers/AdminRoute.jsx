import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateRestaurantForm from "../component/AdminComponent/CreateRestaurantForm/CreateRestaurantForm";
import { useSelector } from "react-redux";
import AdminPannel from "../component/AdminComponent/Admin/AdminPannel";

function AdminRoute() {
  const { restaurant } = useSelector((store) => store);

  console.log("RES from store", restaurant);
  return (
    <div>
      <Routes>
        <Route
          path="/*"
          element={
            !restaurant.usersRestaurant ? (
              <CreateRestaurantForm />
            ) : (
              <AdminPannel />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default AdminRoute;
