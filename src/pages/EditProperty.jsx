import React, { Fragment , useMemo, useState , useEffect} from 'react'
import './new-property.css'
import { MdApartment , MdSell , MdCompareArrows } from 'react-icons/md'
import { TbBuildingEstate} from 'react-icons/tb'
import { AiFillPhone , AiOutlineUpload } from 'react-icons/ai'
import { BiBed , BiSolidTime } from 'react-icons/bi'
import { LuSubtitles } from 'react-icons/lu'
import categroyes from '../utils/categorys.js'
import locations from '../utils/locations.js'
import BASE_URL from '../utils/BASE_URL'
import { useParams , useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import CurrencyInput from 'react-currency-input-field';
import { FaMoneyBill } from "react-icons/fa";
import { useQuery } from "react-query"
import {Textarea} from "@nextui-org/react";
import Loading from '../components/Loading'
import { Dialog, Transition } from '@headlessui/react'
import {Modal, ModalContent, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
function EditProperty() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  let [isOpenEdit, setIsOpenEdit] = useState(false)
  function closeModal() {
    setIsOpenEdit(false)
  }

  function openModal() {
    setIsOpenEdit(true)
  }
  const navigate = useNavigate()
  let contractes = [
    {label:"فروش",value:"فروش"},
    {label:"اجاره",value:"اجاره"},
  ]
  const [phone,setPhone] = useState()
  const [images, setImages] = useState();
  const [showRent, setShowRent] = useState(false);
  const [rent, setRent] = useState();
  const [perMonth, setPerMonth] = useState();
  const [title,setTitle] = useState()
  const [area,setArea] = useState()
  const [category,setCategory] = useState()
  const [location,setLocation] = useState()
  const [year,setYear] = useState()
  const [price,setPrice] = useState()
  const [description,setDescription] = useState("")
  const [bedroom,setBedroom] = useState()
  const [contract,setContract] = useState()
  const [userId,setUserId] = useState()
  const {id} = useParams()
  
    useEffect(()=>{
    fetch(`${BASE_URL}/propertyes/one/${id}`,{
      method:'GET',
      credentials:'include'
    }).then((res) => res.json())
    .then((data) => {  
    setTitle(data.title)  
    setYear(data.year)
    setImages(data.images)
    setArea(data.area)
    setLocation(data.location)
    setCategory(data.category)
    setPrice(data?.price)
    setBedroom(data?.bedroom)
    setRent(data?.rent)
    setPerMonth(data?.perMonth)
    setContract(data.contract)
    setDescription(data?.description)
    setPhone(data?.phone)
    })
    .catch(err => console.log(err))
  },[id])
  function uploadHandler(ev) {
    const files = ev.target.files
    if (files?.length > 0) {
     const data = new FormData();
     for (const file of files) {
       data.append('image', file);
     }
     fetch('http://localhost:4000/upload',{
       method:'POST',
       body:data
     }).then(res => res.json()).then(data =>{setImages(data)});
   }
 }
  
  useEffect(() => {
    if (contract === "اجاره") {
      setShowRent(true);
      setPrice();
    } else {
      setShowRent(false);
    }
  }, [contract]);
  useMemo(()=>{
     fetch(`${BASE_URL}/user/profile`,{
      credentials:'include'
     }).then(res => res.json()).then(data=>{ 
      const id = data.id
      setUserId(id)
  })
  },[])
 function editHandeler (e) {
  e.preventDefault()
  const data = {userId,contract,rent,price,perMonth,images,phone,description,title,bedroom,year,area,category,location}
  setIsOpenEdit(false)
   fetch(`${BASE_URL}/propertyes/update/${id}`,{
    method: 'PUT',
    headers:{'Content-Type': 'application/json'},
    body:JSON.stringify(data)
   }).then(res => res.json()).then(data => {
    console.log(data)
    Swal.fire('موفقیت','با موفقیت ویرایش شد','success')
    navigate("/")
  }).catch(() => Swal.fire('خطا','مشکلی پیش آمد!','error'))
 }

  const deleteHandler = (e) => {
    e.preventDefault()
    fetch(`${BASE_URL}/propertyes/delete/${id}`,{
      method:"DELETE",
       body:JSON.stringify(userId)
    }).then(res => res.json()).then((data)=>{
      console.log(data)
      Swal.fire('موفقیت','با موفقیت حذف شد','success')
      navigate("/")
    }).catch(()=> Swal.fire('خطا','مشکلی پیش آمد!','error'))
  }
  
  return (
    <>
    <form className='newProperty'>
      <div className='newProperty-inputs'>
        <LuSubtitles className='input-icon'/>
        <input type="text" placeholder='نام آگهی' value={title} onChange={e => setTitle(e.target.value)}/>
      </div>
      <div className='newProperty-inputs'>
        <AiFillPhone  className='input-icon'/>
       <input type="text" placeholder='شماره تماس' value={phone} onChange={e => setPhone(e.target.value)}/>
      </div>
      <div className='newProperty-inputs'>
        <BiSolidTime  className='input-icon'/>
        <input placeholder='سال ساخت' type='number' value={year} onChange={e => setYear(e.target.value)}/>
      </div>
      <div className='newProperty-inputs'>
        
        <MdApartment className='drop-icon'/>
        <select 
          label="نوع قرارداد" 
          className="w-64 select" 
          value={contract}
          onChange={e => setContract(e.target.value)}
          >
           {contractes.map((con,i) => (
             <option key={i} value={con.value}>{con.label}</option>
             ))}
        </select>
        </div>
      {!showRent && !rent? 
      <div className='newProperty-inputs'>
        <MdSell className='input-icon'/>

        <CurrencyInput placeholder='قیمت' groupSeparator=',' value={price} onChange={e => setPrice(e.target.value)} />
      </div>
      : ""}
            {showRent && rent ? (
          <div className="newProperty-inputs">
            <MdSell className="input-icon" />
            <input
              placeholder="ودیعه"
              value={rent}
              name="rent"
              onChange={(e) => setRent(e.target.value)}
            />
          </div>
        ) : (
          ""
        )}
                {showRent && rent ? (
          <div className="newProperty-inputs">
            <FaMoneyBill className="input-icon" />
            <input
              value={perMonth}
              placeholder="اجاره ماهانه"
              name="perMonth"
              onChange={(e) => setPerMonth(e.target.value)}
            />
          </div>
        ) : (
          ""
        )}
      <div className='newProperty-inputs'>
        <BiBed className='input-icon'/>
        <input type="text" placeholder='تعداد اتاق' value={bedroom} onChange={e => setBedroom(e.target.value)}/>
      </div>
      <div className='newProperty-inputs'>
        <MdCompareArrows className='input-icon'/>
        <input type="text" placeholder='متراژ' value={area} onChange={e => setArea(e.target.value)}/>
      </div>
      <div className='newProperty-inputs'>
       <MdApartment className='drop-icon'/>
        <select
        className="w-60 select"
        value={location} 
        onChange={e => setLocation(e.target.value)}
        >
        {locations.map((loc,i) => (
          <option key={i} value={loc.value}>
            {loc.label}
          </option>
        ))}
      </select>
      </div>
      <div className='newProperty-inputs'>
      <TbBuildingEstate className='drop-icon'/>
       <select 
        className="w-60 select" 
        value={category}
        onChange={e => setCategory(e.target.value)}
      >
        {categroyes.map((cat,i) => (
          <option key={i} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>
         
      </div>



      <div className='newProperty-inputs'>
        <label htmlFor="photo" className='upload-img rounded-lg p-2'>
          <p className='cursor-pointer flex justify-center items-center gap-1'>اضافه کردن عکس <AiOutlineUpload/></p>
          <input type="file" aria-hidden="true" multiple className='opacity-0 cursor-pointer w-64' onChange={uploadHandler}/>
        </label>
        </div>
        <div className='flex gap-2 w-full'>
        {images?.map(image => (
          <div className='relative'>
          <img src={image.url} className=' w-20 h-20 rounded' alt=''/>
          </div>))}
        </div>
        <div className="newProperty-inputs">
        <Textarea
      label="توضیحات"
      variant="bordered"
      className='focus-visible:outline-blue-400'
      placeholder="توضیحات خود را وارد کنید"
      value={description}
      onChange={e => setDescription(e.target.value)}
      disableAnimation
      disableAutosize
      classNames={{
        base: "max-w-xs",
        input: "resize-y min-h-[40px]",
      }}
    />
        </div>
      <div className="newProperty-inputs p-6 gap-12">
      <Button
          type="button"
          color='primary'
          onClick={openModal}
          className="rounded"
        >
          ویرایش
        </Button>
        <Transition appear show={isOpenEdit} as={Fragment}>
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
                    className="text-lg font-bold text-center p-3 leading-6 text-gray-900"
                  >
                    ویرایش
                  </Dialog.Title>
                  <div className="flex p-8 justify-center">
                    <p className="text-sm text-gray-500">
                                        آیا میخوای "{title}" را ویرایش کنی
                    </p>
                  </div>
                  <div className="flex justify-around">
                    <Button
                      color='default'
                      className='rounded'
                      onClick={closeModal}
                    >
                     نه
                    </Button>
                    <Button
                      color='primary'
                      className='rounded'
                      onClick={editHandeler}
                    >
                      ویرایش
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
        <Button onPress={onOpen} color='danger' className='p-4 rounded'>حذف</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                  <p className='text-center font-bold'>مطمعنی میخوای "{title}" را حذف کنی ؟</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  بی خیال
                </Button>
                <Button color="danger" onClick={deleteHandler}>
                حذف
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      </div>
          </form>
    </>
  )
}

export default EditProperty;