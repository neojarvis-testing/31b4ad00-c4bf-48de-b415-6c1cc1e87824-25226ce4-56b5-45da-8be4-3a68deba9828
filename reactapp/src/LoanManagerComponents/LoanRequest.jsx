import React, { useState, useMemo } from "react";
import { useFormik } from "formik";
import "./LoanRequest.css"; // Optional: for custom styling
import LoanManagerNavbar from "./LoanManagerNavbar";

const mockLoanData = [
  {
    loanApplicationId: "LA001",
    applicationDate: "2025-05-20",
    loanAmount: 100000,
    tenureMonths: 12,
    applicationStatus: "Pending",
    employmentStatus: "Employed",
    annualIncome: 500000,
    remarks: "Good profile",
    proof: "proof.pdf",
    accountHolder: "John Doe",
    accountNumber: "1234567890",
    ifscCode: "IFSC0001",
    loanType: "Personal",
  },
  {
    loanApplicationId: "LA002",
    applicationDate: "2025-05-15",
    loanAmount: 250000,
    tenureMonths: 24,
    applicationStatus: "Approved",
    employmentStatus: "Self-Employed",
    annualIncome: 800000,
    remarks: "",
    proof: "proof2.pdf",
    accountHolder: "Jane Smith",
    accountNumber: "0987654321",
    ifscCode: "IFSC0002",
    loanType: "Business",
  },
  // Add more mock data as needed
];

const LoanRequest = () => {
  const [loans, setLoans] = useState(mockLoanData);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLoan, setSelectedLoan] = useState(null);

  const pageSize = 5;

  const formik = useFormik({
    initialValues: {
      status: "",
      loanType: "",
    },
    onSubmit: (values) => {
      const filtered = mockLoanData.filter((loan) => {
        return (
          (!values.status || loan.applicationStatus === values.status) &&
          (!values.loanType || loan.loanType === values.loanType)
        );
      });
      setLoans(filtered);
      setCurrentPage(1);
    },
  });

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  const sortedLoans = useMemo(() => {
    if (!sortField) return loans;
    return [...loans].sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [loans, sortField, sortOrder]);

  const paginatedLoans = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedLoans.slice(start, start + pageSize);
  }, [sortedLoans, currentPage]);

  const totalPages = Math.ceil(loans.length / pageSize);

  const handleApproveReject = (id, status) => {
    const updated = loans.map((loan) =>
      loan.loanApplicationId === id
        ? { ...loan, applicationStatus: status }
        : loan
    );
    setLoans(updated);
  };

  return (
    <>
      <LoanManagerNavbar />
      <div style={{ padding: "20px" }}>
        <h2>Loan Request Management</h2>

        <form onSubmit={formik.handleSubmit} style={{ marginBottom: "20px" }}>
          <label>Status:&nbsp;</label>
          <select
            name="status"
            onChange={formik.handleChange}
            value={formik.values.status}
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          &nbsp;&nbsp;&nbsp;
          <label>Loan Type:&nbsp;</label>
          <select
            name="loanType"
            onChange={formik.handleChange}
            value={formik.values.loanType}
          >
            <option value="">All</option>
            <option value="Personal">Personal</option>
            <option value="Business">Business</option>
            <option value="Education">Education</option>
          </select>
          &nbsp;&nbsp;
          <button type="submit">Search</button>
        </form>

        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th onClick={() => handleSort("loanApplicationId")}>ID</th>
              <th onClick={() => handleSort("applicationDate")}>Date</th>
              <th onClick={() => handleSort("loanAmount")}>Amount</th>
              <th>Tenure</th>
              <th>Status</th>
              <th>Employment</th>
              <th>Income</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedLoans.map((loan) => (
              <tr key={loan.loanApplicationId}>
                <td>{loan.loanApplicationId}</td>
                <td>{loan.applicationDate}</td>
                <td>{loan.loanAmount}</td>
                <td>{loan.tenureMonths}</td>
                <td>{loan.applicationStatus}</td>
                <td>{loan.employmentStatus}</td>
                <td>{loan.annualIncome}</td>
                <td>
                  <button onClick={() => setSelectedLoan(loan)}>View</button>
                  &nbsp;
                  <button
                    onClick={() =>
                      handleApproveReject(loan.loanApplicationId, "Approved")
                    }
                  >
                    Approve
                  </button>
                  &nbsp;
                  <button
                    onClick={() =>
                      handleApproveReject(loan.loanApplicationId, "Rejected")
                    }
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: "10px" }}>
          Page: {currentPage} / {totalPages}
          &nbsp;
          <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}>
            Prev
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          >
            Next
          </button>
        </div>

        {selectedLoan && (
          <div className="modal">
            <div className="modal-content">
              <h3>Loan Details</h3>
              <p>
                <strong>Application ID:</strong>{" "}
                {selectedLoan.loanApplicationId}
              </p>
              <p>
                <strong>Date:</strong> {selectedLoan.applicationDate}
              </p>
              <p>
                <strong>Loan Amount:</strong> ₹{selectedLoan.loanAmount}
              </p>
              <p>
                <strong>Tenure:</strong> {selectedLoan.tenureMonths} months
              </p>
              <p>
                <strong>Status:</strong> {selectedLoan.applicationStatus}
              </p>
              <p>
                <strong>Employment:</strong> {selectedLoan.employmentStatus}
              </p>
              <p>
                <strong>Annual Income:</strong> ₹{selectedLoan.annualIncome}
              </p>
              <p>
                <strong>Remarks:</strong> {selectedLoan.remarks}
              </p>
              <p>
                <strong>Proof:</strong> {selectedLoan.proof}
              </p>
              <p>
                <strong>Account Holder:</strong> {selectedLoan.accountHolder}
              </p>
              <p>
                <strong>Account No:</strong> {selectedLoan.accountNumber}
              </p>
              <p>
                <strong>IFSC Code:</strong> {selectedLoan.ifscCode}
              </p>
              <button onClick={() => setSelectedLoan(null)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LoanRequest;
