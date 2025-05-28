import React, { useState } from 'react';
import * as Yup from 'yup';
import CustomerNavbar from './CustomerNavbar';
import { FormValidations } from '../formValidations';
import '../App.css';
import './LoanApplicationForm.css';
import { useNavigate } from 'react-router-dom';
import { constructPostLoanBody } from '../helpers/apiHelper';
import { addLoanApplication } from '../apiConfig';
import './CustomerPostFeedback.css';

const LoanApplicationForm = () => {

  const [base64STring, setBase64String] = useState('');
  const [fileName, setFileName] = useState();
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false);

  const handleSubmit = async (loan) => {
    console.log("base64STring::", base64STring, loan);
    if (base64STring) {
      console.log("User::", loan, base64STring);
      // const loanBody = constructPostLoanBody(loan, base64STring);
      // const loanApplication = await addLoanApplication(loanBody);
      // if (loanApplication.status === "success") {
      //   navigate("/loans")
      // }
      setPopup(true);
    }
  }

  const initialValues = {
    loanAmount: '',
    tenure: '',
    employmentStatus: '',
    annualIncome: '',
    remarks: '',
    proof: ''
  }

  const yupObject = {
    loanAmount: Yup.string().required('Loan Amount is required'),
    tenure: Yup.string().required('Tenure is required'),
    employmentStatus: Yup.string().required('Employment Status is required'),
    annualIncome: Yup.string().required('Annual Income is required'),
    remarks: Yup.string().required('Remarks is required')
    // proof: Yup.string().required('Proof Document is required'),
  }

  const formik = FormValidations(initialValues, yupObject, handleSubmit)

  const handleFile = (e) => {
    console.log("Change::", e.target)
    setFileName(e.target.value);
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBase64String(e.target.result);
      }
      reader.readAsDataURL(file);
    }
  }

  const handleClose = () => {
    setPopup(false);
    navigate("/loans")
  }

  return (
    <div>
      <CustomerNavbar />
      <div className='loan-application-form signup-div'>
        <h2 >Loan Application Form</h2>
        <form className='login-form' onSubmit={formik.handleSubmit}>
          <div className='form-group'>
            <label>Loan Amount <span className='error'>*</span></label>
            <input name="loanAmount" placeholder='Loan Amount' type='number' value={formik.values.loanAmount} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.touched.loanAmount && formik.errors.loanAmount && <span className='errorMessage'>{formik.errors.loanAmount}</span>}
          </div>
          <div className='form-group'>
            <label>Tenure <span className='error'>*</span></label>
            <input name='tenure' type='number' placeholder='Tenure' value={formik.values.tenure} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.touched.tenure && formik.errors.tenure && <span className='errorMessage'>{formik.errors.tenure}</span>}
          </div>
          <div className='form-group'>
            <label>Employment Status <span className='error'>*</span></label>
            <select name="employmentStatus" placeholder='Employment Status' value={formik.values.employmentStatus} onChange={formik.handleChange} onBlur={formik.handleBlur}>
              <option value="">Select Status</option>
              <option value="Employed">Employed</option>
              <option value="Self-Employed">Self-Employed</option>
              <option value="Unemployed">Unemployed</option>
            </select>
            {formik.touched.employmentStatus && formik.errors.employmentStatus && <span className='errorMessage'>{formik.errors.employmentStatus}</span>}
          </div>
          <div className='form-group'>
            <label>Annual Income <span className='error'>*</span></label>
            <input name="annualIncome" placeholder='Annual Income' type='number' value={formik.values.annualIncome} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.touched.annualIncome && formik.errors.annualIncome && <span className='errorMessage'>{formik.errors.annualIncome}</span>}
          </div>
          <div className='form-group'>
            <label>Remarks <span className='error'>*</span></label>
            <input name="remarks" placeholder='Remarks' type='text' value={formik.values.remarks} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.touched.remarks && formik.errors.remarks && <span className='errorMessage'>{formik.errors.remarks}</span>}
          </div>
          <div className='form-group'>
            <label>Loan Amount <span className='error'>*</span></label>
            <input name="proof" placeholder='Proof' type='file' value={fileName} onChange={handleFile} onBlur={formik.handleBlur} />
          </div>
          <button className='login-button' type='submit'>Submit</button>
        </form>
      </div>
      {popup && <div id="popup" className="popup">
        <div className='popup-content' style={{display:"flex", flexDirection:"column"}}>
          <h2>Successfully Added</h2>
          <span style={{ color: "#333" }} onClick={handleClose} className='close'>&times;</span>
        </div>
      </div>}
    </div>
  )
}

export default LoanApplicationForm