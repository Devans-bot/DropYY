import React, { useEffect, useState } from 'react'
import testimage from "../assets/Gemini_Generated_Image_e8qxqbe8qxqbe8qx.png"
import { UseAuthStore } from '../Store/authStore'
import Logout from '../Components/logout'
import Navbar from '../Components/navbar'
import defaultImage from "../assets/user.jpg"
import { MdOutlineCameraAlt } from "react-icons/md";
import { compressImage } from '../Components/compressimage'
import SingleGhostLoader from '../Components/GhostLoader'
import { LoaderIcon } from 'react-hot-toast'
import EmojiWallpaper from '../Components/emojiwallpaper'


const Profilepage = () => {

    const {authUser,logOut,uploadDP,uploading,uploadCoverphoto,checkAuth}=UseAuthStore()
    console.log(authUser.fullname)
    const [seletedImage,setselectedImage]=useState(null)

    useEffect(()=>{
      checkAuth()
    },[])

    const handleDpUpload=(e)=>{
      try {
        const file=e.target.files[0]

        uploadDP(file)
      } catch (error) {
        console.log(error)
      }
    }
    const handleChangeCover=(e)=>{
      try {
     const file=e.target.files[0]
     uploadCoverphoto(file)
      } catch (error) {
        console.log(error)
      }
    }
    if(!authUser)return(
        <p>Loading..</p>
    )
  return (
    <>
    <div className='w-full h-full relative '>
              <EmojiWallpaper/>

    <div className=" absolute inset-0 backdrop-blur-xs pointer-events-none" />


        <div className='w-9/10 h-8/10 rounded-3xl shadow-2xl 
        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        border-2 border-secondary/40 bg-primary/90 backdrop-blur-md
         overflow-hidden flex flex-col items-center justify-center
        '>
         
        <div className='w-full h-1/4 z-50 rounded-3xl relative'>

            <img   src={authUser?.coverphoto}
            className='w-full h-full object-cover '
            alt="" />

              <label
     className="absolute -bottom-2 right-0 p-1 rounded-full 
    flex items-center justify-center text-xs
    border-2 border-secondary/40 shadow-md bg-primary z-10 text-secondary/90" >
        {uploading ? ( <p>Uploading..</p> ) : ( <p>Change Cover</p> )}
         <input type="file"
      className='hidden'
      onChange={handleChangeCover} 
      accept='image/*'/>
    </label>

         <div className="absolute -bottom-10 left-5">
           <div className="relative w-20 h-20 bg-primary/40 rounded-full border-2 border-secondary/50 flex items-center justify-center">
    
    {/* Profile Image */}

    {
        uploading ? <LoaderIcon aria-setsize={20}/>: <img
      src={authUser?.profileDP}
      className="w-20 h-20 bg-primary rounded-full border-2 border-black object-cover"
      alt=""
    />
    }
    
    <label
    className="absolute bottom-0 right-0 p-1 rounded-full 
     flex items-center justify-center 
    border-2 border-secondary/40 shadow-md bg-primary z-10 text-secondary/90" >

      <MdOutlineCameraAlt size={20} />

      <input type="file"
      className='hidden'
      onChange={handleDpUpload} 
      accept='image/*'/>
    </label>
   

        </div>
     
    <div className="absolute -bottom-10 left-5">
        
    </div>


</div>

           
        </div>

        <div className='relative z-10 w-9/10 h-9/10 mt-5 mb-5 p-4 rounded-2xl border-2 border-secondary/20'>
           <div className='text-secondary w-full pb-1 pt-5 border-b-2 border-secondary/30'>
            <h3>{authUser.fullname}</h3>
           </div> 
           <div className='text-secondary w-full pb-1 pt-5 border-b-2 border-secondary/30'>
            <h3>{authUser.Email}</h3>
           </div>
            <div className='text-secondary w-full pb-1 pt-5 border-b-2 border-secondary/30'>
            <h3>Drops Created:{authUser.totaldrops}</h3>
           </div>

            <div 
            onClick={()=>logOut()}
            className='absolute bottom-0 text-secondary w-full h-2/10 left-1 flex gap-2 items-center justify-center  p-3'>
            <div className='w-2/4 bg-red-400 rounded-3xl h-full flex gap-2 items-center justify-center '>
                <h3>LogOut</h3>
                <Logout/>
            </div>
            
           </div>
        </div>

        </div>
    </div>
    <Navbar/>
    </>
   
  )
}

export default Profilepage
