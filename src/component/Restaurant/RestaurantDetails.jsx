import {
  Divider,
  FormControl,
  FormControlLabel,
  Grid2,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MenuCard from "./MenuCard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getRestaurantById,
  getRestaurantsCategory,
} from "../State/Restaurant/Action";
import { getMenuItemsByRestaurantId } from "../State/Menu/Action";

const foodTypes = [
  { label: "All", value: "All" },
  { label: "Vegetarian only", value: "vegetarian" },
  { label: "Non-Vegetarian", value: "non_vegetarian" },
];

const RestaurantDetails = () => {
  const [foodType, setFoodType] = useState("All");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { auth, restaurant, menu } = useSelector((store) => store);
  const [selectedCategory, setSelectedCategory] = useState("");
  console.log("menu item+++++++++", restaurant);

  const { id, city } = useParams();

  const handleFilter = (e) => {
    setFoodType(e.target.value);
  };

  const handleFilterCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  useEffect(() => {
    dispatch(getRestaurantById({ token, restaurantId: id }));
    dispatch(getRestaurantsCategory({ token, restaurantId: id }));
  }, []);

  useEffect(() => {
    if (selectedCategory === "" || selectedCategory === "All") {
      dispatch(
        getMenuItemsByRestaurantId({
          token,
          restaurantId: id,
          vegetarian: foodType === "vegetarian",
          nonvegetarian: foodType === "non_vegetarian",
          foodCategory: "",
        })
      );
    } else {
      dispatch(
        getMenuItemsByRestaurantId({
          token,
          restaurantId: id,
          vegetarian: foodType === "vegetarian",
          nonvegetarian: foodType === "non_vegetarian",
          foodCategory: selectedCategory,
        })
      );
    }
  }, [selectedCategory, dispatch, id, token, foodType]);

  return (
    <div className="px-5 lg:px-20">
      <section>
        <div>
          <Grid2 container spacing={2}>
            {restaurant.restaurant?.images.map((image, index) => (
              <Grid2
                className="pt-5"
                size={{ xs: 12, lg: index % 2 === 0 ? 12 : 6 }}
                key={index}
              >
                <img
                  className="w-full h-[40vh] object-cover"
                  src={image}
                  alt="restaurant"
                />
              </Grid2>
            ))}
          </Grid2>
        </div>
        <div className="pt-3 pb-5">
          <h1 className="text-4xl font-semibold">
            {restaurant.restaurant?.name}
          </h1>
          <p className="text-gray-500 mt-1">
            {restaurant.restaurant?.description}
          </p>
          <div className="space-y-3 mt-3">
            <p className="text-gray-500 flex items-center gap-3">
              <LocationOnIcon />
              <span>{restaurant.restaurant?.address.city},</span>
              <span>{restaurant.restaurant?.address.streetAddress}</span>
            </p>
            <p className="text-gray-500 flex items-center gap-3">
              <CalendarTodayIcon />
              <span>{restaurant.restaurant?.openingHours}</span>
            </p>
          </div>
        </div>
      </section>
      <Divider />
      <section className="pt-[2rem] lg:flex relative">
        <div className="space-y-10 lg:w-[20%] filter">
          <div className="box space-y-5 lg:sticky top-28">
            <div>
              <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                Food Type
              </Typography>
              <FormControl className="py-10 space-y-5" component={"fieldset"}>
                <RadioGroup
                  onChange={handleFilter}
                  name="food_type"
                  value={foodType}
                >
                  {foodTypes.map((item) => (
                    <FormControlLabel
                      key={item.value}
                      value={item.value}
                      control={<Radio />}
                      label={item.label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
            <Divider />
            <div>
              <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                Food Category
              </Typography>
              <FormControl className="py-10 space-y-5" component={"fieldset"}>
                <RadioGroup
                  onChange={handleFilterCategory}
                  name="food_category"
                  value={selectedCategory || "All"}
                >
                  <FormControlLabel
                    value="All"
                    control={<Radio />}
                    label="All"
                  />
                  {restaurant.categories.map((item) => (
                    <FormControlLabel
                      key={item.id}
                      value={item.name}
                      control={<Radio />}
                      label={item.name}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="space-y-5 lg:w-[80%] lg:pl-10">
          {menu.menuItems.map((item) => (
            <MenuCard item={item} key={item.id} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default RestaurantDetails;
