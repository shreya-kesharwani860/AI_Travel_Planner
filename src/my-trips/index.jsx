import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom';
import Usertripcarditem from './components/Usertripcarditem';

function index() {
    const navigation=useNavigation();
    const[usertrips,setusertrips]=useState([]);
    useEffect(()=>{
        GetUsertrips();
    },[])
    const GetUsertrips=async()=>{
        const user=JSON.parse(localStorage.getItem('user'));
        
        if(!user){
            navigation('/');
            return;
        }
        setusertrips([]);
        const q=query(collection(db,'AITrips'),where('useremail','==',user?.email));
        const querySnapshot=await getDocs(q);
        querySnapshot.forEach((doc)=>{
            console.log(doc.id,"=>",doc.data());
            setusertrips(prevVal=>[...prevVal,doc.data()])
        });
    }
  return (
  <div className="min-h-screen bg-[#f7f7f5] py-20">

    <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-14">

      {/* Section Header */}

      <div className="text-center mb-16">

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
          My Trips
        </h2>

        <p className="text-gray-600 mt-3 text-lg">
          View and manage all your AI generated travel plans
        </p>

      </div>

      {/* Trips Grid */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

        {usertrips?.length > 0
          ? usertrips.map((trip, index) => (
              <div
                key={index}
                className="
                bg-white
                rounded-2xl
                p-5
                shadow-md
                hover:shadow-xl
                hover:-translate-y-1
                transition-all
                duration-300
                "
              >
                <Usertripcarditem trip={trip} />
              </div>
            ))
          : [1,2,3,4,5,6].map((item, index) => (
              <div
                key={index}
                className="
                h-[260px]
                w-full
                rounded-2xl
                bg-white
                shadow-md
                animate-pulse
                "
              ></div>
            ))}
      </div>

    </div>

  </div>
);
}

export default index