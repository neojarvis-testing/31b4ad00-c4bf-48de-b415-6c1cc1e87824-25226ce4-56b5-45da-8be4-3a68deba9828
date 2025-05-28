import React from 'react'
import LoanManagerNavbar from './LoanManagerNavbar'
import * as Yup from 'yup'
import {Formik, Form, Field, ErrorMessage} from 'formik';

const LoanDisbursementForm = () => {
  return (
    <>
      <LoanManagerNavbar />
      <InitialForm />
    </>
  )
}

const methodOptions = ['Cash', 'Check', 'Bank Transfer'];


const validationSchema = Yup.object({
  disbursementDate: Yup.date().required("Choose the date"),
  disbursementAmount: Yup.number().positive('choose correct amount')
  .required('enter the amount'),
  disbursementMethod: Yup.string().oneOf(methodOptions, "Invalid method").required("choose the method"),
  remarks: Yup.string().max(200, 'Remarks cannot exceed 200 characters long').required('enter the remarks'),
});

const InitialForm = () => {
  return (
    <Formik initialValues={{
      disbursementDate: '',
      disbursementAmount: '',
      disbursementMethod: '',
      remarks: ''
    }}

    validationSchema={validationSchema}
    onSubmit={(values, {setSubmitting}) => {
      alert("form data", values)
      setSubmitting(false);
    }}>

    {({isSubmitting}) => (

      <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between', minHeight:'800px', maxWidth: '600px', margin: '80px auto 0', padding: '2rem', border: '1px solid #ccc', borderRadius:'8px', backgroundColor: '#f9f9f9'}}>

      <Form>
        <div style={{marginBottom: "1.5rem"}}>
          <label htmlFor="disbursementDate">Disbursement Date</label>
          <Field type="date" name="disbursementDate" />
          <ErrorMessage name='disbursementDate' component="div" className='error' />
        </div>

        <div style={{marginBottom: "1.5rem"}}>
          <label htmlFor="disbursementAmount">Disbursement Amount</label>
          <Field type="number" name="disbursementAmount" />
          <ErrorMessage name='disbursementAmount' component="div" className='error' />
        </div>

        <div style={{marginBottom: "1.5rem"}}>
            <label htmlFor="disbursementMethod">Disbursement Method</label>
            <Field as="select" name="disbursementMethod" >
              <option value="" disabled>Select Method</option>
              {
                methodOptions.map((method,index) => (
                  <option key={index} value={method}>
                    {method}
                  </option>
                ))
              }
            </Field>
            <ErrorMessage name='disbursementMethod' component="div" className='error' />
          
        </div>


        <div style={{marginBottom: "1.5rem"}}>
          <label htmlFor="remarks">Remarks</label>
          <Field as="textarea"
          rows="5"
          cols="50"
          name="remarks" 
          style={{resize: 'vertical'}}
          />
          <ErrorMessage name='remarks' component="div" className='error' />
        </div>


        <button type='submit' disabled={isSubmitting}>Submit</button>
      </Form>
      </div>
    )}
    </Formik>
  );
}




export default LoanDisbursementForm

