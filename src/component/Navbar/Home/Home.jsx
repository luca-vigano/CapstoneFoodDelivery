import React, { useEffect } from "react";
import "./Home.css";
import HomeCarousel from "./HomeCarousel";
import { RestaurantCard } from "../../Restaurant/RestaurantCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurantsAction } from "../../State/Restaurant/Action";
import { useNavigate } from "react-router-dom";
import CustomFooter from "../../Footer/CustomFooter";

export const Home = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { restaurant } = useSelector((store) => store);
  const navigate = useNavigate();

  console.log("Restaurant", restaurant);

  useEffect(() => {
    dispatch(getAllRestaurantsAction(token));
  }, []);

  return (
    <div className="pb-10">
      <section className="banner -z-50 relative flex flex-col justify-center items-center">
        <div className="w-[50vw] z-10 text-center">
          <p className="text-2xl lg:text-6xl font-bold z-10 py-5">Click Food</p>
          <p className="z-10 text-gray-300 text-xl lg:text-4xl">
            Hai fame? Ci pensiamo noi
          </p>
        </div>
        <div className="cover absolute top-0 left-0 right-0"></div>
        <div className="fadout"></div>
      </section>
      <section className="p-10 lg:py-10 lg:px-20">
        <p className="text-2xl font-semibold text-gray-400 py-3 pb-10">
          Un Mondo di Scelte
        </p>
        <HomeCarousel />
      </section>
      <section className="px-5 lg:px-20 pt-10">
        <h1 className="text-2xl font-semibold text-gray-400 pb-8">
          Scegli Dove Ordinare
        </h1>
        <div className="flex flex-wrap items-center justify-around gap-5">
          {restaurant.restaurants?.map((item) => (
            <RestaurantCard item={item} />
          ))}
        </div>
      </section>
      <section className="px-5 lg:px-20 pt-10">
        <CustomFooter />
      </section>
    </div>
  );
};
