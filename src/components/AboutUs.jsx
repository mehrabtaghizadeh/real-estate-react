import React from 'react'
import './about.css'
import { BsFillHouseHeartFill , BsFillShieldFill } from "react-icons/bs"
import { BiLeaf  } from "react-icons/bi"
import { FaWineGlass } from "react-icons/fa"


function AboutUs() {
  return (
    <section className="about" id="about">
    <div className="container">

      <figure className="about-banner">
        <img src="./assets/about-banner-1.png" alt="House interior"/>
        <img src="./assets/about-banner-2.jpg" alt="House interior" className="abs-img"/>
      </figure>

      <div className="about-content">

        <p className="section-subtitle">درباره ما</p>

        <h2 className="h2 section-title">مشاور املاکی پیشرو  در معاملات خرید فروش انواع املاک </h2>

        <p className="about-text">
          بیش از 2000+ آگهی در سراسر استان های کشور
        </p>

        <ul className="about-list">

          <li className="about-item">
            <div className="about-item-icon">
            <BsFillHouseHeartFill/>
            </div>

            <p className="about-item-text">طراحی هوشمند</p>
          </li>

          <li className="about-item">
            <div className="about-item-icon">
            <BiLeaf/>
            </div>

            <p className="about-item-text">تصفیه هوای متبوع</p>
          </li>

          <li className="about-item">
            <div className="about-item-icon">
              <FaWineGlass/>
            </div>

            <p className="about-item-text">لایف استایل خاص</p>
          </li>

          <li className="about-item">
            <div className="about-item-icon">
            <BsFillShieldFill/>
            </div>

            <p className="about-item-text">نگهبانی شبانه روزی</p>
          </li>

        </ul>

        <p className="callout">
        املاک ستاره در خدمت شماست تا بهترین منزل های مسکونی، اداری، فروشگاهی، زمین و ... را با بهترین قیمت به شما معرفی کند.
        </p>

      </div>

    </div>
  </section>
  )
}

export default AboutUs