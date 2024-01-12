import React from "react";
import { BiBed } from 'react-icons/bi'
import { MdCompareArrows } from 'react-icons/md'
import {BsStopwatchFill} from 'react-icons/bs'
import "./about.css";
import { Link } from "react-router-dom";
import moment from 'jalali-moment';
export default function PropertyCard({ photo, price , hour , bedroom , contract , area , rent , title}) {
  const image = photo[0]
  return (
    <div className="property-card">
      <figure className="card-banner">
        <Link>
        {
      image  ? <img src={image.url} crossOrigin="anonymous" alt="New Apartment Nice View" className="w-100" />
          : <img src="./assets/no-photo.png" alt="no pic" className="w-100" />
        }
        </Link>

        <div className={contract === 'فروش' ?'card-badge green' : 'card-badge orange'}>{contract}</div>
      </figure>

      <div className="card-content">
      <p class="hour">
          <BsStopwatchFill/>
          <time>{moment(hour, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}</time>
        </p>
        <h3 className="h3 card-title">
          <p>{title}</p>
        </h3>

        <div className="flex text-orange-500 justify-center items-center py-2">
          {price ? 
       <input type="text" value={price + "تومان"} readOnly className="cursor-none text-center bg-transparent font-blod"/>
       :   
       ""
          }
         {rent  ? 
         <div className="flex gap-1">
          <span className="text-slate-700">ودیعه</span>
          <input type="text" value={rent + "تومان"} readOnly className="cursor-none text-center w-32 p-0 bg-transparent font-blod"/>
         </div>
           : ''
         }
        </div>
        <ul className="card-list">
          <li className="card-item">
             <BiBed/>
            <strong>{bedroom}</strong>
            <span>اتاق</span>
          </li>
          <li className="card-item">

            <MdCompareArrows/>
            <strong>{area}</strong>
            <span>متر</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
