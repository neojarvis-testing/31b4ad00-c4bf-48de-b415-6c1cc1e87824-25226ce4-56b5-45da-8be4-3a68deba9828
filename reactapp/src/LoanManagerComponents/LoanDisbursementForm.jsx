// LoanDisbursementForm.jsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import LoanManagerNavbar from "./LoanManagerNavbar";

const disbursementMethods = ["Cash", "Check", "Bank Transfer"];

const validationSchema = Yup.object({
  disbursementDate: Yup.date()
    .min(new Date().toISOString().split("T")[0], "Date must be today or future")
    .required("Required"),
  disbursementAmount: Yup.number()
    .positive("Must be positive")
    .required("Required"),
  disbursementMethod: Yup.string()
    .oneOf(disbursementMethods, "Invalid method")
    .required("Required"),
  remarks: Yup.string(),
});

const LoanDisbursementForm = ({ initialValues, onSubmit, onCancel }) => {
  return (
    <>
      {/* <LoanManagerNavbar /> */}
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form
          style={{ border: "1px solid #ccc", padding: 20, marginBottom: 20 }}
        >
          <div>
            <label>Disbursement Date:</label>
            <br />
            <Field type="date" name="disbursementDate" />
            <ErrorMessage
              name="disbursementDate"
              component="div"
              style={{ color: "red" }}
            />
          </div>
          <div>
            <label>Disbursement Amount:</label>
            <br />
            <Field type="number" name="disbursementAmount" />
            <ErrorMessage
              name="disbursementAmount"
              component="div"
              style={{ color: "red" }}
            />
          </div>
          <div>
            <label>Method:</label>
            <br />
            <Field as="select" name="disbursementMethod">
              <option value="">Select</option>
              {disbursementMethods.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="disbursementMethod"
              component="div"
              style={{ color: "red" }}
            />
          </div>
          <div>
            <label>Remarks:</label>
            <br />
            <Field as="textarea" name="remarks" rows={3} />
          </div>
          <br />
          <button type="submit">Save</button>
          &nbsp;
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default LoanDisbursementForm;
