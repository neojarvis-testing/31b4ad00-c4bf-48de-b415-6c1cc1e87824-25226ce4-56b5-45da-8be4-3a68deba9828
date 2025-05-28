// LoanForm.js
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoanForm = ({ initialValues, loanToEdit, setLoans }) => {
  // Form validation schema using Yup
  const validationSchema = Yup.object({
    loanType: Yup.string().required("Loan type is required"),
    description: Yup.string().required("Description is required"),
    interestRate: Yup.number()
      .required("Interest rate is required")
      .min(0, "Interest rate cannot be negative"),
    maximumAmount: Yup.number()
      .required("Maximum amount is required")
      .min(1, "Maximum amount must be greater than 0"),
    minimumAmount: Yup.number()
      .required("Minimum amount is required")
      .min(1, "Minimum amount must be greater than 0")
      .max(
        Yup.ref("maximumAmount"),
        "Minimum amount cannot be greater than maximum amount"
      ),
    minimumTenureMonths: Yup.number()
      .required("Minimum tenure in months is required")
      .min(1, "Minimum tenure must be at least 1 month"),
    maximumTenureMonths: Yup.number()
      .required("Maximum tenure in months is required")
      .min(
        Yup.ref("minimumTenureMonths"),
        "Maximum tenure cannot be less than minimum tenure"
      )
      .max(360, "Maximum tenure cannot exceed 360 months"),
    processingFee: Yup.number()
      .required("Processing fee is required")
      .min(0, "Processing fee cannot be negative"),
    prepaymentPenalty: Yup.number()
      .required("Prepayment penalty is required")
      .min(0, "Prepayment penalty cannot be negative"),
    gracePeriodMonths: Yup.number()
      .required("Grace period in months is required")
      .min(0, "Grace period cannot be negative"),
    latePaymentFee: Yup.number()
      .required("Late payment fee is required")
      .min(0, "Late payment fee cannot be negative"),
  });

  const handleSubmit = (values) => {
    if (loanToEdit) {
      // Edit the existing loan
      setLoans((prevLoans) =>
        prevLoans.map((loan) =>
          loan.id === loanToEdit.id ? { ...loan, ...values } : loan
        )
      );
    } else {
      // Add a new loan
      setLoans((prevLoans) => [...prevLoans, { ...values, id: Date.now() }]);
    }
  };

  return (
    <div>
      <h1>{loanToEdit ? "Edit Loan" : "Add New Loan"}</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label htmlFor="loanType">Loan Type</label>
            <Field type="text" id="loanType" name="loanType" />
            <ErrorMessage name="loanType" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <Field type="text" id="description" name="description" />
            <ErrorMessage
              name="description"
              component="div"
              className="error"
            />
          </div>

          <div>
            <label htmlFor="interestRate">Interest Rate (%)</label>
            <Field type="number" id="interestRate" name="interestRate" />
            <ErrorMessage
              name="interestRate"
              component="div"
              className="error"
            />
          </div>

          <div>
            <label htmlFor="maximumAmount">Maximum Amount</label>
            <Field type="number" id="maximumAmount" name="maximumAmount" />
            <ErrorMessage
              name="maximumAmount"
              component="div"
              className="error"
            />
          </div>

          <div>
            <label htmlFor="minimumAmount">Minimum Amount</label>
            <Field type="number" id="minimumAmount" name="minimumAmount" />
            <ErrorMessage
              name="minimumAmount"
              component="div"
              className="error"
            />
          </div>

          <div>
            <label htmlFor="minimumTenureMonths">Minimum Tenure (Months)</label>
            <Field
              type="number"
              id="minimumTenureMonths"
              name="minimumTenureMonths"
            />
            <ErrorMessage
              name="minimumTenureMonths"
              component="div"
              className="error"
            />
          </div>

          <div>
            <label htmlFor="maximumTenureMonths">Maximum Tenure (Months)</label>
            <Field
              type="number"
              id="maximumTenureMonths"
              name="maximumTenureMonths"
            />
            <ErrorMessage
              name="maximumTenureMonths"
              component="div"
              className="error"
            />
          </div>

          <div>
            <label htmlFor="processingFee">Processing Fee</label>
            <Field type="number" id="processingFee" name="processingFee" />
            <ErrorMessage
              name="processingFee"
              component="div"
              className="error"
            />
          </div>

          <div>
            <label htmlFor="prepaymentPenalty">Prepayment Penalty</label>
            <Field
              type="number"
              id="prepaymentPenalty"
              name="prepaymentPenalty"
            />
            <ErrorMessage
              name="prepaymentPenalty"
              component="div"
              className="error"
            />
          </div>

          <div>
            <label htmlFor="gracePeriodMonths">Grace Period (Months)</label>
            <Field
              type="number"
              id="gracePeriodMonths"
              name="gracePeriodMonths"
            />
            <ErrorMessage
              name="gracePeriodMonths"
              component="div"
              className="error"
            />
          </div>

          <div>
            <label htmlFor="latePaymentFee">Late Payment Fee</label>
            <Field type="number" id="latePaymentFee" name="latePaymentFee" />
            <ErrorMessage
              name="latePaymentFee"
              component="div"
              className="error"
            />
          </div>

          <div>
            <button type="submit">Submit</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default LoanForm;
