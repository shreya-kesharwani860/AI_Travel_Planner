import React, { useRef } from "react";
import Newcards from "./Newcards";

const Newcarousel = () => {

  const scrollRef = useRef();

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -400,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 400,
      behavior: "smooth",
    });
  };

  const destinations = [
    {
      image: "/mexicofood.jpg",
      title: "Mexico City, Mexico",
      description: "The city of beautiful beaches and opera.",
    },
    {
      image: "/italyfood.jpg",
      title: "Rome, Italy",
      description: "A perfect blend of tradition and modernity.",
    },
    {
      image: "/spainfood.jpg",
      title: "Barcelona, Spain",
      description: "The city of love and lights.",
    },
  ];

  return (
    <section className="py-20 bg-gray-100">

      <div className="text-center mb-12">
        <h2 className="text-5xl font-semibold">AI-Curated Food Experiences</h2>
        <p className="text-gray-500 mt-3">
          Let our AI guide you to the best culinary adventures in each destination
        </p>
      </div>

      <div className="flex items-center relative">

        {/* Left Button */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 z-10 bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center"
        >
          ←
        </button>

        {/* Cards */}
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-scroll scrollbar-hide px-12"
        >
          {destinations.map((place, index) => (
            <Newcards
              key={index}
              image={place.image}
              title={place.title}
              description={place.description}
            />
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={scrollRight}
          className="absolute right-0 z-10 bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center"
        >
          →
        </button>

      </div>
    </section>
  );
};

export default Newcarousel;