// LoanForm.jsx
import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import LoanManagerNavbar from "./LoanManagerNavbar";

// Validation Schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  loanType: Yup.string().required("Loan type is required"),
  amount: Yup.number()
    .min(1, "Amount should be at least 1")
    .required("Amount is required"),
  status: Yup.string().required("Status is required"),
});

const LoanForm = ({ loan, onSave }) => {
  // Prepopulate fields when editing an existing loan
  const initialValues = loan || {
    name: "",
    loanType: "",
    amount: "",
    status: "",
  };

  return (
    <>
      <LoanManagerNavbar />
      <div style={{width: "80%"}}>
        <h2>{loan ? "Edit Loan" : "Add Loan"}</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSave}
        >
          <Form>
            <div>
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="loanType">Loan Type</label>
              <Field type="text" id="loanType" name="loanType" />
              <ErrorMessage name="loanType" component="div" className="error"  />
            </div>

            <div>
              <label htmlFor="amount">Amount</label>
              <Field type="number" id="amount" name="amount" />
              <ErrorMessage name="amount" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="status">Status</label>
              <Field as="select" id="status" name="status">
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </Field>
              <ErrorMessage name="status" component="div" className="error" />
            </div>

            <div>
              <button type="submit">{loan ? "Update" : "Add"} Loan</button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default LoanForm;
