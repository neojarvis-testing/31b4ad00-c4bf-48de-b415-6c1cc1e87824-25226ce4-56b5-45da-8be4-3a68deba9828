import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import LoanManagerNavbar from "./LoanManagerNavbar";

const LoanRequest = () => {
  const [allLoans, setAllLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ status: "", loanType: "" });

  const pageSize = 5;

  const fetchLoans = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/loans"); // 🔁 Replace with actual API
      setAllLoans(response.data);
      setFilteredLoans(response.data);
    } catch (error) {
      console.error("Failed to fetch loans:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  // Auto-filter on filter change
  useEffect(() => {
    const filtered = allLoans.filter((loan) => {
      return (
        (!filters.status || loan.applicationStatus === filters.status) &&
        (!filters.loanType || loan.loanType === filters.loanType)
      );
    });
    setFilteredLoans(filtered);
    setCurrentPage(1);
  }, [filters, allLoans]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  const sortedLoans = useMemo(() => {
    if (!sortField) return filteredLoans;
    return [...filteredLoans].sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredLoans, sortField, sortOrder]);

  const paginatedLoans = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedLoans.slice(start, start + pageSize);
  }, [sortedLoans, currentPage]);

  const totalPages = Math.ceil(filteredLoans.length / pageSize);

  const handleApproveReject = async (id, status) => {
    try {
      await axios.patch(`/api/loans/${id}/status`, { status }); // 🔁 Replace with your API
      fetchLoans(); // Refresh list
    } catch (error) {
      console.error("Failed to update loan status:", error);
    }
  };

  return (
    <>
      <LoanManagerNavbar />
      <div style={{ padding: "20px" }}>
        <h2>Loan Request Management</h2>

        {/* Filter Controls */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          <label>
            Status:&nbsp;
            <select
              name="status"
              onChange={handleFilterChange}
              value={filters.status}
            >
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </label>

          <label>
            Loan Type:&nbsp;
            <select
              name="loanType"
              onChange={handleFilterChange}
              value={filters.loanType}
            >
              <option value="">All</option>
              <option value="Personal">Personal</option>
              <option value="Business">Business</option>
              <option value="Education">Education</option>
            </select>
          </label>
        </div>

        {loading ? (
          <p>Loading loan applications...</p>
        ) : (
          <>
            <table
              border="1"
              cellPadding="10"
              cellSpacing="0"
              style={{ width: "100%" }}
            >
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
                    <td>₹{loan.loanAmount}</td>
                    <td>{loan.tenureMonths}</td>
                    <td>{loan.applicationStatus}</td>
                    <td>{loan.employmentStatus}</td>
                    <td>₹{loan.annualIncome}</td>
                    <td>
                      <button onClick={() => setSelectedLoan(loan)}>
                        View
                      </button>
                      &nbsp;
                      <button
                        onClick={() =>
                          handleApproveReject(
                            loan.loanApplicationId,
                            "Approved"
                          )
                        }
                      >
                        Approve
                      </button>
                      &nbsp;
                      <button
                        onClick={() =>
                          handleApproveReject(
                            loan.loanApplicationId,
                            "Rejected"
                          )
                        }
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
                {paginatedLoans.length === 0 && (
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center" }}>
                      No loan applications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div style={{ marginTop: "10px" }}>
              Page: {currentPage} / {totalPages || 1}
              &nbsp;
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Loan Detail Modal */}
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
                <strong>Remarks:</strong> {selectedLoan.remarks || "-"}
              </p>
              <p>
                <strong>Proof:</strong> {selectedLoan.proof}
              </p>
              <p>
                <strong>Account Holder:</strong> {selectedLoan.accountHolder}
              </p>
              <p>
                <strong>Account Number:</strong> {selectedLoan.accountNumber}
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
