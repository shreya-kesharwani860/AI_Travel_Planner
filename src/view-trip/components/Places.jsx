import React from 'react'
import Placecarditem from './Placecarditem'

function Places({trip}) {
  return (
  <div className="mt-10">

    <h2 className="text-2xl font-bold text-gray-800 mb-8">
      Places to Visit
    </h2>

    <div className="flex flex-col gap-12">

      {trip.tripData?.itinerary.map((item,index)=>(
        <div key={index} className="relative">

          <div className="inline-block mb-5">
            <span className="bg-gray-800 text-white text-sm font-semibold px-4 py-1 rounded-full shadow">
              Day {item.day}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {item.plan.map((place,index)=>(
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >

                <p className="text-sm text-gray-500 font-medium mb-2">
                  {place.bestTimeToVisit}
                </p>

                <Placecarditem place={place} />

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