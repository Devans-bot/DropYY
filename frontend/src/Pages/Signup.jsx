import React from 'react'
import { UseAuthStore } from '../Store/authStore'
import { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

import RandomBackground from '../Components/randomimages'
import { MdContacts, MdEmail, MdKey, MdKeyboard, MdKeyOff, MdLock, MdPanoramaFishEye, MdPassword, MdPeople, MdPerson, MdRemoveRedEye } from 'react-icons/md'
import DropYY from '../Components/logonav';
import { Link } from 'react-router-dom';
import ScaleDownButton from '../Components/ontapAnimate';
import EmojiWallpaper from '../Components/emojiwallpaper';

const Login = () => {


    const {signUp}=UseAuthStore()
    const [formdata,setformdata]=useState({
        name:"",
        email:"",
        password:""
    })

    const [showpassword,setshowpassword]=useState(true)
    const [animate, setAnimate] = useState(false);

    



    const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(formdata)
    signUp(formdata)
    }
  return (
    <> 
   <div className='h-screen md:hidden relative w-screen flex flex-col items-center justify-end'>
    <DropYY/>
   <RandomBackground/>


       <form
       className='shadow-2xl shadow-black absolute flex flex-col gap-4 items-center justify-evenly  backdrop-blur-md bg-primary/30 rounded-4xl border-2 border-black/30 w-13/14 mb-4 h-5/10'      
       onSubmit={handleSubmit}>
        
                <h2 className='text-2xl p-2 w-36 text-secondary rounded-3xl flex items-center justify-center' >Sign Up</h2>

                <div className='w-9/10 h-8/12  flex flex-col gap-6'>


               <div className='w-full h-full relative'>
               <MdPerson className='absolute  top-1/2 -translate-y-1/2 text-secondary left-5 z-10 '/>
                <input 
                className=' placeholder:text-secondary relative w-full h-full px-12 text-lg border-2 focus:outline-none border-secondary rounded-3xl'
                placeholder='name'
                type="text" 
                value={formdata.name} 
                onChange={(e)=>setformdata({...formdata,name:e.target.value})} />
                </div>   


               <div className='w-full h-full relative'>
               <MdEmail className='absolute  top-1/2 -translate-y-1/2 text-secondary left-5 z-10 '/>
                <input 
                className=' placeholder:text-secondary relative w-full h-full px-12 text-lg border-2 focus:outline-none border-secondary rounded-3xl'
                placeholder='email@gmail.com'
                type="text" 
                value={formdata.email} 
                onChange={(e)=>setformdata({...formdata,email:e.target.value})} />
                </div>  

               <div className='w-full h-full relative'>
               <MdLock className='absolute text-secondary  top-1/2 -translate-y-1/2  left-5 z-10 '/>
                <input 
                className='placeholder:text-secondary relative w-full h-full px-12 text-lg border-2 focus:outline-none border-secondary rounded-3xl'
                placeholder='Password'
                type={showpassword?"password":"text"}
                value={formdata.password} 
                onChange={(e)=>setformdata({...formdata,password:e.target.value})} />

                <button type="button" 
                className='absolute right-5  top-1/2 -translate-y-1/2 ' 
                onClick={() => setshowpassword((prev) => !prev)}
                >
                    {showpassword?<FaEyeSlash /> : <FaEye />}
                </button>

                </div>

                  <ScaleDownButton className='w-3/10 p-3 bg-primary/90
                   border-2 font-bold border-black/50
                    text-secondary text-lg rounded-3xl'>
                   SUBMIT
                 </ScaleDownButton>
                </div>
                
                <div className='text-secondary flex  items-center justify-center gap-2  '>
                  <h3>Already have an account!</h3>
                 <ScaleDownButton to="/login" className='bg-primary/90 px-2 rounded-3xl 
                   border-2 font-bold border-black/50
                  '><h3>Log In</h3></ScaleDownButton>
                </div>

        </form>
    </div>



       <form
       className='shadow-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
     shadow-black hidden md:flex flex-col gap-4 items-center justify-evenly  backdrop-blur-md bg-primary/30 rounded-4xl border-2 border-secondary/10 md:w-3/4 lg:w-2/4 mb-4 h-7/10'      
       onSubmit={handleSubmit}>
        
                <h2 className='text-2xl p-2 w-36 text-secondary rounded-3xl flex items-center justify-center' >Sign Up</h2>

                <div className='w-9/10 h-9/12  flex flex-col gap-10'>

                  <div className='w-full h-full relative'>
               <MdPerson className='absolute  top-1/2 -translate-y-1/2 text-secondary left-5 z-10 '/>
                <input 
                className=' placeholder:text-secondary relative w-full h-full px-12 text-lg border-2 focus:outline-none border-secondary rounded-3xl'
                placeholder='name'
                type="text" 
                value={formdata.name} 
                onChange={(e)=>setformdata({...formdata,name:e.target.value})} />
                </div>   

               <div className='w-full h-full relative'>
               <MdEmail className='absolute  top-1/2 -translate-y-1/2 text-secondary left-5 z-10 '/>
                <input 
                className=' placeholder:text-secondary relative w-full h-full px-12 text-lg border-2 focus:outline-none border-secondary rounded-3xl'
                placeholder='email@gmail.com'
                type="text" 
                value={formdata.email} 
                onChange={(e)=>setformdata({...formdata,email:e.target.value})} />
                </div>  

               <div className='w-full h-full relative'>
               <MdLock className='absolute text-secondary  top-1/2 -translate-y-1/2  left-5 z-10 '/>
                <input 
                className='placeholder:text-secondary relative w-full h-full px-12 text-lg border-2 focus:outline-none border-secondary rounded-3xl'
                placeholder='Password'
                type={showpassword?"password":"text"}
                value={formdata.password} 
                onChange={(e)=>setformdata({...formdata,password:e.target.value})} />
                <button type="button" 
                className='absolute right-5  top-1/2 -translate-y-1/2 ' 
                onClick={() => setshowpassword((prev) => !prev)}
                >
                    {showpassword?<FaEyeSlash /> : <FaEye />}
                </button>
                </div>

                 <ScaleDownButton className='w-3/10 p-3 bg-primary/90
                   border-2 font-bold border-secondary/10
                    text-secondary text-lg rounded-3xl
                    hover:scale-95
                    hover:brightness-75'>
                   SUBMIT
                 </ScaleDownButton>
                </div>
                
                <div className='flex text-secondary items-center justify-center gap-2  '>
                  <h3>Don't have a account? </h3>
                  <ScaleDownButton to="/login" className='bg-primary/90 px-2 rounded-3xl 
                   border-2 font-bold border-secondary/10
                    hover:scale-95
                    hover:brightness-75
                    text-secondary
                    
                  '><h3>Log In</h3></ScaleDownButton>
                </div>

        </form>



  
   
    </>
   
  )
}

export default Login
