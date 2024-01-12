import React from 'react'
import { PacmanLoader } from 'react-spinners'
function Loading() {
  return (
    <div className='flex justify-center items-center max-h-screen mt-56 mb-56'>
     <PacmanLoader color="#468ace" />
    </div>
  )
}

export default Loading