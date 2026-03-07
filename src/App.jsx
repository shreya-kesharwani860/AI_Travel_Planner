import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from './components/ui/button'
import './App.css'
import Hero from './components/ui/custom/Hero'
import Infosection from './components/ui/custom/Infosection'


export default function App() {
  return (
    <>
    {/* Hero */}
    <Hero/>
    <Infosection/>
    </>

  )
}