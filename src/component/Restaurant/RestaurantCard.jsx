import { Card, Chip, IconButton } from "@mui/material";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorite } from "../State/Authentication/Action";
import { isPresentInFavorites } from "../config/logic";

export const RestaurantCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { auth } = useSelector((store) => store);
  console.log(" favorite card", item);

  const handleAddToFavorite = () => {
    dispatch(addToFavorite({ restaurantId: item.id, token }));
  };

  const handleNavigateToRestaurant = () => {
    if (item.open) {
      navigate(`/restaurant/${item.address.city}/${item.name}/${item.id}`);
    }
  };
  return (
    <div>
      <Card className="w-[18rem]">
        <div
          className={`${
            true ? "cursor-pointer" : "cursor-not-allowed"
          } relative`}
        >
          <img
            onClick={handleNavigateToRestaurant}
            className="w-full h-[10rem] rounded-t-md object-cover"
            src={item.images[0]}
            alt="immage of restaurant"
          />
          <Chip
            size="small"
            className="absolute top-2 left-2"
            color={item.open ? "success" : "error"}
            label={item.open ? "open" : "closed"}
          />
        </div>
        <div className="p-4 textPart lg:flex w-full justify-between">
          <div onClick={handleNavigateToRestaurant} className="space-y-1">
            <p className="font-semibold text-lg cursor-pointer">{item.name}</p>
            <p className=" text-sm">{item.description} </p>
          </div>
          <div>
            <IconButton onClick={handleAddToFavorite} sx={{ color: "#D8BD8A" }}>
              {isPresentInFavorites(auth.favorites, item) ? (
                <FavoriteIcon />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default RestaurantCard;
