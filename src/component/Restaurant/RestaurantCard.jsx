import { Card, Chip, IconButton } from "@mui/material";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export const RestaurantCard = () => {
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
            src="https://images.pexels.com/photos/6289881/pexels-photo-6289881.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="immage of restaurant"
          />
          <Chip
            size="small"
            className="absolute top-2 left-2"
            color={true ? "success" : "error"}
            label={true ? "open" : "closed"}
          />
        </div>
        <div className="p-4 textPart lg:flex w-full justify-between">
          <div className="space-y-1">
            <p className="font-semibold text-lg">nome ristorante</p>
            <p className="text-gray-500 text-sm"> descrizione di prova</p>
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
