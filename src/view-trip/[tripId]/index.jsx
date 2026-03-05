import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Infosection from '../components/Infosection';
import Hotels from '../components/Hotels';
import Places from '../components/Places';
import Footer from '../components/Footer';

function ViewTrip() {
    const {tripId}=useParams();
    const [trip,setTrip]=useState([]);
    useEffect(()=>{
        tripId&&GetTripData();
    },[tripId])

    const GetTripData=async()=>{
        const docRef=doc(db,'AITrips',tripId);
        const docSnap=await getDoc(docRef);

        if(docSnap.exists()){
            console.log("Document",docSnap.data());
            setTrip(docSnap.data());
        }
        else{
            console.log("no trip");
        }
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

    <div className="relative w-full max-w-7xl bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl shadow-xl p-10">

      <div className="space-y-16">

        <Infosection trip={trip}/>
        <Hotels trip={trip}/>
        <Places trip={trip}/>
        <Footer trip={trip}/>

      </div>

    </div>

  </div>
)
}

export default ViewTrip