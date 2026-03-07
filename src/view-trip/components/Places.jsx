import React from 'react'
import Placecarditem from './Placecarditem'

function Places({trip}) {
  return (
    <div>
      {/* Section Header */}
      <div className="mb-14 text-center">
        <h2 className="text-4xl font-bold text-gray-900">
          Places to Visit
        </h2>
        <p className="text-gray-600 mt-3 text-lg">
          Explore the best spots planned for your trip
        </p>
      </div>

      <div className="flex flex-col gap-12">
        {trip.tripData?.itinerary.map((item, index) => (
          <div key={index}>
            {/* Day Divider */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] bg-gray-300 flex-1"></div>
              <span className="bg-gray-900 text-white text-sm font-semibold px-5 py-1.5 rounded-full shadow">
                Day {item.day}
              </span>
              <div className="h-[1px] bg-gray-300 flex-1"></div>
            </div>

            {/* Places List (Horizontal Structure) */}
            <div className="flex flex-col gap-6">
              {item.plan.map((place, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col md:flex-row"
                >
                  {/* Image Container (Left Side) */}
                  <div className="md:w-[300px] relative overflow-hidden">
                    <Placecarditem place={place} />
                  </div>

                  {/* Place Info (Right Side) */}
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div className="flex flex-col gap-3">
                      {/* Place Details Text */}
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {place.placeDetails}
                      </p>

                      {/* Travel Info Badges */}
                      <div className="flex flex-wrap gap-3 text-sm mt-2">
                        <span className="bg-gray-100 px-3 py-1 rounded-full">
                          ⏰ {place.best_time_to_visit || place.bestTimeToVisit}
                        </span>
                        <span className="bg-gray-100 px-3 py-1 rounded-full">
                          🕒 {place.timeTravel}
                        </span>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                          🎟 {place.ticketPricing}
                        </span>
                      </div>
                    </div>

                    {/* Map Button */}
                    <button
                      onClick={() =>
                        openMap(
                          place["Geo Coordinates"]?.latitude,
                          place["Geo Coordinates"]?.longitude
                        )
                      }
                      className="mt-5 w-fit bg-gray-900 text-white text-sm px-6 py-2 rounded-lg hover:bg-black transition"
                    >
                      View on Map
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Places