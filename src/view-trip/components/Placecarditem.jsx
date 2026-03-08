import React from 'react'
import { Link } from 'react-router-dom'

function Placecarditem({ place, index }) {

  const placeName = place?.placeName || "tourist place"

  return (
    <Link
      to={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(placeName)}
      target='_blank'
    >
      <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>

        <img
          src={`https://loremflickr.com/400/300/${encodeURIComponent(placeName)},landmark,travel?lock=${index + Date.now()}`}
          className='w-[130px] h-[130px] rounded-xl object-cover'
          alt={placeName}
          onError={(e) => {
            e.target.src = `https://loremflickr.com/400/300/tourist,landmark?lock=${Math.random()*1000}`
          }}
        />

        <div className='flex items-center'>
          <h2 className='font-bold text-lg text-black'>{placeName}</h2>
        </div>

      </div>
    </Link>
  )
}

export default Placecarditem