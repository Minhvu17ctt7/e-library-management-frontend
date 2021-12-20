import authenApi from "api/authenApi";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Spinner } from "react-bootstrap";

const Login = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      identifier: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await authenApi.login({ identifier: values.identifier, password: values.password });
        setLoading(false)
        Cookies.set("jwt", res.jwt);
        Cookies.set("user", JSON.stringify(res.user));
        Cookies.set("isLoggedIn", true)
        router.replace("/manage")
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    },
  });
  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image" />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <h1 className="text-center mb-5">Login</h1>
            <form onSubmit={formik.handleSubmit}>
              {/* <!-- Email input --> */}
              <div className="form-outline mb-4">
                <label className="form-label">Username</label>
                <input type="text" id="form1Example13" className="form-control form-control-lg"
                  name="identifier"
                  onChange={formik.handleChange}
                  value={formik.values.identifier}

                />
              </div>

              {/* <!-- Password input --> */}
              <div className="form-outline mb-4">
                <label className="form-label">Password</label>
                <input type="password" id="form1Example23" className="form-control form-control-lg"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </div>
              {error && <p className="text-danger text-center">Username or password invalid</p>}
              {/* <!-- Submit button --> */}
              <div className="text-center mb-3">
                <button type="submit" className="btn btn-primary btn-lg btn-block w-50 m-auto" disabled={loading} >{loading ? <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                /> : "Sign in"}</button>

              </div>
              <div className="text-center">
                <Link href="/">
                  <a style={{ fontSize: '16px' }}><i className="bi bi-arrow-left"></i> Back to home</a>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div >
    </section >
  )
}

export default Login
