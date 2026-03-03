import React from 'react'
import { BiSolidSend } from "react-icons/bi";
import { MdSaveAlt } from "react-icons/md";
import { TiArrowRepeat } from "react-icons/ti";
import ScaleDownButton from './ontapAnimate';
import { UseAuthStore } from '../Store/authStore';
import { useNavigate } from 'react-router-dom';


function dataURLtoFile(dataurl, filename) {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}


const PhotoSendNavBar = ({VideoData,PhotoData}) => {


   const {sendDrop,setPhoto}=UseAuthStore()
   const navigate=useNavigate()

   const handleSendDrop=()=>{
    if(PhotoData){
     const file=dataURLtoFile(PhotoData,"drop.png")
     setPhoto(file)
    navigate("/SendDropsToFriends")
    }

    navigate("/SendDropsToFriends")
    
   }


  return (
    <div className='w-9/10 md:w-5/10 absolute bottom-1   z-50 rounded-full h-16 border-2 border-secondary/20 bg-primary text-secondary flex items-center justify-evenly'>

        <div 
        className='w-4/6 flex gap-10 items-center justify-start pl-5 '>
        <ScaleDownButton>
       <MdSaveAlt className='hover:scale-90' size={30} />
        </ScaleDownButton>

        <ScaleDownButton>
        <TiArrowRepeat className='hover:scale-90' size={33}/>
        </ScaleDownButton>
        </div>
        
        
      

        <button
        onClick={handleSendDrop}
        className='w-1/6 bg-blue-400/90  rounded-full h-3/4 
        flex items-center justify-center 
        active:scale-90  hover:scale-90 hover:bg-blue-700/80
        transition ease-in'
        >
        <BiSolidSend size={40}/>
        </button>
       

    </div>
  )
}

export default PhotoSendNavBar
