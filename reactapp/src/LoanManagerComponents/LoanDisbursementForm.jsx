// LoanDisbursementForm.jsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import LoanManagerNavbar from "./LoanManagerNavbar";

// Validation Schema using Yup
const validationSchema = Yup.object({
  disbursementDate: Yup.date()
    .min(new Date(), "Disbursement date can't be in the past")
    .required("Disbursement date is required"),
  disbursementAmount: Yup.number()
    .min(1, "Amount must be between 1 and 10,000,000,000")
    .max(10000000000, "Amount must be between 1 and 10,000,000,000")
    .required("Disbursement amount is required"),
  remarks: Yup.string().required("Remarks are required"),
  method: Yup.string()
    .oneOf(["Cash", "Check", "Bank Transfer"], "Invalid payment method")
    .required("Payment method is required"),
});

const LoanDisbursementForm = ({ disbursement, onSave, onClose }) => {
  const initialValues = disbursement || {
    disbursementDate: "",
    disbursementAmount: "",
    remarks: "",
    method: "",
  };

  return (
    <>
      <LoanManagerNavbar />
      <div>
        <h2>
          {disbursement ? "Edit Loan Disbursement" : "Add Loan Disbursement"}
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSave}
        >
          <Form>
            <div>
              <label htmlFor="disbursementDate">Disbursement Date</label>
              <Field type="date" id="disbursementDate" name="disbursementDate" />
              <ErrorMessage
                name="disbursementDate"
                component="div"
                className="error"
              />
            </div>

            <div>
              <label htmlFor="disbursementAmount">Disbursement Amount</label>
              <Field
                type="number"
                id="disbursementAmount"
                name="disbursementAmount"
              />
              <ErrorMessage
                name="disbursementAmount"
                component="div"
                className="error"
              />
            </div>

            <div>
              <label htmlFor="remarks">Remarks</label>
              <Field type="text" id="remarks" name="remarks" />
              <ErrorMessage name="remarks" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="method">Disbursement Method</label>
              <Field as="select" id="method" name="method">
                <option value="">Select Method</option>
                <option value="Cash">Cash</option>
                <option value="Check">Check</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </Field>
              <ErrorMessage name="method" component="div" className="error" />
            </div>

            <div>
              <button type="submit">
                {disbursement ? "Update" : "Add"} Disbursement
              </button>
              <button type="button" onClick={onClose}>

                <Link to="/loandisbursement">

                  Back
                </Link>
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default LoanDisbursementForm;
