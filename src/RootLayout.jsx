import React, { useState } from 'react'
import Nav from './components/Nav'
import { Outlet } from 'react-router-dom'
const RootLayout = () => {

  return (
    <div className="flex flex-col w-full h-full">
        <Nav />
        <div className='flex w-full h-full'>

            <Outlet/>
        </div>
        
    </div>
  )
}

export default RootLayout