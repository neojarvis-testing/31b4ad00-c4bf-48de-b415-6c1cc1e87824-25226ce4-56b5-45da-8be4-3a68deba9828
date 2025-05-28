import React from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './Signup.css'
import { FormValidations } from '../formValidations';
import { registerUser } from '../apiConfig';

const Signup = () => {

  const navigate = useNavigate();

  const handleSubmit = async (user) => {

    const {role, ...rest} = user;
    const {email, ... restFields} = user;
    const updatedUser = {userRole: role, emailId: email, ...rest};

    console.log("Registered::", updatedUser);
    // navigate("/");
    
    const userRegistered=await registerUser(updatedUser);
    console.log(userRegistered);
    if(userRegistered==="OK"){
      alert("User Registered Successfully");
      navigate("/");
    }else{
      alert("Some thing went wrong");
    }
  }

  const initialValues={
    userName: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
    role: ''
  }

  const yupObject={
    userName: Yup.string().required('User Name is required'),
    email: Yup.string().email('Please enter a valid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be atleast 6 characters').required('Password is required'),
    mobileNumber: Yup.string().length(10, "Mobile Number must be exactly 10 charcters").required("Mobile Number is required"),
    confirmPassword: Yup.string().required("Confirm Password is required").oneOf([Yup.ref('password')], 'Passwords must match'),
    role: Yup.string().required('Role is required')
  }

  const formik= FormValidations(initialValues,yupObject,handleSubmit);

  return (
    <div className='signup-box signup-div'>
      <h2>Signup</h2>
      <form className='signup-form login-box' onSubmit={formik.handleSubmit}>
        <div className='form-group'>
          <label for="userName">User Name <span className='error'>*</span></label>
          <div>
            <input id="userName" name='userName' type='text' placeholder='User Name' value={formik.values.userName} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.touched.userName && formik.errors.userName && <span className='errorMessage'>{formik.errors.userName}</span>}
          </div>
        </div>
        <div className='form-group'>
          <label>Email <span className='error'>*</span></label>
          <input name="email" placeholder='Email' type='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.touched.email && formik.errors.email && <span className='errorMessage'>{formik.errors.email}</span>}
        </div>
        <div className='form-group'>
          <label>Mobile Number <span className='error'>*</span></label>
          <input name="mobileNumber" placeholder='Mobile Number' type='text' value={formik.values.mobileNumber} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.touched.mobileNumber && formik.errors.mobileNumber && <span className='errorMessage'>{formik.errors.mobileNumber}</span>}
        </div>
        <div className='form-group'>
          <label>Password<span className='error'>*</span></label>
          <input name='password' type='password' placeholder='Password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.touched.password && formik.errors.password && <span className='errorMessage'>{formik.errors.password}</span>}
        </div>
        <div className='form-group'>
          <label>Confirm Password <span className='error'>*</span></label>
          <input name='confirmPassword' type='password' placeholder='Confirm Password' value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && <span className='errorMessage'>{formik.errors.confirmPassword}</span>}
        </div>
        <div className='form-group'>
          <label>Role <span className='error'>*</span></label>
          <select name="role" placeholder='Role' value={formik.values.role} onChange={formik.handleChange} onBlur={formik.handleBlur}>
            <option value="">Select Role</option>
            <option value="CUSTOMER">Customer</option>
            <option value="LOAN MANAGER">Loan Manager</option>
            <option value="BRANCH MANAGER">Branch Manager</option>
          </select>
          {formik.touched.role && formik.errors.role && <span className='errorMessage'>{formik.errors.role}</span>}
        </div>
        <button className='submit-button'>Submit</button>
        <p>Already have an account?<span className='login-link'><a href="/">Login</a></span></p>
      </form>
    </div>
  )
}

export default Signup