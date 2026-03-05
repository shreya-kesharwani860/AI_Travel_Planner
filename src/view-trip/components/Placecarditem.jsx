import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'

function Placecarditem({ place }) {
    const photoSearchQuery = encodeURIComponent(place.placeName);
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(place.placeName)} target='_blank'>
      <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
        {/* Dynamic Unsplash Image for Places */}
        <img 
  // This will search for an image related to the placeName (e.g., "casino" or "fountain")
  src={`https://loremflickr.com/400/300/${encodeURIComponent(place.placeName.split(' ')[0])},travel/all`}
  className='w-[130px] h-[130px] rounded-xl object-cover'
  alt={place.placeName}
  onError={(e) => { e.target.src = "https://loremflickr.com/400/300/landscape"; }}
/>
        <div>
          <h2 className='font-bold text-lg text-black'>{place.placeName}</h2>
          <p className='text-sm text-gray-400'>{place.placeDetails}</p>
          <h2 className='mt-2 text-sm'>🕑 {place.TimeTravel}</h2>
        </div>
      </div>
    </Link>
  )
}

export default Placecarditem