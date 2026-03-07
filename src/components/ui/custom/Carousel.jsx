import React, { useRef } from "react";
import Cards from "./Cards";

const Carousel = () => {

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
      image: "/paris.jpg",
      title: "Paris, France",
      description: "The city of love and lights.",
    },
    {
      image: "/newyork.jpg",
      title: "New York, USA",
      description: "The city that never sleeps.",
    },
    {
      image: "/dubai.jpg",
      title: "Dubai, UAE",
      description: "Luxury and futuristic skyline.",
    },
  ];

  return (
    <section className="py-20 bg-gray-100">

      <div className="text-center mb-12">
        <h2 className="text-5xl font-semibold">AI-Recommended Destinations</h2>
        <p className="text-gray-500 mt-3">
          Top destinations selected by our AI based on millions of traveler experiences
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
            <Cards
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

export default Carousel;