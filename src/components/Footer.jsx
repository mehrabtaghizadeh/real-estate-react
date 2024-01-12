import React from 'react'
import './about.css'
import { Link , useLocation } from 'react-router-dom'
import {IoMdLocate} from 'react-icons/io'
import { AiOutlineMail, AiFillInstagram , AiOutlineTwitter } from 'react-icons/ai'
import {FaLinkedin} from 'react-icons/fa'
function Footer() {
  const location = useLocation()
  const FooterShouldBeHidden = ["/add","/my","/search","/login","/register"].includes(location.pathname)
  return (
<>
<footer className={FooterShouldBeHidden ? "hidden" : "footer"}>

<div className="footer-top">
  <div className="container">

    <div className="footer-brand">

        <img src="./assets/logo.png" alt="Homeverse logo" className='logo'/>

      <p className="section-text">
        ما چیزهای خوبی در زندگی تان به ارمغان می آوریم
      </p>

      <ul className="contact-list">

        <li>
          <p className="contact-link">
            <IoMdLocate className='h-8 w-8'/>
            <address>ایران , رشت</address>
          </p>
        </li>



        <li>
          <Link href="mailto:contact@homeverse.com" className="contact-link">
            <AiOutlineMail className='h-8 w-8'/>
            <span>mehrabt999@gmail.com</span>
          </Link>
        </li>

      </ul>

      <ul className="social-list">

        <li>
          <Link className="social-link">
            <AiFillInstagram className='h-8 w-8'/>
          </Link>
        </li>

        <li>
          <Link className="social-link">
            <AiOutlineTwitter className='h-8 w-8'/>
          </Link>
        </li>

        <li>
          <Link className="social-link">
            <FaLinkedin className='h-8 w-8'/>
          </Link>
        </li>


      </ul>

    </div>

    <div className="footer-link-box">

      <ul className="footer-list">

        <li>
          <p className="footer-list-title">دسترسی سریع</p>
        </li>

        <li>
          <Link to={"/"} className="footer-link">خانه</Link>
        </li>

        <li>
          <Link to={"/register"} className="footer-link">ثبت نام</Link>
        </li>

        <li>
          <Link to={"/login"} className="footer-link">ورود</Link>
        </li>

        <li>
          <Link to={"/propertyes"} className="footer-link">آگهی ها</Link>
        </li>

      </ul>

      <ul className="footer-list">

        <li>
          <p className="footer-list-title">خدمات ما</p>
        </li>

        <li>
          <Link className="footer-link">ارتباط با ما</Link>
        </li>

        <li>
          <Link className="footer-link">قوانین مقررات</Link>
        </li>

        <li>
          <Link className="footer-link">سوالات متداول</Link>
        </li>

      </ul>


    </div>

  </div>
</div>

<div className="footer-bottom">
  <div className="container">

    <p className="copyright">
      &copy; 2023 <span>محراب تقی زاده</span> تمام حقوق محفوظ است.
    </p>

  </div>
</div>

</footer>
</>
  )
}

export default Footer