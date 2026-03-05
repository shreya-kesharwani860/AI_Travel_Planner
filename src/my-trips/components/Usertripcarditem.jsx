import React from 'react'
import { Link } from 'react-router-dom'

function Usertripcarditem({trip}) {

  const imageUrl = `https://picsum.photos/600/400?random=${Math.random()}`
  return (
    <Link to={'/view-trip/'+ trip?.id}>
    <div className='hover:scale-105 transition-all'>
      <img 
        src={imageUrl}
        className="object-cover rounded-xl w-full h-[250px]"
      />

      <div>
        <h2 className='font-bold text-lg'>
          {trip?.userselection?.location}
        </h2>

        <h2 className='text-sm text-gray-800'>
          {trip?.userselection?.days} Days trip with {trip?.userselection?.budget} budget
        </h2>
      </div>
    </div>
    </Link>
  )
}

export default Usertripcarditem