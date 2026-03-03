import React from 'react'
import { MdOutlineSendToMobile } from "react-icons/md";
import { UseAuthStore } from '../Store/authStore';
import { useNavigate } from 'react-router-dom';



const Logout = () => {

    const {logOut}=UseAuthStore()
    const navigate=useNavigate()

    const handleClick=()=>{
        try {
            logOut()
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }

  return (
     <button onClick={handleClick}>
        <MdOutlineSendToMobile size={20}/>
     </button>
  )
}

export default Logout
