import React from "react";

const Cards = ({ image, title, description }) => {
  return (
    <div className="relative min-w-[350px] h-[420px] rounded-2xl overflow-hidden group cursor-pointer">

      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

      <div className="absolute bottom-5 left-5 text-white">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="text-sm opacity-90">{description}</p>
      </div>

    </div>
  );
};

export default Cards;