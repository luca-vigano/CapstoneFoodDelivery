import React from "react";
import RestaurantCard from "../Restaurant/RestaurantCard";
import { useSelector } from "react-redux";

const Favorites = () => {
  const { auth } = useSelector((store) => store);
  console.log("auth favorite", auth.favorites);

  return (
    <div>
      <h1 className="py-5 text-5xl font-semibold text-center">MY Favorites</h1>
      <div className="flex flex-wrap gap-3 justify-center pt-5">
        {auth.favorites.map((item) => (
          <RestaurantCard item={item} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
