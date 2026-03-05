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
  <div
    className="w-full min-h-screen flex justify-center px-5 sm:px-10 md:px-24 lg:px-40 xl:px-56 py-16 bg-cover bg-center relative"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e')"
    }}
  >

    <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/25 to-black/10"></div>

    <div className="relative w-full max-w-7xl">

      <h2 className="text-4xl font-extrabold text-white">
        My Trips
      </h2>

      <p className="text-gray-200 mt-2">
        View and manage all your AI generated travel plans
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12">

  {usertrips?.length > 0
    ? usertrips.map((trip, index) => (
        <div
          key={index}
          className="rounded-2xl p-4 bg-white/15 backdrop-blur-sm border border-white/20
          shadow-lg hover:scale-105 hover:bg-white/20 transition-all duration-300"
        >
          <Usertripcarditem trip={trip} />
        </div>
      ))
    : [1,2,3,4,5,6].map((item, index) => (
        <div
          key={index}
          className="h-[250px] w-full rounded-2xl bg-white/15 backdrop-blur-sm
          border border-white/20 animate-pulse"
        ></div>
      ))
  }

</div>
    </div>

  </div>
)
}

export default index