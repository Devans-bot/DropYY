import React, { useEffect, useRef, useState } from 'react'
import { UseAuthStore } from '../Store/authStore'
import { FaPlus } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import useOutsideClick from './outsideclick';


const SearchedFriends = () => {

    const {searchedFriends,addFriend,allFriends,friendsArray}=UseAuthStore()
    const [searchedUsers,setSearchedUsers]=useState([])
    const [name,setname]=useState('')
    const [open,setopen]=useState(false)
    const boxref=useRef()
   const isFriend = (id) =>
  friendsArray?.some(
    friend => friend._id?.toString() === id?.toString()
  )

  useOutsideClick(boxref,()=>setopen(false))

useEffect(() => {
  allFriends()
  console.log(friendsArray)
}, [])

useEffect(() => {
  console.log("friendsArray:", friendsArray)
}, [friendsArray])

    const handleChange=async(e)=>{
      e.preventDefault()
      setopen(true)
      const res = await searchedFriends(name)
      setSearchedUsers(res)

    }

    const handleclick=async(id)=>{
      try {
       await addFriend(id)

      } catch (error) {
        console.log(error)
      }
    }
  return (
    <>
    <div className='text-secondary/90 relative z-50 mt-5 mb-5 w-9/10 rounded-3xl  md:w7/10 
     flex flex-col items-center'>

        <form
        onSubmit={handleChange}
        className=' bg-secondary/10 text-secondary top-3  w-full
      rounded-4xl h-14 flex items-center justify-start  border-2 border-secondary/10 '>
       <input
       value={name}
       onChange={(e)=>setname(e.target.value)}
       className='w-full h-full flex 
       items-center justify-start pl-10 
       rounded-4xl text-secondary
        placeholder:text-secondary
       placeholder:opacity-100 focus:outline-none'
       placeholder='Add friends☺️ By Search🔍..'
       />   
    </form>

       {
        searchedUsers?.length>0 && open &&
        (
          <div 
        ref={boxref}
          className='absolute top-10/10 z-30 bg-primary w-full
          flex flex-col items-center
             border-2 rounded-4xl border-secondary/10'>
             {searchedUsers?.map((user)=>(
              
              <div
              key={user._id}
              className='w-11/12 h-16 my-1 px-2 rounded-2xl  flex items-center justify-between'>
              {console.log("Checking:", user._id)}
              <div className='w-5/10 flex items-center justify-start gap-4'>
              <img
              src={user.ProfilePicture}
              className='w-12 h-12 rounded-full border-2 border-blue-300 object-center'
              />
              <h3>{user.name}</h3>
              </div>
             
              
              {isFriend(user._id) ? (
                 <div
              onClick={()=>handleclick(user._id)}
               className={`w-6 h-6 rounded-full text-primary  flex items-center justify-center bg-red-400`}>
                <ImCross size={10}/>
              </div>)
               : (
                 <div
              onClick={()=>handleclick(user._id)}
               className={`w-6 h-6 rounded-full text-primary  flex items-center justify-center bg-green-400`}>
                <FaPlus size={12}/>
              </div>
              )
              }
             
             
            
             
              </div>
             ))}
          </div>
        )
       }
    </div>
  
     
    </>

    
  )
}

export default SearchedFriends
