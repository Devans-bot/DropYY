import React from 'react'
import EmojiWallpaper from './emojiwallpaper'
import DropYY from './logonav'

const DeviceFrame = ({children}) => {
  return (
    <>
    {/* Mobile = full screen */}
    <div className='md:hidden  w-screen h-screen '>
    <div 
       className="flex  items-start justify-end overflow-hidden w-full h-full  "
       >
         {children}
       </div>
      
    </div>

    
       <div 
      className="hidden md:flex  bg-primary w-screen h-screen items-center justify-center">
       <div 
       className="relative w-9/10 lg:w-7/10 h-9/10 border-2 border-secondary/10 flex items-center justify-center rounded-3xl p-8 "
       >
         <DropYY/>
        <EmojiWallpaper/>
        {children}
       </div>
      </div>
    </>
  )
}

export default DeviceFrame
