import React, { useEffect, useState } from "react";
import Landing from "../components/Landing";
import AboutUs from "../components/AboutUs";
import Service from "../components/Service";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import PropertyCard from "../components/Card";
import { Link } from "react-router-dom";
import BASE_URL from "../utils/BASE_URL";
import Loading from "../components/Loading";
function HomePage() {
  const [data, setData] = useState([]);
  const [loading,setLoading] = useState(true)
   useEffect(()=>{
    fetch(`${BASE_URL}/propertyes/homepage`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false)
      })
      .catch(err => console.log(err));
   },[])

    if(loading === true ){ 
       return <Loading/>;
    }


   return (
    <>
      <Landing />
      <Service />
      <AboutUs />
      <div>
        <p class="section-subtitle pb-6">آگهی ها</p>
        <Swiper
          className="p-14"
          spaceBetween={20}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            400: {
              slidesPerView: 2,
            },
            639: {
              slidesPerView: 3,
            },
            865: {
              slidesPerView: 4,
            },
            1000: {
              slidesPerView: 4,
            },
            1500: {
              slidesPerView: 5,
            },
          }}
          slidesPerView={3}
        >
          {data?.map((pro, i) => (
            <SwiperSlide key={i} className="m-2" >
              <Link to={`/property/${pro._id}`}>
                <PropertyCard
                  price={pro.price}
                  rent={pro.rent}
                  photo={pro.images}
                  area={pro.area}
                  bedroom={pro.bedroom}
                  contract={pro.contract}
                  hour={pro.createdAt}
                  title={pro.title}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    
    </>
  );
}

export default HomePage;
