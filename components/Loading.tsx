import React from 'react'
import Loading_motion from "./loading_motion.json"
import Lottie from 'lottie-react'

export default function Loading(){
  return(
    <main className='flex flex-col justify-center items-center min-h-screen'>
      <Lottie animationData={Loading_motion}/>
      <h2 className='text-red-600 font-bold text-2xl m-2'>
        Cargando...
      </h2>
    </main>
  )
}
