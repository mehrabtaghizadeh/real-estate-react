import React, { useContext } from "react";
import Footer from "../components/Footer";
import { AiFillLock } from "react-icons/ai";
import { MdOutlineAlternateEmail } from "react-icons/md";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BASE_URL from "../utils/BASE_URL";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserContext } from "../context/AuthContext";
import {Helmet} from "react-helmet";

function LoginPage() {
  const {setUserId,setUser} = useContext(UserContext)
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .max(12, "!طول رمز عبور نباید بیشتر 12 حرف باشد*")
        .required("*اجباری"),
      email: Yup.string().email("!فرمت ایمیل صحیح نیست*").required("*اجباری"),
    }),
    onSubmit: (values) => {
      fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(values),
        credentials:'include'
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          Swal.fire("موفقیت", "ثبت نام با موفقیت انجام شد", "success");
          navigate("/")
          setUser(data.user.username)
          setUserId(data.user._id)
        })
        .catch((err) => console.log(err));
    },
  });
  return (
    <>
     <Helmet>
         <meta charSet="utf-8" />
         <title>ورود</title>
         <meta name="ورود"  content="ورود به سایت" />
     </Helmet>
      <div className="register">
        <form
          action=""
          method="post"
          onSubmit={formik.handleSubmit}
          className="form"
        >
          <h3 className="form-title">ورود</h3>
          <div className="input-box">
            <div className="input-col">
            <MdOutlineAlternateEmail className="register-icon" />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="ایمیل"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className="error">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="input-box">
            <div className="input-col">
            <AiFillLock className="register-icon" />
            <input
              type="password"
              placeholder="رمز عبور"
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null}
          </div>
          <p>
             اکانت نداری ؟
            <Link to={"/login"} className="login-link">
              ثبت نام کن
            </Link>
          </p>
          <button type="submit" className="btn-register">
            ورود
          </button>
        </form>
      </div>
    </>
  );
}

export default LoginPage;