import React from "react";
import Carousel from "./Carousel";
import Newcarousel from "./Newcarousel";

function Infosection() {
  return (
    <div className="w-full bg-[#efefee] py-24 px-6 flex flex-col items-center text-center">

      <div className="max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          AI Travel Planner – Plan Your Perfect Trip with WhatDo AI
        </h2>

        <p className="mt-6 text-lg text-gray-600 leading-relaxed">
          Let our advanced AI travel planner create personalized itineraries in seconds.
          Discover hidden gems, optimize routes, and explore 50,000+ destinations worldwide.
        </p>
      </div>

      <div className="w-[60%] border-t border-gray-300 my-16"></div>

      <div className="max-w-3xl">
        <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
          Why Choose Our AI Travel Planner?
        </h3>

        <p className="mt-6 text-lg text-gray-600 leading-relaxed">
          Experience the future of travel planning with cutting-edge AI technology
          that understands your preferences and creates perfect itineraries instantly.
        </p>
      </div>

      <div className="mt-20 max-w-6xl w-full grid md:grid-cols-3 gap-12 text-center">

        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-6">
            <span className="text-3xl text-blue-600">⚡</span>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900">
            Instant AI Itineraries
          </h3>

          <p className="mt-4 text-gray-600 leading-relaxed">
            Generate complete travel plans in seconds with our advanced AI algorithms
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
            <span className="text-3xl text-green-600">🗺️</span>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900">
            Smart Route Optimization
          </h3>

          <p className="mt-4 text-gray-600 leading-relaxed">
            AI-powered route planning saves you time and maximizes your travel experience
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mb-6">
            <span className="text-3xl text-purple-600">🎛️</span>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900">
            Personalized AI Recommendations
          </h3>

          <p className="mt-4 text-gray-600 leading-relaxed">
            Machine learning adapts to your preferences for tailored travel suggestions
          </p>
        </div>

      </div>
      <Carousel/>
      <Newcarousel/>


    </div>
  );
}

export default Infosection;