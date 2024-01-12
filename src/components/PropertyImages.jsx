import React, { useState } from 'react'

function PropertyImages({images}) {
  const [activeImage , setActiveImage] = useState(images[0].url)
      return (
    <div className='relative p-8 flex flex-col gap-3 max-sm:p-1'>
      <div className='rounded'>
        <img src={activeImage} className=' w-full rounded-lg max-h-[600px] max-sm:max-h-[350px] transition' alt="main img" />
      </div>
        <div className='flex gap-1'>
        {images?.map((image) =>(
            <button className='border-1 p-1 w-20 h-20 rounded' onClick={()=>setActiveImage(image.url)}>
                  <img src={image.url} className='aspect-square rounded' alt="" />
            </button>
        ))}
        </div>
    </div>
  )
}

export default PropertyImages