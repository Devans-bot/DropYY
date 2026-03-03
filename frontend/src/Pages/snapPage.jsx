import React, { useEffect, useState } from 'react'
import Navbar from '../Components/navbar'
import { UseAuthStore } from '../Store/authStore'
import defaultImage from "../assets/7022927.png"

import { LoaderIcon } from 'react-hot-toast'
import DropYY from '../Components/logonav'
import ViewDrop from '../Components/ViewDrop'
import SearchedFriends from '../Components/friendslist'

const Snappage = () => {

  const {loading,setloading,authUser,myDrops,getMyDrops}=UseAuthStore()

  const [activeDrops,setActiveDrops]=useState(null)

  useEffect(()=>{
    getMyDrops()
  },[myDrops])


   return (
    <> 
    <DropYY/>
   
    
     <div className='w-full bg-primary 
     md:w-9/12 md:border-2 border-secondary/30 md:rounded-4xl
     h-full md:h-8/10 py-14 z-10 px-3 flex flex-col items-center justify-start'>
      <SearchedFriends/>
       <div className='w-full h-full '>
        
           
        {loading &&  <div className='md:hidden text-secondary absolute top-12 md:top-1 left-1/2 -translate-x-1/2 flex items-center justify-center gap-3'>
          <h3>Sending Drops</h3>
          <LoaderIcon/>
        
        </div>}
       
         {myDrops?.map((Drop)=>(

            <div className='text-secondary w-full h-20
            rounded-4xl mb-2 flex border-2 border-secondary/20 bg-secondary/10 shadow-md
             items-center  justify-between px-2  
             font-bold text-lg' key={Drop.sender._id}>

                <div onClick={()=>setActiveDrops(Drop.drops)} className='relative w-10/10 h-full flex items-center gap-2 '>
                 <img src={Drop.sender.ProfilePicture || defaultImage }
                className='w-16 h-16 rounded-full object-cover border-2 border-secondary/40' alt="" />
                <h3>{Drop.sender.name}</h3>
                {(Drop.count<=0) ? <p className='text-xs absolute right-2 p-2 bg-secondary/10 rounded-4xl'>No drop😖</p> : <p className='text-sm absolute right-2 p-3 bg-green-400/60 rounded-4xl'>{Drop.count}</p> }
                </div>

                
             
            </div>
             
         ))}
         
       </div>
       
             {
              activeDrops && <ViewDrop drops={activeDrops} onclose={()=>setActiveDrops(null)}/>
             } 
    </div>
    <Navbar/>
    </>
  
  )
}

export default Snappage
