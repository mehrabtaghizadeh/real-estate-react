import React from 'react'
import { Link } from 'react-router-dom'
function Service() {
  return (
    <section className="service" id="service">
    <div className="container">

      <p className="section-subtitle">خدمات ما</p>

      <h2 className="h2 section-title">تمرکز اصلی سایت</h2>

      <ul className="service-list">

        <li>
          <div className="service-card">

            <div className="card-icon">
              <img src="./assets/service-1.png" alt="Service icon"/>
            </div>

            <h3 className="h3 card-title">
              <Link>خرید ملک</Link>
            </h3>

            <p className="card-text">
            افراد می توانند جهت خرید ملک طبق فیلترهای جستجوی موجود در سایت اعم ازنوع ملک (ویلایی ، آپارتمان ، اداری ، تجاری ، زمین و ...) ، قیمت ، متراژ ، عمر بنا ، امکانات مورد نظر (آسانسور ، پکیج ، چاه آب ، پارکینگ ، انباری و ...) ملک خود را از بین ملک های ثبت شده در شهر و منطقه مورد نظر خود بیابند
            </p>

            <Link className="card-link">
              <span>موارد بیشتر</span>
            </Link>

          </div>
        </li>

        <li>
          <div className="service-card">

            <div className="card-icon">
              <img src="./assets/service-2.png" alt="Service icon"/>
            </div>

            <h3 className="h3 card-title">
              <a href="#">اجاره ملک</a>
            </h3>

            <p className="card-text">
            افراد می توانند جهت اجاره ملک طبق فیلترهای جستجوی موجود در سایت اعم ازنوع ملک (ویلایی ، آپارتمان ، اداری ، تجاری ، زمین و ...) ، قیمت رهن و اجاره مورد نظر ، متراژ ، عمر بنا ، امکانات مورد نظر (آسانسور ، پکیج ، چاه آب ، پارکینگ ، انباری و ...) ملک خود را از بین ملک های ثبت شده در شهر و منطقه مورد نظر خود بیابند
            </p>

            <Link className="card-link">
              <span>موارد بیشتر</span>
            </Link>

          </div>
        </li>

        <li>
          <div className="service-card">

            <div className="card-icon">
              <img src="./assets/service-3.png" alt="Service icon"/>
            </div>

            <h3 className="h3 card-title">
              <a href="#">فروش ملک</a>
            </h3>

            <p className="card-text">
            هر کس ملکی برای فروش دارد، محتواگذار سایت شما می شود!
افراد می توانند ملک خود را در سایت شما درج نمایند و تصاویر و امکانات ملک خود را در سایت درج نمایند . شما به عنوان مدیر سایت تنها با یک کلیک می توانید ملک را تایید کرده و در سایت نمایش دهد .
            </p>

            <a href="#" className="card-link">
              <span>موارد بیشتر</span>

            </a>

          </div>
        </li>

      </ul>

    </div>
  </section>
  )
}

export default Service