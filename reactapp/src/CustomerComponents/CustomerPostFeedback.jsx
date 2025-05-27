import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import CustomerNavbar from './CustomerNavbar';
import '../App.css'
import { FormValidations } from '../formValidations';
import './CustomerPostFeedback.css';
import { addFeedback, dispatchCurrentUser } from '../apiConfig';
import { useDispatch, useSelector } from 'react-redux';
import { buildDateTimeString } from '../helpers/apiHelper';

const CustomerPostFeedback = () => {

  const [popup, setPopup] = useState(false);
  const dispatch = useDispatch();
  const getUser = useSelector((state) => state.userData.userInfo);

  const initialValues = {
    feedback: ''
  }

  const yupObject = {
    feedback: Yup.string().required('Feedback text is required')
  }

  const handleSubmit = async (res) => {
    console.log("Feedback::", res);
    const feedbackBody = {
      user: { userId: getUser.userId },
      feedbackText: res.feedback,
      date: buildDateTimeString()
    }
    const submitFeedback = await addFeedback(feedbackBody);
    if (submitFeedback.status === "success") {
      setPopup(true);
    }
  }

  const formik = FormValidations(initialValues, yupObject, handleSubmit)

  const handleClose = () => {
    setPopup(false);
    formik.resetForm();
  }

  useEffect(() => {
    dispatchCurrentUser(dispatch);
  }, [dispatch])
  return (
    <div>
      <CustomerNavbar />
      <div className='feedback-form'>
        <h2>Submit Your Feedback</h2>
        <form className='login-form' onSubmit={formik.handleSubmit}>
          <div className='form-group'>
            <label for="feedback">Feedback</label>
            <textarea placeholder='Enter your feedback here' rows='6' cols='30' id='feedback' name='feedback' value={formik.values.feedback} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.touched.feedback && formik.errors.feedback && <span className='errorMessage'>{formik.errors.feedback}</span>}
          </div>
          <div className='button-div'>
            <button type='submit' className='login-button'>Submit Feedback</button>
          </div>
        </form>
      </div>
      {popup && <div id="popup" className="popup">
        <div className='popup-content'>
          <button style={{ color: "#333" }} onClick={handleClose} className='close'>&times;</button>
          <h2>Feedback Submitted Successfully</h2>
        </div>
      </div>}
    </div>
  )
}

export default CustomerPostFeedback