// import React, { useEffect } from "react";
// import AdminSideBar from "./AdminSideBar";
// import { Route, Routes } from "react-router-dom";
// import Orders from "../Orders/Orders";
// import Menu from "../Menu/Menu";
// import FoodCategory from "../FoodCategory/FoodCategory";
// import Ingredients from "../Ingredients/Ingredients";
// import Events from "../Events/Events";
// import RestaurantDetails from "./RestaurantDetails";
// import RestaurantDashboard from "../Dashboard/RestaurantDashboard";
// import CreateMenuForm from "../Menu/CreateMenuForm";
// import { useDispatch, useSelector } from "react-redux";
// import { getRestaurantsCategory } from "../../State/Restaurant/Action";
// import { fetchRestaurantsOrder } from "../../State/Restaurant Order/Action";
// import AdminPannel from "./AdminPannel";

// function Admin() {
//   const dispatch = useDispatch();
//   const token = localStorage.getItem("token");
//   const { restaurant } = useSelector((store) => store);
//   const handleClose = () => {};
//   useEffect(() => {
//     dispatch(
//       getRestaurantsCategory({
//         token,
//         restaurantId: restaurant.usersRestaurant?.id,
//       })
//     );
//     dispatch(
//       fetchRestaurantsOrder({
//         token,
//         restaurantId: restaurant.usersRestaurant?.id,
//       })
//     );
//   }, []);
//   return (
//     <div>
//       <div className="lg:flex justify-between">
//         <div>
//           {/* <AdminSideBar handleClose={handleClose} /> */}
//           <AdminPannel />
//         </div>
//         <div className="lg:w-[85%]">
//           <Routes>
//             <Route path="/" element={<RestaurantDashboard />} />
//             <Route path="/orders" element={<Orders />} />
//             <Route path="/menu" element={<Menu />} />
//             <Route path="/category" element={<FoodCategory />} />
//             <Route path="/ingredients" element={<Ingredients />} />
//             <Route path="/event" element={<Events />} />
//             <Route path="/details" element={<RestaurantDetails />} />
//             <Route path="/add-menu" element={<CreateMenuForm />} />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Admin;
