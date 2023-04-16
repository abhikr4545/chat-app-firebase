import React from 'react'
import { FcGoogle } from "react-icons/fc";

const GoogleSignIn = () => {
  return (
    <div className='border-2 p-2 cursor-pointer rounded-lg'>
      <div className='flex gap-5 items-center justify-center'>
        <FcGoogle />
        <p className='text-white font-medium font-noto'>Log in with Google</p>
      </div>
    </div>
  )
}

export default GoogleSignIn