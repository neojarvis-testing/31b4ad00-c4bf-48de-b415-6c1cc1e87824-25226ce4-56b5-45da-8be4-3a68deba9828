import React from 'react'
import * as Yup from 'yup';
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../slice/userSlice';
import { FormValidations } from '../formValidations';

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (user) => {
    console.log("USer::", user)
    dispatch(setUserInfo({email:user.email,jwt_token:"fhdgj6ygdbhj328jdvn832jhf7"}));
    navigate("/home");
  }

  const initialValues={
    email: '',
    password: ''
  }

  const yupObject={
    email: Yup.string().email('Please enter a valid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be atleast 6 characters').required('Password is required')
  }

  const formik = FormValidations(initialValues,yupObject,handleLogin)

  return (
    <div className='bg-login-screen'>
      <div className='app-content'>
        <h1>Loan Vault</h1>
        <h4>Financial success is a journey, and the first step is applying for a loan</h4>
      </div>
      <div className='login-form-bg'>
        <div className='login-box'>
          <form className='login-form' onSubmit={formik.handleSubmit}>
            <h2 >Login</h2>
            <div className='form-group'>
              <input name="email" placeholder='Email' type='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.touched.email && formik.errors.email && <span className='errorMessage'>{formik.errors.email}</span>}
            </div>
            <div className='form-group'>
              <input name='password' type='password' placeholder='Password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
              {formik.touched.password && formik.errors.password && <span className='errorMessage'>{formik.errors.password}</span>}
            </div>
            <button className='login-button'>Login</button>
            <p>Don't have an account?<span className='signup-link'><a href="/signup">Sign Up</a></span></p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login