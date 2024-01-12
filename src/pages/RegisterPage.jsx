import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AiFillLock, AiOutlineUser } from "react-icons/ai";
import { MdOutlineAlternateEmail } from "react-icons/md";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BASE_URL from "../utils/BASE_URL";
import { useFormik } from "formik";
import * as Yup from "yup";
import {Helmet} from "react-helmet";

function RegisterPage() {

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(20, "نام کاربری باید کمتر از 12 حرف باشد!")
        .required("اجباری"),
      password: Yup.string()
        .max(12, "طول رمز عبور نباید بیشتر 12 حرف باشد!")
        .required("اجباری"),
      email: Yup.string().email("فرمت ایمیل صحیح نیست!").required("اجباری"),
    }),
    onSubmit: (values) => {
      fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then(() => {
          Swal.fire("موفقیت", "ثبت نام با موفقیت انجام شد", "success");
          navigate("/login")
        })
        .catch((err) => console.log(err));
    },
  });
  return (
    <>
         <Helmet>
         <meta charSet="utf-8" />
         <title>ثبت نام</title>
         <meta name="ثبت نام"  content="ثبت نام جدید " />
         </Helmet>
      <div className="register">
        <form
          action=""
          method="post"
          onSubmit={formik.handleSubmit}
          className="form"
        >
          <h3 className="form-title">ثبت نام</h3>
          <div className="input-box">
            <div className="input-col">
            <AiOutlineUser className="register-icon" />
            <input
              type="text"
              id="username"
              name="username"
              placeholder="نام کاربری"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            </div>
            {formik.touched.username && formik.errors.username ? (
              <div className="error">{formik.errors.username}</div>
            ) : null}
          </div>
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
            آیا از قبل اکانت دارید؟
            <Link to={"/login"} className="login-link">
              وارد شوید
            </Link>
          </p>
          <button type="submit" className="btn-register">
            ثبت نام
          </button>
        </form>
      </div>
    </>
  );
}

export default RegisterPage;