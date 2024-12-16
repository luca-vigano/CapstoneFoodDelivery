import { Grid2 } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../State/Restaurant/Action";
import EventCard from "./EventCard";

const Events = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { restaurant } = useSelector((store) => store);

  console.log("Restaurant DATA", restaurant);

  useEffect(() => {
    dispatch(getAllEvents({ token }));
  }, []);

  return (
    <div className="lg:px-20 px-5 pb-10">
      <div className="py-5 flex justify-between items-center">
        <h1 className="text-2xl lg:text-7xl text-center font-bold p-5">
          Events
        </h1>
      </div>
      <Grid2 container spacing={3}>
        {restaurant.events?.map((event) => (
          <Grid2 item xs={12} sm={6} md={4} key={event.id}>
            <EventCard item={event} />
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
};

export default Events;
