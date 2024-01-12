import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { TbBuildingEstate} from 'react-icons/tb'
import { MdApartment } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import categoryes from "../utils/categorys.js"
import locations from '../utils/locations.js'
import BASE_URL from '../utils/BASE_URL.js'
function SearchBar() {
  const navigate = useNavigate()
    const [title,setTitle] = useState("")
    const [category,setCategory] = useState("")
    const [location,setLocation] = useState("")
   const searchHandele = (e) => {
     e.preventDefault()
      fetch(`${BASE_URL}/propertyes/search?title=${title}&location=${location}&category=${category}`)
      .then(res => res.json())
      .then(data =>{console.log(data);navigate("/search",{state:data})})
      .catch(err => console.log(err))
   }
  return (
    <div className='search-bar'>
        <form className="search-inputs">
            <div className='search-input'>
                <button onClick={searchHandele}>
                <BsSearch/>
                </button>
                <input type="text" placeholder='عنوان' value={title} defaultValue={""} onChange={ev => setTitle(ev.target.value)}/>
            </div>

             <div className='dropdown'>
              <TbBuildingEstate className='drop-icon'/>
               <select 
               name="location"
                id="location"
                value={location}
                defaultValue={""}
                className='select'
                onChange={e => setLocation(e.target.value)}
               >
               {locations.map(loc => (
                <option value={loc.value}>{loc.label}</option>
               ))}
               </select>
             </div>
            
            <div className='dropdown'>
              <MdApartment className='drop-icon'/>
              <select 
               name="category"
                id="category"
                defaultValue={""}
                className='select'
                value={category}
                onChange={e => setCategory(e.target.value)}
               >
               {categoryes.map(cat => (
                <option value={cat.value}>{cat.label}</option>
               ))}
               </select>
            </div>
        </form>
    </div>
  )
}

export default SearchBar