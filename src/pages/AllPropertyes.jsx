import React,{ Fragment ,useState , useEffect} from "react";
import PropertyCard from "../components/Card";
import { BiSearch, BiSort } from "react-icons/bi";
import { Dialog, Transition } from '@headlessui/react'
import { Button } from "@nextui-org/react"
import { Pagination } from "@nextui-org/react";
import './allPropertyes.css';
import { Link , useNavigate } from 'react-router-dom';
import BASE_URL from "../utils/BASE_URL";
import {Helmet} from "react-helmet";
// import SkeletonLoding from "../components/Skeleton";
import locations from "../utils/locations";
import categroyes from "../utils/categorys";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";
function AllPropertyes() {
  const [data,setData] = useState()
  const [dataCount,setDataCount] = useState(0)
  const [page,setPage] = useState(0)
  const [loading,setLoading] = useState(true)
  const dataPerPage = Math.ceil(dataCount / 5)
  const navigate = useNavigate()
  const [title,setTitle] = useState("")
  const [category,setCategory] = useState("")
  const [location,setLocation] = useState("")
  let [isOpen, setIsOpen] = useState(false)
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
 const searchHandele = (e) => {
    e.preventDefault()
    fetch(`${BASE_URL}/propertyes/search?title=${title}&location=${location}&category=${category}`)
    .then(res => res.json())
    .then(data => {setIsOpen(false);navigate("/search",{state:data})})
    .catch(err => console.log(err))
 }
  useEffect(()=>{
    fetch(`${BASE_URL}/propertyes/propertyesCount`).then(res=>res.json())
    .then(data => {
     setDataCount(data)
   })
    .catch(err => console.log(err))
   },[])
  useEffect(()=>{
    setLoading(true)
   fetch(`${BASE_URL}/propertyes/all?page=${page}`).then(res=>res.json())
   .then(data => {
     setData(data)
     setLoading(false)
  })
   .catch(err => console.log(err))
  },[page])


 const handleChange  = (e) => {
  setPage(e - 1)
 } 
if(loading){
  return <Loading/>
}
  return (
    <div>
         <Helmet>
                <meta charSet="utf-8" />
                <title>آگهی ها</title>
                <meta name="آگهی املاک" content="آگهی های املاک در کل کشور" />
            </Helmet>
           <div>
            <div className="p-3 w-full border-spacing-8 border-b-1 border-slate-400 hidden max-md:flex">
           <Button onPress={openModal} variant="light" className="text-blue-500 mr-4 w-8 rounded-full p-0 hidden max-md:flex"><BiSort className="w-8 h-7"/></Button>
            </div>
            <SearchBar/>
        <Transition appear show={isOpen} as={Fragment}>
         <Dialog as="div" className="relative z-10" onClose={closeModal}>
           <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                  </Dialog.Title>
                  <div className="flex flex-col m-3 gap-4 ">
               <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="p-3 rounded hover:outline-none focus-visible:outline-blue-300" placeholder="عنوان"/>
               <select value={location} defaultValue={""} onChange={e => setLocation(e.target.value)} name="location" id="location" className="p-3 rounded hover:outline-none focus-visible:outline-blue-300">
                 {locations.map(loc => (
                  <option key={loc.value} value={loc.value}>{loc.label}</option>
                 ))}
               </select>
              <select value={category} defaultValue={""} onChange={e => setCategory(e.target.value)} name="category" id="category" className="p-3 rounded hover:outline-none focus-visible:outline-blue-300">
                {categroyes.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
                </div>
                  <div className="flex ">
                    <Button
                      color='primary'
                      className='rounded m-2'
                      onClick={searchHandele}
                    >
                      <BiSearch/>
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
           </div>
        <div className="allProperty">    
        {data?.map((pro,i)=> (
          <Link key={i} to={`/property/${pro._id}`}>
            <PropertyCard 
              price={pro?.price}
              photo={pro.images}
              rent={pro?.rent}
              area={pro.area}
              bedroom={pro.bedroom}
              contract={pro.contract}
              hour={pro.createdAt}
              title={pro.title}
            />
          </Link>
      ))}      
      </div>
z
       <div className="pagination-wraper">
        <Pagination onChange={handleChange} showControls total={dataPerPage} defaultValue={page + 1}/>
       </div>
    </div>
  );
}

export default AllPropertyes;
