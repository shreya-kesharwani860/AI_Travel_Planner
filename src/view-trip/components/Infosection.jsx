import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io"

function Infosection({ trip }) {

  const [photoUrl, setPhotoUrl] = useState('https://loremflickr.com/1600/900/landscape');

  useEffect(() => {
    if (trip?.userselection?.location) {

      const cleanLocation = trip.userselection.location
        .split(',')[0]
        .split(' ')
        .slice(0,2)
        .join(',');

      const dynamicUrl =
        `https://loremflickr.com/1600/900/${encodeURIComponent(cleanLocation)},city,landscape/all?lock=${trip.userselection.location.length}`;

      setPhotoUrl(dynamicUrl);
    }
  }, [trip]);
  
  return (

    <div
      className="w-full min-h-[70vh] flex items-center justify-center px-6 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${photoUrl})` }}
    >

      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}

      <div className="relative flex flex-col items-center text-center gap-8 max-w-4xl">

        <h1 className="text-white text-[56px] md:text-[64px] font-bold tracking-tight">
          {trip?.userselection?.location}
        </h1>

        <p className="text-white/80 text-lg max-w-2xl">
          Your AI generated travel itinerary with curated hotels,
          places to visit and optimized routes.
        </p>

        {/* Trip Details */}

        <div className="flex flex-wrap justify-center gap-4">

          <div className="px-6 py-2 bg-white/20 backdrop-blur-md rounded-full text-white">
            🗓️ {trip?.userselection?.days} Days
          </div>

          <div className="px-6 py-2 bg-white/20 backdrop-blur-md rounded-full text-white">
            💰 {trip?.userselection?.budget} Budget
          </div>

          <div className="px-6 py-2 bg-white/20 backdrop-blur-md rounded-full text-white">
            ✈️ {trip?.userselection?.traveler} Traveler
          </div>

        </div>

        <Button className="px-8 py-5 rounded-full bg-yellow-400 text-black font-semibold hover:scale-105 hover:bg-yellow-300 transition flex items-center gap-2">
          <IoIosSend />
          Share Trip
        </Button>

      </div>

    </div>

  )
}

export default Infosection