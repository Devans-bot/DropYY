import React from 'react'
import { MdPerson } from 'react-icons/md'

const ProfileLogo = () => {
  return (
    <div className="md:hidden text-secondary/40 absolute top-5 right-5 z-50 w-8 h-8 bg-primary/30 border-2 border-secondary/60 rounded-full flex items-center justify-center">
        <MdPerson size={25}/>
    </div>
  )
}

export default ProfileLogo
