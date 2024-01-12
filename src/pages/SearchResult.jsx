import React, { useState } from 'react'
import { useLocation , Link } from 'react-router-dom'
import PropertyCard from '../components/Card'

function SearchResult() {
  const location = useLocation()
  const [data] = useState(location.state)
  return (
    <div className='allProperty'>
      {data.length > 0 ? data.map((pro,index)=>(
        <Link key={index} to={`/property/${pro._id}`}>
        <PropertyCard 
          price={pro.price}
          photo={pro.images}
          area={pro.area}
          bedroom={pro.bedroom}
          contract={pro.contract}
          hour={pro.createdAt}
          title={pro.title}
        />
      </Link> )): <p>نتیجه ای برا جسجوی شما پیدا نشد!</p>}
    </div>
  )
}

export default SearchResult