import React, { useEffect, useState } from 'react'
import { MdWbSunny } from "react-icons/md";
import { IoIosMoon } from "react-icons/io";
import { Usethemestore } from '../Store/themestore';



const SunDarkLightToggle = () => {

    const[isDark,setisDark]=useState(false)

    const {theme,setTheme}=Usethemestore()


const toggleTheme = () => {
  const current =theme

  if (current === "dark") {
    document.documentElement.removeAttribute("data-theme"); // back to light
    localStorage.setItem("theme", "light")
    setTheme("light")
    setisDark(false)
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark")
    setTheme("dark")
    setisDark(true)
  }
};

  return (
        <  button className='absolute top-2 right-2' onClick={toggleTheme}>
        {
            isDark ?  <IoIosMoon className='size-6 text-white'/>:<MdWbSunny className='size-6 text-black'/>
        }
         </button>        
      
  )
}

export default SunDarkLightToggle
