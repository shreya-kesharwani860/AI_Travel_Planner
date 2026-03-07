import React, { useEffect, useState } from 'react'
import { Button } from '../button'
import { Link } from 'react-router-dom'

function Hero() {
  const images = [
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
  ]

  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 2800)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="w-full min-h-[92vh] flex items-center justify-center px-6 bg-cover bg-center relative transition-all duration-1000"
      style={{
        backgroundImage: `url(${images[currentImage]})`
      }}
    >

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative flex flex-col items-center text-center gap-8 max-w-5xl w-full">

        <h1 className="text-white text-[64px] font-bold tracking-tight">
          Explore the World with AI
        </h1>

        <p className="text-white/80 text-lg max-w-2xl leading-relaxed">
          Discover hidden destinations, generate personalized travel itineraries,
          and plan the perfect trip using AI powered travel intelligence.
        </p>

        <Link to={'/create-trip'}>
          <Button className="px-10 py-5 rounded-full bg-yellow-400 text-black font-semibold hover:scale-105 hover:bg-yellow-300 transition">
            Discover My Area 🌍
          </Button>
        </Link>

      </div>

    </div>
  )
}

export default Hero