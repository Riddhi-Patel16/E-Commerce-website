import React from 'react'
import './Navbar.css'
import nav_logo from '../../Assets/nav-logo.svg'
import navprofile from '../../Assets/nav-profile.svg'
const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={nav_logo} alt="" className="nav-logo" />
        <img src={navprofile} alt="" className="nav-profile" />
    </div>
  )
}

export default Navbar