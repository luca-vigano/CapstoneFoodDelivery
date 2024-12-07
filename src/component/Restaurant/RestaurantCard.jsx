import { Card, Chip, IconButton } from "@mui/material";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToFavorite } from "../State/Authentication/Action";

export const RestaurantCard = ({ item }) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token =localStorage.getItem("token")
  
  const handleAddToFavorite() => {
    dispatch(addToFavorite({restaurantId:item.id,token}))
  }
  return (
    <div>
      <Card className="w-[18rem]">
        <div
          className={`${
            true ? "cursor-pointer" : "cursor-not-allowed"
          } relative`}
        >
          <img
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
          <div className="space-y-1">
            <p className="font-semibold text-lg">{item.name}</p>
            <p className="text-gray-500 text-sm">{item.description} </p>
          </div>
          <div>
            <IconButton>
              {true ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default RestaurantCard;
