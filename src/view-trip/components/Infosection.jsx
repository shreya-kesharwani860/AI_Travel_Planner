import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io"

function Infosection({ trip }) {
    // Start with a generic travel placeholder
    const [photoUrl, setPhotoUrl] = useState('https://loremflickr.com/800/600/landscape');

    useEffect(() => {
        if (trip?.userselection?.location) {
            // Clean up the location name (take first two words for better search matching)
            const cleanLocation = trip.userselection.location.split(',')[0].split(' ').slice(0, 2).join(',');
            
            // Build the LoremFlickr URL
            // keywords: location + 'city' + 'landscape'
            // lock: unique string based on the location name to keep it consistent
            const dynamicUrl = `https://loremflickr.com/800/600/${encodeURIComponent(cleanLocation)},city,landscape/all?lock=${trip.userselection.location.length}`;
            
            setPhotoUrl(dynamicUrl);
        }
    }, [trip]);

    return (
    <div className='mt-10'>

        <img 
            src={photoUrl} 
            key={photoUrl}
            referrerPolicy="no-referrer"
            className='h-[320px] w-full object-cover rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]'
            alt="Trip Destination"
            onError={(e) => {
                e.target.src = 'https://loremflickr.com/800/600/travel,city';
            }}
        />

        <div className='flex justify-between items-center mt-6 flex-wrap gap-6'>

            <div className='flex flex-col gap-3'>

                <h2 className='font-bold text-3xl text-white tracking-wide'>
                    {trip?.userselection?.location}
                </h2>

                <div className='flex gap-4 flex-wrap'>

                    <h2 className='px-4 py-1.5 bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white text-xs md:text-sm shadow-sm'> 
                        🗓️ {trip?.userselection?.days} Day
                    </h2>

                    <h2 className='px-4 py-1.5 bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white text-xs md:text-sm shadow-sm'> 
                        💵 {trip?.userselection?.budget} Budget
                    </h2>

                    <h2 className='px-4 py-1.5 bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white text-xs md:text-sm shadow-sm'> 
                        ✈️ {trip?.userselection?.traveler} Traveler
                    </h2>

                </div>

            </div>

            <Button className="rounded-full px-5 py-3 bg-gradient-to-r from-orange-500 to-pink-500 hover:scale-105 transition-all shadow-lg">
                <IoIosSend className="text-lg"/>
            </Button>

        </div>

    </div>
)
}

export default Infosection