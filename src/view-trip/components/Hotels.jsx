import React from 'react'
import { Link } from 'react-router-dom'

const openMap = (name, address) => {
    const query = encodeURIComponent(`${name} ${address}`)
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${query}`,
      "_blank"
    )
  }

function Hotels({ trip }) {
 return (

  <div>

    {/* Section Header */}

    <div className='mb-14 text-center'>

      <h2 className='text-4xl font-bold text-gray-900'>
        Hotel Recommendations
      </h2>

      <p className='text-gray-600 mt-3 text-lg'>
        Best stays near your destination
      </p>

    </div>

    {/* Hotels List */}

    <div className='flex flex-col gap-8'>

      {(trip.tripData?.hotels || trip.tripData?.hotelOptions)?.map((hotel, index) => (

        <div
          key={index}
          className='group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row'
        >

          {/* Image Container */}

          <div className='relative md:w-[300px] overflow-hidden'>

            <img
              src={
                hotel?.HotelImageUrl ||
                hotel?.["hotel image url"] ||
                (hotel?.HotelImageUrl && !hotel?.HotelImageUrl.includes("example.com")
                  ? hotel.HotelImageUrl
                  : `https://loremflickr.com/600/400/${encodeURIComponent(
                      hotel?.HotelName || hotel?.hotelName || "luxury hotel"
                    )},hotel,resort?lock=${index}`)
              }
              className="h-[220px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              alt={hotel?.HotelName || hotel?.hotelName || "Hotel"}
              onError={(e) => {
                e.target.src = `https://loremflickr.com/600/400/hotel,resort?lock=${Math.random()*1000}`
              }}
            />

            {/* Rating Badge */}

            <div className='absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold shadow'>
              ⭐ {hotel?.rating || hotel?.Rating}
            </div>

          </div>

          {/* Hotel Info */}

          <div className='p-6 flex flex-col justify-between flex-1'>

            <div className='flex flex-col gap-3'>

              {/* Name */}

              <h3 className='text-xl font-semibold text-gray-900'>
                {hotel?.hotelName || hotel?.HotelName}
              </h3>

              {/* Description */}

              <p className='text-sm text-gray-600 line-clamp-3'>
                {hotel?.description || hotel?.Description || hotel?.descriptions}
              </p>

              {/* Address */}

              <p className='text-sm text-gray-500'>
                📍 {hotel?.hotelAddress || hotel?.HotelAddress || hotel?.["Hotel address"]}
              </p>

              {/* Price Badge */}

              <div className='mt-2'>

                <span className='bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-medium'>
                  💰 {hotel?.price || hotel?.Price}
                </span>

              </div>

            </div>

            {/* Map Button */}

            <button
                onClick={(e) => {
                  e.stopPropagation()
                  openMap(
                    hotel?.HotelName || hotel?.hotelName,
                    hotel?.HotelAddress || hotel?.hotelAddress || hotel?.["Hotel address"]
                  )
                }}
                className='mt-5 w-fit bg-gray-900 text-white text-sm px-5 py-2 rounded-lg hover:bg-black transition'
              >
              View on Map
            </button>

          </div>

        </div>

      ))}

    </div>

  </div>

  )
}
export default Hotels