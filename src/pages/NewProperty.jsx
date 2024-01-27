/* eslint-disable no-undef */
import React, { useEffect, useMemo, useState } from "react";
import "./new-property.css";
import { MdApartment, MdSell, MdCompareArrows } from "react-icons/md";
import { TbBuildingEstate } from "react-icons/tb";
import { AiFillPhone, AiOutlineUpload } from "react-icons/ai";
import { BiBed, BiSolidTime } from "react-icons/bi";
import { LuSubtitles } from "react-icons/lu";
import { FaMoneyBill } from "react-icons/fa";
import categroyes from "../utils/categorys.js";
import locations from "../utils/locations.js";
import BASE_URL from "../utils/BASE_URL";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import CurrencyInput from "react-currency-input-field";
import {BarLoader} from "react-spinners"
import {BounceLoader} from "react-spinners"

function NewProperty() {
  const navigate = useNavigate();
  let contractes = [
    { label: "فروش", value: "فروش" },
    { label: "اجاره", value: "اجاره" },
  ];
  const [isImageLoading , setIsImageLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false) 
  const [images, setImages] = useState();
  const [showImages,setShowImags] = useState();
  const [phone, setPhone] = useState();
  const [title, setTitle] = useState("");
  const [area, setArea] = useState();
  const [category, setCategory] = useState("آپارتمان");
  const [location, setLocation] = useState("تهران");
  const [year, setYear] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [bedroom, setBedroom] = useState();
  const [contract, setContract] = useState("فروش");
  const [userId, setUserId] = useState();
  const [showRent, setShowRent] = useState(false);
  const [rent, setRent] = useState();
  const [perMonth, setPerMonth] = useState();
  useMemo(() => {
    fetch(`${BASE_URL}/user/profile`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        const id = data.id;
        setUserId(id);
      });
  }, []);
  useEffect(() => {
    if (contract === "اجاره") {
      setShowRent(true);
      setPrice();
    } else {
      setShowRent(false);
    }
  }, [contract]);
  function submitHandeler(ev) {
    setIsLoading(true)
    ev.preventDefault();
      const data = {userId,contract,rent,price,perMonth,images,phone,description,title,bedroom,year,area,category,location}
      console.log(data)
    fetch(`${BASE_URL}/propertyes/add`, {
      method: "POST",
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(data) ,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        Swal.fire("موفقیت", "آگهی با موفقیت انتشار یافت", "success");
        navigate("/");
      })
      .catch((err) => console.log(err));
  }
  function uploadHandler(ev) {
    setIsImageLoading(true);
   const files = ev.target.files
   if (files?.length > 0) {
    const data = new FormData();
    for (const file of files) {
      data.append('image', file);
    }
    fetch(`${BASE_URL}/upload`,{
      method:'POST',
      body:data
    }).then(res => res.json()).then(data =>{
      setIsImageLoading(false);
      setImages(data);
      setShowImags(data)});
  }
}
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>ثبت آگهی جدید</title>
        <meta name="آگهی جدید" content="ثبت آگهی جدید" />
      </Helmet>
      <form
        className="newProperty"
        method="post"
        onSubmit={submitHandeler}
        action="/add"
        enctype="multipart/form-data"
      >
        <div className="newProperty-inputs">
          <LuSubtitles className="input-icon" />
          <input
            type="text"
            name="title"
            value={title}
            placeholder="نام آگهی"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="newProperty-inputs">
          <AiFillPhone className="input-icon" />
          <input
            type="text"
            name="phone"
            value={phone}
            placeholder="شماره تماس"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="newProperty-inputs">
          <BiSolidTime className="input-icon" />
          <input
            type="text"
            name="year"
            value={year}
            placeholder="سال ساخت"
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        {showRent === false ? (
          <div className="newProperty-inputs">
            <MdSell className="input-icon" />
            <CurrencyInput
              prefix=""
              groupSeparator=","
              placeholder="قیمت"
              name="price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        ) : (
          ""
        )}
        <div className="newProperty-inputs">
          <BiBed className="input-icon" />
          <input
            type="text"
            name="bedroom"
            value={bedroom}
            placeholder="تعداد اتاق"
            onChange={(e) => setBedroom(e.target.value)}
          />
        </div>
        <div className="newProperty-inputs">
          <MdCompareArrows className="input-icon" />
          <input
            type="text"
            name="area"
            placeholder="متراژ"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
        </div>
        <div className="newProperty-inputs">
          <MdApartment className="drop-icon" />
          <select
            className="w-60 select"
            name="location"
            onChange={(e) => setLocation(e.target.value)}
          >
            {locations.map((loc, i) => (
              <option key={i} value={loc.value}>
                {loc.label}
              </option>
            ))}
          </select>
        </div>
        <div className="newProperty-inputs">
          <TbBuildingEstate className="drop-icon" />
          <select
            className="w-60 select"
            name="category"
            onChange={(e) => setCategory(e.target.value)}
          >
            {categroyes.map((cat, i) => (
              <option key={i} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
        <div className="newProperty-inputs">
          <MdApartment className="drop-icon" />
          <select
            label="نوع قرارداد"
            className="w-60 select"
            name="contract"
            onChange={(e) => setContract(e.target.value)}
          >
            {contractes.map((con, i) => (
              <option key={i} value={con.value}>
                {con.label}
              </option>
            ))}
          </select>
        </div>
        {showRent === true ? (
          <div className="newProperty-inputs">
            <MdSell className="input-icon" />
            <CurrencyInput
              prefix=""
              groupSeparator=","
              placeholder="ودیعه"
              name="rent"
              onChange={(e) => setRent(e.target.value)}
            />
          </div>
        ) : (
          ""
        )}
        {showRent === true ? (
          <div className="newProperty-inputs">
            <FaMoneyBill className="input-icon" />
            <CurrencyInput
              prefix=""
              groupSeparator=","
              placeholder="اجاره ماهانه"
              name="perMonth"
              onChange={(e) => setPerMonth(e.target.value)}
            />
          </div>
        ) : (
          ""
        )}
        <div className="newProperty-inputs">
          <label htmlFor="photo" className="upload-img rounded-lg px-12 py-4">
            <p className="cursor-pointer flex justify-center items-center gap-1">
              اضافه کردن عکس <AiOutlineUpload />
            </p>
            <input
              name=""
              type="file"
              aria-hidden="true"
              multiple
              className="opacity-0 cursor-pointer w-64"
              onChange={uploadHandler}
            />
          </label>
        </div>
        {isImageLoading ? <BounceLoader color="#458bf6" /> : ""}  
           {showImages ? 
            <div className="grid p-8 gap-2 grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 ">
         { showImages.map(image => (<img alt="" key={image.url} src={image.url} className="rounded aspect-square" />))} 
           </div>
           
           : "" }
        <div className="newProperty-inputs">
          <textarea
            placeholder="توضیحات"
            name="description"
            value={description}
            className="w-72 rounded-xl h-44 p-3 border-blue-600 mt-6  hover:outline-none text-xl"
            size="lg"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="newProperty-inputs">
          <button
            type="submit"
            className="btn-newProperty"
            onClick={submitHandeler}
          >
            {isLoading ? <BarLoader color="#ffffff" /> : "ثبت"}
          </button>
        </div>
      </form>
    </>
  );
}

export default NewProperty;
