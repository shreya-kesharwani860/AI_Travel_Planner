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
    <div className="min-h-screen bg-[#f9fafb] py-12 px-5 sm:px-10 md:px-32 lg:px-56">
      
      {/* Header Section */}
      <div className="max-w-4xl mx-auto">
        <h2 className="font-bold text-[34px] text-slate-900">
          Plan your next adventure ✈️
        </h2>
        <p className="mt-3 text-slate-500 text-lg">
          Fill in your preferences and let our AI craft a tailored itinerary just for you.
        </p>

        <div className="mt-12 flex flex-col gap-10">
          
          {/* Destination Search */}
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-medium text-slate-800">Where do you want to go?</h2>
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => searchPlace(e.target.value)}
                placeholder="Search destinations (e.g., Tokyo, Paris)..."
                className="w-full p-3.5 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
              {results.length > 0 && (
                <div className="absolute z-10 w-full rounded-lg mt-1 bg-white border border-slate-200 shadow-xl max-h-60 overflow-y-auto">
                  {results.map((place) => (
                    <div
                      key={place.id}
                      onClick={() => handleSelect(place)}
                      className="p-3 cursor-pointer hover:bg-slate-50 text-slate-700 transition-all border-b last:border-0 border-slate-100"
                    >
                      {place.place_name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Days Input */}
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-medium text-slate-800">For how many days?</h2>
            <Input
              placeholder="Ex. 5"
              type="number"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="p-6 border-slate-200 focus:ring-indigo-500"
            />
          </div>

          {/* Budget Selection */}
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-medium text-slate-800">What is your budget?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-2">
              {SelectBudgetOptions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setBudget(item.title)}
                  className={`p-5 cursor-pointer rounded-xl border transition-all
                  ${budget === item.title 
                    ? 'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600' 
                    : 'border-slate-200 bg-white hover:border-indigo-300'}`}
                >
                  <span className="text-3xl">{item.icon}</span>
                  <h2 className="font-bold text-slate-900 mt-2">{item.title}</h2>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Traveler Selection */}
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-medium text-slate-800">Who are you traveling with?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-2">
              {SelectTravelesList.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setTraveler(item.title)}
                  className={`p-5 cursor-pointer rounded-xl border transition-all
                  ${traveler === item.title 
                    ? 'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600' 
                    : 'border-slate-200 bg-white hover:border-indigo-300'}`}
                >
                  <span className="text-3xl">{item.icon}</span>
                  <h2 className="font-bold text-slate-900 mt-2">{item.title}</h2>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <div className="mt-10 flex justify-end">
            <Button
              disabled={loading}
              className="px-10 py-6 text-md font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-all disabled:bg-slate-400"
              onClick={handleGenerateTrip}
            >
              {loading ? <AiOutlineLoading3Quarters className="h-5 w-5 animate-spin" /> : 'Create Itinerary'}
            </Button>
          </div>
        </div>
      </div>

      {/* Auth Dialog */}
      <Dialog open={opendailog} onOpenChange={setopendailog}>
        <DialogContent className="sm:max-w-md bg-white border-0 shadow-2xl rounded-2xl">
          <DialogHeader className="flex flex-col items-center">
            <DialogTitle className="text-xl font-bold">Sign In</DialogTitle>
            <DialogDescription className="text-center pt-2">
              <img src="/logo.svg" className="w-12 mx-auto mb-4" alt="Logo"/>
              <span className="block font-medium text-slate-900 text-lg">Continue with Google</span>
              <span className="text-slate-500">To save and view your trip itineraries.</span>
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={login}
            className="w-full mt-4 flex gap-3 items-center justify-center bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 py-6"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/smartlock/google.svg" className="w-5 h-5"/>
            Sign in with Google
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateTrip

