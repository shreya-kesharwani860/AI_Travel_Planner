import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SelectBudgetOptions, SelectTravelesList } from '@/constants/options'
import React, { useState } from 'react'
import { AI_PROMPT } from '@/constants/options'
import { chatSession } from '@/service/AIModal'
import { doc, setDoc } from "firebase/firestore"; 
import {AiOutlineLoading3Quarters} from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { db } from '@/service/firebaseConfig'
import { useNavigate } from 'react-router-dom'

function CreateTrip() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [opendailog,setopendailog]=useState(false)
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [days, setDays] = useState('')
  const [budget, setBudget] = useState(null)
  const [traveler, setTraveler] = useState(null)
  const [loading,setloading]=useState(false);
  const navigate=useNavigate();

  const searchPlace = async (value) => {
    setQuery(value)

    if (!value) {
      setResults([])
      return
    }

    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?types=place&access_token=${import.meta.env.VITE_MAPBOX_TOKEN}`
      )

      const data = await res.json()
      setResults(data.features || [])
    } catch (error) {
      console.error(error)
      setResults([])
    }
  }

  const handleSelect = (place) => {
    setQuery(place.place_name)
    setSelectedPlace(place)
    setResults([])
  }

  const login = useGoogleLogin({
  onSuccess: (tokenResponse) => {
    console.log(tokenResponse);
    Getuserprofile(tokenResponse);
  },
  onError: (error) => console.log(error)
});

const handleGenerateTrip = async () => {
  const user = localStorage.getItem('user');

  if (!user) {
    setopendailog(true);
    return;
  }

  generateTrip();   // separate function
};

const generateTrip = async () => {
  if (!selectedPlace || !days || !budget || !traveler) {
    alert("Please fill all fields");
    return;
  }

  setloading(true);
  try {
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', selectedPlace?.place_name)
      .replace('{totalDays}', days)
      .replace('{traveler}', traveler)
      .replace('{budget}', budget);

    const result = await chatSession(FINAL_PROMPT);
    saveaitrip(result); 
  } catch (error) {
    console.error("Trip Generation Failed:", error);
  } finally {
    setloading(false); // This ensures the spinner stops regardless of success or failure
  }
};

  const saveaitrip = async (TripData) => {
  try {
    setloading(true);

    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();

    const formData = {
      location: selectedPlace?.place_name,
      days,
      budget,
      traveler
    };

    await setDoc(doc(db, "AITrips", docId), {
      userselection: formData,
      tripData: JSON.parse(TripData),
      useremail: user?.email,
      id: docId
    });

    console.log("Trip saved successfully!");

    setloading(false);
    navigate('/view-trip/' + docId)
 

  } catch (error) {
    console.error("Firestore Save Error:", error);
    setloading(false);
    
  }
};

  const Getuserprofile=(tokeninfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokeninfo?.access_token}`,{
      headers:{
        Authorization:`Bearer ${tokeninfo?.access_token}`,
        Accept:'Application/json'
      }
    }).then((resp)=>{
      console.log(resp);
      localStorage.setItem('user',JSON.stringify(resp.data));
      setopendailog(false);
      generateTrip(); 
    })
  }

  return (
  <div
    className="w-full min-h-screen flex justify-center px-5 sm:px-10 md:px-24 lg:px-40 xl:px-56 py-16 bg-cover bg-center relative"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e')"
    }}
  >

    <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/20"></div>

    <div className="relative w-full max-w-5xl bg-white/10 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] rounded-3xl p-10 border border-white/20">

      <h2 className="font-extrabold text-4xl text-white">
        Tell us your travel preferences 🏕️
      </h2>

      <p className="mt-3 text-gray-200 text-lg max-w-2xl">
        Just provide some basic information, and our AI trip planner will generate a beautiful customized itinerary for your dream journey.
      </p>

      <div className="mt-16 flex flex-col gap-12">

        <div>
          <h2 className="text-xl my-3 font-semibold text-white">
            What is destination of choice?
          </h2>

          <input
            type="text"
            value={query}
            onChange={(e) => searchPlace(e.target.value)}
            placeholder="Search destination..."
            className="w-full p-4 rounded-xl bg-white/90 border border-white/30 shadow-sm focus:ring-2 focus:ring-orange-400 outline-none"
          />

          {results.length > 0 && (
            <div className="rounded-xl mt-3 bg-white shadow-lg max-h-60 overflow-y-auto">
              {results.map((place) => (
                <div
                  key={place.id}
                  onClick={() => handleSelect(place)}
                  className="p-3 cursor-pointer hover:bg-orange-50 transition-all"
                >
                  {place.place_name}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl my-3 font-semibold text-white">
            How many days are you planning your trip?
          </h2>

          <Input
            placeholder="Ex. 3"
            type="number"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="shadow-sm rounded-xl p-4 bg-white/90"
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-semibold text-white">
            What is your budget?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">

            {SelectBudgetOptions.map((item, index) => (

              <div
                key={index}
                onClick={() => setBudget(item.title)}
                className={`p-6 cursor-pointer rounded-2xl transition-all duration-300
                hover:scale-105 hover:shadow-xl bg-white/80 backdrop-blur-md
                ${budget === item.title ? 'border-2 border-orange-400 shadow-xl' : 'border border-white/30'}`}
              >

                <h2 className="text-4xl mb-2">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-600">{item.desc}</h2>

              </div>

            ))}

          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-semibold text-white">
            Who is your travel partner?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">

            {SelectTravelesList.map((item, index) => (

              <div
                key={index}
                onClick={() => setTraveler(item.title)}
                className={`p-6 cursor-pointer rounded-2xl transition-all duration-300
                hover:scale-105 hover:shadow-xl bg-white/80 backdrop-blur-md
                ${traveler === item.title ? 'border-2 border-orange-400 shadow-xl' : 'border border-white/30'}`}
              >

                <h2 className="text-4xl mb-2">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-600">{item.desc}</h2>

              </div>

            ))}

          </div>
        </div>

        <div className="my-10 justify-end flex">

          <Button
            disabled={loading}
            className="px-8 py-6 text-lg rounded-full shadow-xl bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 hover:scale-105 transition-all"
            onClick={handleGenerateTrip}
          >

            {loading
              ? <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin text-white" />
              : 'Generate Trip ✈️'
            }

          </Button>

        </div>

      </div>
    </div>

    <Dialog open={opendailog}>
      <DialogContent className="rounded-2xl shadow-2xl backdrop-blur-xl bg-white/90">

        <DialogHeader>

          <DialogTitle className="text-lg font-bold text-center">
            Sign In Required
          </DialogTitle>

          <DialogDescription>

            <img src="/logo.svg" className="mx-auto w-16"/>

            <h2 className="font-bold text-lg mt-7 text-center">
              Sign In With Google
            </h2>

            <p className="text-center text-gray-500">
              Sign in securely to generate and save your travel plans
            </p>

            <Button
              onClick={login}
              className="w-full mt-5 bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 hover:scale-105 transition-all"
            >
              Sign In With Google
            </Button>

          </DialogDescription>

        </DialogHeader>

      </DialogContent>
    </Dialog>

  </div>
)
}

export default CreateTrip

