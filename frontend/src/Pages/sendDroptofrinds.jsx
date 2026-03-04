import React, { useState } from 'react'
import { FaCircleCheck } from "react-icons/fa6";
import defaultImage from "../assets/7022927.png"
import { UseAuthStore } from '../Store/authStore'
import { IoSend } from "react-icons/io5";
import { IoSendOutline } from "react-icons/io5";
import DropYY from '../Components/logonav';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SendDrops = () => {


    const [selectedIds,setselectedIds]=useState([])
    const {authUser,sendDropToFriends,photo,video,sendDrop,loading,setloading}=UseAuthStore()
    const navigate=useNavigate()

    const toggleSelect = (id) => {
     setselectedIds((prev) =>
    prev.includes(id)
      ? prev.filter((item) => item !== id) // remove if already selected
      : [...prev, id] // add if not selected
     );
      };

    const handleSubmit=async()=>{
        
       setloading(true)

let dropid=null
if(photo){
  dropid= await sendDrop(photo)
}else{
  dropid= await sendDrop(video)
}

await sendDropToFriends(selectedIds,dropid)

navigate("/Snaps")
setloading(false)
        
    }

    
  return (
    <> 
    <DropYY/>
    
     <div className='w-full 
     md:w-7/10 md:border-2 border-secondary/30 md:rounded-4xl
     
     h-full bg-primary relative py-20 md:py-10 px-3 iflex items-center justify-center'>
       <div className='w-full h-full'>
         {authUser.friends?.map((friend)=>(
            
            <div className='text-secondary w-full h-20
            rounded-4xl mb-2 flex border-2 border-secondary/20 bg-secondary/10 shadow-md
             items-center  justify-between px-5  
             font-bold text-lg' key={friend._id}>


                <div className='w-8/10 h-full flex items-center gap-2 '>
                 <img src={friend.ProfilePicture || defaultImage }
                className='w-16 h-16 rounded-full object-cover border-2 border-secondary/40' alt="" />
                <h3>{friend.name}</h3>
                </div>
              


            <div 
               onClick={() => toggleSelect(friend._id)}
            className='text-xs w-8  rounded-full  h-8 border-2 border-secondary/20'>
              {
                selectedIds.includes(friend._id) &&
                <FaCircleCheck className='w-full rounded-full h-full text-green-400' />
                
              }
            </div>
            </div>

        
        
            
         ))}
       </div>

       {
        (selectedIds.length>0) &&
        <div 
        onClick={handleSubmit}
        className='absolute text-secondary/90 right-10 bottom-10'>
           <IoSend  size={40}/>
       </div>
       }
       
             

    </div>

    </>
  
  )
}

export default SendDrops
