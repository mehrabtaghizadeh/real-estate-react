import React, { useEffect , useState } from 'react'
import BASE_URL from '../utils/BASE_URL'
import { Link } from 'react-router-dom'
import PropertyCard from '../components/Card'


function MyProperty() {
  const [userId,setUserId] = useState()
  const [data,setData] = useState()
  useEffect(()=>{
    fetch(`${BASE_URL}/user/profile`,{
     credentials:'include'
    }).then(res => res.json()).then(data=>{ 
     const id = data.id
     setUserId(id)
 })
})
  useEffect(()=>{
   fetch(`${BASE_URL}/user/oneUser/${userId}`).then(res => res.json()).then(data=>{ 
     const property = data.property
     setData(property)
 }).catch(err => console.log(err))
 },[userId])

  return ( <>
    <div className='allProperty'>
        {data?.map((pro)=>(
        <Link key={pro._id} to={`/edit/${pro._id}`}>
        <PropertyCard 
          price={pro?.price}
          rent={pro?.rent}
          photo={pro.images}
          area={pro.area}
          bedroom={pro.bedroom}
          contract={pro.contract}
          hour={pro.createdAt}
          title={pro.title}
        />
      </Link>)) }
      
    </div>
  </>
  )
}

export default MyProperty