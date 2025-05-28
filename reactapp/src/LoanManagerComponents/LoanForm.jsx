import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation Schema
const validationSchema = Yup.object({
  loanType: Yup.string().required("Loan type is required"),
  interestRate: Yup.number()
    .min(0, "Must be 0 or more")
    .required("Interest rate is required"),
  minLoanAmount: Yup.number()
    .min(0)
    .required("Minimum loan amount is required"),
  maxLoanAmount: Yup.number()
    .min(Yup.ref("minLoanAmount"), "Must be greater than or equal to min")
    .required("Maximum loan amount is required"),
  minTenure: Yup.number().min(1).required("Minimum tenure is required"),
  maxTenure: Yup.number()
    .min(Yup.ref("minTenure"), "Must be greater than or equal to min")
    .required("Maximum tenure is required"),
  description: Yup.string().required("Description is required"),
  status: Yup.string().required("Status is required"),
  processingFee: Yup.number().min(0).required("Processing fee is required"),
  prePaymentPenalty: Yup.number()
    .min(0)
    .required("Prepayment penalty is required"),
  gracePeriod: Yup.number().min(0).required("Grace period is required"),
  latePaymentFee: Yup.number().min(0).required("Late payment fee is required"),
});

const LoanForm = ({ initialValues, onSubmit }) => {
  const defaultValues = initialValues || {
    loanType: "",
    interestRate: "",
    minLoanAmount: "",
    maxLoanAmount: "",
    minTenure: "",
    maxTenure: "",
    description: "",
    status: "",
    processingFee: "",
    prePaymentPenalty: "",
    gracePeriod: "",
    latePaymentFee: "",
  };

  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={onSubmit}
    >
      <Form style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
        <h2>{initialValues ? "Edit Loan Product" : "Add Loan Product"}</h2>

        {[
          { name: "loanType", label: "Loan Type", type: "text" },
          { name: "interestRate", label: "Interest Rate (%)", type: "number" },
          {
            name: "minLoanAmount",
            label: "Minimum Loan Amount",
            type: "number",
          },
          {
            name: "maxLoanAmount",
            label: "Maximum Loan Amount",
            type: "number",
          },
          {
            name: "minTenure",
            label: "Minimum Tenure (Months)",
            type: "number",
          },
          {
            name: "maxTenure",
            label: "Maximum Tenure (Months)",
            type: "number",
          },
          { name: "processingFee", label: "Processing Fee", type: "number" },
          {
            name: "prePaymentPenalty",
            label: "Pre Payment Penalty",
            type: "number",
          },
          {
            name: "gracePeriod",
            label: "Grace Period (Months)",
            type: "number",
          },
          { name: "latePaymentFee", label: "Late Payment Fee", type: "number" },
        ].map((field) => (
          <div key={field.name} style={{ marginBottom: 15 }}>
            <label htmlFor={field.name}>{field.label}</label>
            <Field type={field.type} id={field.name} name={field.name} />
            <ErrorMessage name={field.name} component="div" className="error" />
          </div>
        ))}

        <div style={{ marginBottom: 15 }}>
          <label htmlFor="description">Description</label>
          <Field as="textarea" id="description" name="description" />
          <ErrorMessage name="description" component="div" className="error" />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label htmlFor="status">Status</label>
          <Field as="select" id="status" name="status">
            <option value="">Select status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </Field>
          <ErrorMessage name="status" component="div" className="error" />
        </div>

        <button type="submit">
          {initialValues ? "Update" : "Create"} Loan Product
        </button>
      </Form>
    </Formik>
  );
};

export default LoanForm;
