import React, { useEffect, useState } from 'react'
import { Button } from '../button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios from 'axios';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [opendailog,setopendailog]=useState(false)

  useEffect(() => {
    console.log(user)
  }, [])

  const login = useGoogleLogin({
  onSuccess: (tokenResponse) => {
    console.log(tokenResponse);
    Getuserprofile(tokenResponse);
  },
  onError: (error) => console.log(error)
});

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
      window.location.reload();
    })
  }

  return (
  <div className='sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b shadow-sm flex justify-between items-center px-6 py-3'>

    {/* Logo */}
    <div className='flex items-center gap-2'>
      <img src='/logo.svg' className='h-10 cursor-pointer'/>
      <h2 className='font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
        AI Trip Planner
      </h2>
    </div>

    <div>
      {user ?
        <div className='flex items-center gap-4'>

          <a href='/create-trip'>
            <Button
              variant="outline"
              className="rounded-full px-5 hover:bg-blue-50 hover:shadow-md transition-all"
            >
              ✈️ Create Trip
            </Button>
          </a>

          <a href='/my-trips'>
            <Button
              variant="outline"
              className="rounded-full px-5 hover:bg-purple-50 hover:shadow-md transition-all"
            >
              🌍 My Trips
            </Button>
          </a>

          <Popover>
            <PopoverTrigger asChild>

              {/* User Profile Image */}
              <img
                src={user?.picture}
                className='h-[40px] w-[40px] rounded-full cursor-pointer border-2 border-white shadow-md hover:scale-110 transition-all'
                alt="user profile"
              />

            </PopoverTrigger>

            <PopoverContent className="w-64 rounded-2xl shadow-xl">

              <div className='text-center'>

                <img
                  src={user?.picture}
                  className='h-16 w-16 rounded-full mx-auto mb-2'
                />

                <h2 className="font-bold text-lg">
                  {user?.name || 'User Profile'}
                </h2>

                <p className="text-sm text-gray-500">
                  {user?.email}
                </p>

                <hr className="my-3" />

                <h2
                  onClick={()=>{
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                  className='cursor-pointer text-sm font-medium text-red-500 hover:text-red-600 transition-all'
                >
                  Logout
                </h2>

              </div>

            </PopoverContent>
          </Popover>

        </div>
        :
        <Button
          onClick={()=>setopendailog(true)}
          className="rounded-full px-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 transition-all shadow-md"
        >
          Sign In
        </Button>
      }
    </div>

    {/* Login Dialog */}
    <Dialog open={opendailog}>
      <DialogContent className="rounded-2xl shadow-2xl">

        <DialogHeader>

          <DialogTitle className="text-lg font-bold text-center">
            Sign In Required
          </DialogTitle>

          <DialogDescription>

            <img src="/logo.svg" className="mx-auto w-16"/>

            <h2 className='font-bold text-lg mt-7 text-center'>
              Sign In With Google
            </h2>

            <p className="text-center text-gray-500">
              Sign in securely to generate and save your travel plans
            </p>

            <Button
              onClick={login}
              className="w-full mt-5 bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 transition-all shadow-md"
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

export default Header