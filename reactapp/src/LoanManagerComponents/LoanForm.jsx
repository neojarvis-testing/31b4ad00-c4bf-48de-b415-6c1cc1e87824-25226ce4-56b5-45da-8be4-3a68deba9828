import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import LoanManagerNavbar from "./LoanManagerNavbar";
import { getLoanById, addLoan, updateLoan } from "../apiConfig";

const validationSchema = Yup.object({
  loanType: Yup.string().required("Loan type is required"),
  interestRate: Yup.number().min(0).required("Interest rate is required"),
  minAmount: Yup.number().min(0).required("Minimum loan amount is required"),
  maxAmount: Yup.number()
    .min(Yup.ref("minAmount"), "Max must be greater than or equal to min")
    .required("Maximum loan amount is required"),
  minTenureMonths: Yup.number().min(1).required("Minimum tenure is required"),
  maxTenureMonths: Yup.number()
    .min(Yup.ref("minTenureMonths"), "Max must be greater than or equal to min")
    .required("Maximum tenure is required"),
  description: Yup.string().required("Description is required"),
  status: Yup.string().required("Status is required"),
  processingFee: Yup.number().min(0).required("Processing fee is required"),
  prepaymentPenalty: Yup.number()
    .min(0)
    .required("Prepayment penalty is required"),
  gracePeriodMonths: Yup.number().min(0).required("Grace period is required"),
  latePaymentFee: Yup.number().min(0).required("Late payment fee is required"),
});

const LoanForm = () => {

  const { loanId } = useParams();
  // console.log(loanId)
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt_token");

  const [initialValues, setInitialValues] = useState({
    loanType: "",
    interestRate: "",
    minAmount: "",
    maxAmount: "",
    minTenureMonths: "",
    maxTenureMonths: "",
    description: "",
    status: "",
    processingFee: "",
    prepaymentPenalty: "",
    gracePeriodMonths: "",
    latePaymentFee: "",
  });

  const [loading, setLoading] = useState(!!loanId);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loanId) return;

    const fetchLoan = async () => {
      try {
        const response = await getLoanById(loanId, token);
        setInitialValues(response.data);
      } catch (err) {
        setError("Failed to load loan data");
      } finally {
        setLoading(false);
      }
    };

    fetchLoan();
  }, [loanId, token]);

  const handleSubmit = async (values) => {
    try {
      if (loanId) {
        await updateLoan(loanId, values, token);
      } else {
        console.log(values, token)
        await addLoan(values, token);
      }
      navigate("/loans");
    } catch {
      alert("Failed to save loan");
    }
  };

  if (loading) return <p>Loading loan data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <LoanManagerNavbar />
      <div style={{ padding: "20px", maxWidth: "700px", margin: "auto" }}>
        <h2>{loanId ? "Edit Loan Product" : "Add Loan Product"}</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          <Form>
            {[
              { name: "loanType", label: "Loan Type", type: "text" },
              {
                name: "interestRate",
                label: "Interest Rate (%)",
                type: "number",
              },
              {
                name: "minAmount",
                label: "Minimum Loan Amount",
                type: "number",
              },
              {
                name: "maxAmount",
                label: "Maximum Loan Amount",
                type: "number",
              },
              {
                name: "minTenureMonths",
                label: "Minimum Tenure (Months)",
                type: "number",
              },
              {
                name: "maxTenureMonths",
                label: "Maximum Tenure (Months)",
                type: "number",
              },
              {
                name: "processingFee",
                label: "Processing Fee",
                type: "number",
              },
              {
                name: "prepaymentPenalty",
                label: "Prepayment Penalty",
                type: "number",
              },
              {
                name: "gracePeriodMonths",
                label: "Grace Period (Months)",
                type: "number",
              },
              {
                name: "latePaymentFee",
                label: "Late Payment Fee",
                type: "number",
              },
            ].map((field) => (
              <div key={field.name} style={{ marginBottom: 15 }}>
                <label htmlFor={field.name}>{field.label}</label>
                <Field type={field.type} id={field.name} name={field.name} />
                <ErrorMessage
                  name={field.name}
                  component="div"
                  className="error"
                />
              </div>
            ))}

            <div style={{ marginBottom: 15 }}>
              <label htmlFor="description">Description</label>
              <Field as="textarea" id="description" name="description" />
              <ErrorMessage
                name="description"
                component="div"
                className="error"
              />
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
              {loanId ? "Update" : "Create"} Loan Product
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
};




export default LoanForm;
