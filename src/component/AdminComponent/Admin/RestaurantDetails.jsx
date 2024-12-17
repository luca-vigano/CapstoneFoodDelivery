import { Button, Card, CardContent, CardHeader, Grid2 } from "@mui/material";
import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useDispatch, useSelector } from "react-redux";
import { updateRestaurantStatus } from "../../State/Restaurant/Action";

const RestaurantDetails = () => {
  const { restaurant } = useSelector((store) => store);
  console.log("restaurant from store+", restaurant);
  const dispatch = useDispatch();
  const handleRestaurantStatus = () => {
    dispatch(
      updateRestaurantStatus({
        restaurantId: restaurant.usersRestaurant.id,
        token: localStorage.getItem("token"),
      })
    );
  };

  return (
    <div className="lg:px-20 px-5 pb-10">
      <div className="py-5 flex justify-center items-center gap-5">
        <h1 className="text-2xl lg:text-7xl text-center font-bold p-5">
          {restaurant.usersRestaurant?.name}
        </h1>
        <div>
          <Button
            color={!restaurant.usersRestaurant?.open ? "primary" : "error"}
            className="py-[1rem] px-[2rem]"
            variant="contained"
            onClick={handleRestaurantStatus}
            size="large"
          >
            {restaurant.usersRestaurant?.open ? "close" : "open"}
          </Button>
        </div>
      </div>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12 }}>
          <Card>
            <CardHeader title={<span>Restaurant</span>} />
            <CardContent>
              <div className="space-y-4">
                <div className="flex">
                  <p className="w-48">Owner</p>
                  <p>
                    <span className="pr-5">-</span>
                    {restaurant.usersRestaurant?.owner.fullName}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Restaurant Name</p>
                  <p>
                    <span className="pr-5">-</span>
                    {restaurant.usersRestaurant?.name}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Tipo cucina</p>
                  <p>
                    <span className="pr-5">-</span>
                    {restaurant.usersRestaurant?.cuisineType}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Orari Apertura</p>
                  <p>
                    <span className="pr-5">-</span>
                    {restaurant.usersRestaurant?.openingHours}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Status</p>
                  <p>
                    <span className="pr-5">-</span>
                    {restaurant.usersRestaurant?.open ? (
                      <span className="px-5 py-2 rounded-full bg-green-400 text-gray-950">
                        Open
                      </span>
                    ) : (
                      <span className="px-5 py-2 rounded-full bg-red-400 text-gray-950">
                        Close
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <Card>
            <CardHeader title={<span>Address</span>} />
            <CardContent>
              <div>
                <div className="flex">
                  <p className="w-48">Country</p>
                  <p>
                    <span className="pr-5">-</span>
                    {restaurant.usersRestaurant?.address.country}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">City</p>
                  <p>
                    <span className="pr-5">-</span>
                    {restaurant.usersRestaurant?.address.city}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Postal Code</p>
                  <p>
                    <span className="pr-5">-</span>
                    {restaurant.usersRestaurant?.address.postalCode}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Street Address</p>
                  <p>
                    <span className="pr-5">-</span>
                    {restaurant.usersRestaurant?.address.streetAddress}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <Card>
            <CardHeader title={<span>Contact</span>} />
            <CardContent>
              <div className="space-y-4">
                <div className="flex">
                  <p className="w-48">Email</p>
                  <p>
                    <span className="pr-5">-</span>
                    {restaurant.usersRestaurant?.contactInformation.email}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Mobile</p>
                  <p>
                    <span className="pr-5">-</span>
                    {restaurant.usersRestaurant?.contactInformation.mobile}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Social</p>
                  <div className="flex  items-center pb-3 gap-2">
                    <span className="pr-5">-</span>
                    <a
                      href={
                        restaurant.usersRestaurant?.contactInformation.instagram?.startsWith(
                          "http"
                        )
                          ? restaurant.usersRestaurant?.contactInformation
                              .instagram
                          : `https://${restaurant.usersRestaurant?.contactInformation.instagram}`
                      }
                    >
                      <InstagramIcon sx={{ fontSize: "3rem" }} />
                    </a>
                    <a
                      href={
                        restaurant.usersRestaurant?.contactInformation.twitter?.startsWith(
                          "http"
                        )
                          ? restaurant.usersRestaurant?.contactInformation
                              .twitter
                          : `https://${restaurant.usersRestaurant?.contactInformation.twitter}`
                      }
                    >
                      <XIcon sx={{ fontSize: "3rem" }} />
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default RestaurantDetails;
