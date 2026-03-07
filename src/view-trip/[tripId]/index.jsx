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

    <div className="w-full bg-[#f7f7f1]">

      <Infosection trip={trip}/>

      <div className="max-w-6xl mx-auto px-6 py-24 space-y-24">

        <Hotels trip={trip}/>
        <Places trip={trip}/>

      </div>

      <Footer trip={trip}/>

    </div>

  )
}

export default ViewTrip