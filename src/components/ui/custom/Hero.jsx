import React from 'react'
import { Button } from '../button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div
      className="w-full min-h-[92vh] flex items-center justify-center px-6 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e')"
      }}
    >

      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/20"></div>

      <div className="relative max-w-5xl text-center flex flex-col items-center gap-8 p-14 rounded-[30px] bg-white/10 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-white/20">

   <h1 className="font-extrabold text-[56px] leading-tight tracking-tight text-white">

  <span className="block">
    Discover Your Next Adventure with AI
  </span>

  <span className="block mt-3 text-white/85 text-[42px] font-semibold">
    Personalized Itineraries at Your Fingertips
  </span>

</h1>

        <p className="text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed">
          Your personal AI travel planner that creates smart itineraries,
          discovers hidden destinations, and plans trips perfectly based on
          your interests and budget.
        </p>

        <Link to={'/create-trip'}>
          <Button className="px-10 py-6 text-lg font-semibold rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 hover:scale-110 hover:shadow-[0_10px_40px_rgba(255,100,100,0.6)] transition-all duration-300">
            Start Planning Your Trip ✈️
          </Button>
        </Link>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-6 text-white">

          <div className="flex flex-col items-center gap-2 hover:scale-110 transition">
            <span className="text-4xl">🌍</span>
            <p className="text-sm text-white/80">Smart Destinations</p>
          </div>

          <div className="flex flex-col items-center gap-2 hover:scale-110 transition">
            <span className="text-4xl">🧭</span>
            <p className="text-sm text-white/80">AI Itineraries</p>
          </div>

          <div className="flex flex-col items-center gap-2 hover:scale-110 transition">
            <span className="text-4xl">💰</span>
            <p className="text-sm text-white/80">Budget Planning</p>
          </div>

          <div className="flex flex-col items-center gap-2 hover:scale-110 transition">
            <span className="text-4xl">✈️</span>
            <p className="text-sm text-white/80">Easy Travel</p>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Hero