import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <div className='w-full h-14 bg-slate-800 text-white flex items-center justify-evenly text-2xl'>
      <NavLink to={"/"}>
        Home
      </NavLink>
      <NavLink to={"/Notes"}>
        Todo Lists
      </NavLink>
    </div>
  )
}

export default Navbar
