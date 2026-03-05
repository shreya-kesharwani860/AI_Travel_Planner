import React from 'react'
import { Link } from 'react-router-dom'

function Hotels({ trip }) {
  return (
  <div className='mt-12'>

    <div className='mb-8 flex items-center gap-4'>

      <div className='w-1 h-10 bg-gradient-to-b from-orange-400 to-pink-500 rounded-full'></div>

      <div>
        <h2 className='text-2xl font-semibold text-white tracking-wide'>
          Hotel Recommendations
        </h2>

        <p className='text-sm text-gray-200'>
          Best stays near your destination
        </p>
      </div>

    </div>

    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>

      {trip.tripData?.hotels?.map((hotel, index) => (
        <Link
          key={index}
          to={'https://www.google.com/maps/search/?api=1&query=' + hotel.HotelName + "," + hotel?.HotelAddress}
          target='_blank'
        >

          <div className='bg-white/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer'>

            <img
              src={`https://loremflickr.com/400/300/${encodeURIComponent((hotel?.HotelName || 'hotel').split(' ').slice(0, 2).join(','))},hotel/all?lock=${index}`}
              className='h-[180px] w-full object-cover'
              alt={hotel?.HotelName || "hotel"}
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945' }}
            />

            <div className='p-4 flex flex-col gap-1'>

              <h2 className='font-semibold text-gray-900 text-lg'>
                {hotel?.HotelName}
              </h2>

              <h2 className='text-sm text-gray-600'>
                📍 {hotel?.HotelAddress}
              </h2>

              <div className='flex justify-between mt-2 text-sm'>

                <span className='text-green-600 font-medium'>
                  💰 {hotel?.Price}
                </span>

                <span className='text-yellow-500 font-medium'>
                  ⭐ {hotel?.Rating}
                </span>

              </div>

            </div>

          </div>

        </Link>
      ))}

    </div>

  </div>
)
}
export default Hotels