import React from "react";

export const CarouselItem = ({ image, title }) => {
  return (
    <div className="flex flex-col justify-center items-center mb-5">
      <img
        className="w-[50%] h-[20rem] lg:h-[35rem]  object-fill object-center rounded-md"
        src={image}
        alt=""
      />
      <span className="py-5 font-semibold text-xl">{title}</span>
    </div>
  );
};

export default CarouselItem;
