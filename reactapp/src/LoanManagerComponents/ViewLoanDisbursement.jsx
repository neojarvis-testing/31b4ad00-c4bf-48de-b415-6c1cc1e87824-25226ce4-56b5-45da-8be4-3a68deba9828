import React, { useState } from "react";
import LoanDisbursementForm from "./LoanDisbursementForm";
import LoanManagerNavbar from "./LoanManagerNavbar";

const PAGE_SIZE = 5;

const mockDisbursements = [
  {
    id: 1,
    disbursementDate: "2025-06-01",
    disbursementAmount: 100000,
    disbursementMethod: "Bank Transfer",
    remarks: "Initial",
    userId: "U001",
    loanId: "L001",
  },
  {
    id: 2,
    disbursementDate: "2025-06-10",
    disbursementAmount: 50000,
    disbursementMethod: "Cash",
    remarks: "Advance",
    userId: "U002",
    loanId: "L002",
  },
  {
    id: 3,
    disbursementDate: "2025-06-12",
    disbursementAmount: 30000,
    disbursementMethod: "Check",
    remarks: "",
    userId: "U003",
    loanId: "L003",
  },
  {
    id: 4,
    disbursementDate: "2025-06-14",
    disbursementAmount: 120000,
    disbursementMethod: "Cash",
    remarks: "Urgent",
    userId: "U004",
    loanId: "L004",
  },
  {
    id: 5,
    disbursementDate: "2025-06-18",
    disbursementAmount: 45000,
    disbursementMethod: "Bank Transfer",
    remarks: "",
    userId: "U005",
    loanId: "L005",
  },
  {
    id: 6,
    disbursementDate: "2025-06-20",
    disbursementAmount: 60000,
    disbursementMethod: "Bank Transfer",
    remarks: "",
    userId: "U006",
    loanId: "L006",
  },
];

const fetchUserById = (id) =>
  new Promise((res) =>
    setTimeout(
      () =>
        res({
          id,
          name: "John Doe",
          email: "john@example.com",
          phone: "9999999999",
        }),
      300
    )
  );

const fetchLoanById = (id) =>
  new Promise((res) =>
    setTimeout(
      () => res({ id, amount: 100000, tenure: 12, status: "Approved" }),
      300
    )
  );

const ViewLoanDisbursement = () => {
  const [disbursements, setDisbursements] = useState(mockDisbursements);
  const [editing, setEditing] = useState(null);
  const [viewUser, setViewUser] = useState(null);
  const [viewLoan, setViewLoan] = useState(null);

  // Pagination & Sorting
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "disbursementDate",
    direction: "asc",
  });

  const sortedDisbursements = [...disbursements].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];

    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const paginatedDisbursements = sortedDisbursements.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const totalPages = Math.ceil(disbursements.length / PAGE_SIZE);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const handleAdd = () => setEditing({});
  const handleEdit = (item) => setEditing(item);

  const handleSave = (formData) => {
    if (editing?.id) {
      setDisbursements((prev) =>
        prev.map((item) =>
          item.id === editing.id ? { ...formData, id: editing.id } : item
        )
      );
    } else {
      const newId = Math.max(...disbursements.map((d) => d.id), 0) + 1;
      setDisbursements([
        ...disbursements,
        { ...formData, id: newId, userId: "U001", loanId: "L001" },
      ]);
    }
    setEditing(null);
  };

  const handleCancel = () => setEditing(null);

  const handleViewUser = async (id) => {
    const data = await fetchUserById(id);
    setViewUser(data);
    setViewLoan(null);
  };

  const handleViewLoan = async (id) => {
    const data = await fetchLoanById(id);
    setViewLoan(data);
    setViewUser(null);
  };

  return (
    <>
      <LoanManagerNavbar />
      <div style={{ padding: 20 }}>
        <h2>Loan Disbursements</h2>
        <button onClick={handleAdd}>Add Disbursement</button>

        {editing && (
          <LoanDisbursementForm
            initialValues={{
              disbursementDate: editing.disbursementDate || "",
              disbursementAmount: editing.disbursementAmount || "",
              disbursementMethod: editing.disbursementMethod || "",
              remarks: editing.remarks || "",
            }}
            onSubmit={handleSave}
            onCancel={handleCancel}
          />
        )}

        <table
          border="1"
          cellPadding="10"
          style={{ marginTop: 20, width: "100%" }}
        >
          <thead>
            <tr>
              <th onClick={() => handleSort("disbursementDate")}>Date</th>
              <th onClick={() => handleSort("disbursementAmount")}>Amount</th>
              <th onClick={() => handleSort("disbursementMethod")}>Method</th>
              <th>Remarks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedDisbursements.map((d) => (
              <tr key={d.id}>
                <td>{d.disbursementDate}</td>
                <td>₹{d.disbursementAmount}</td>
                <td>{d.disbursementMethod}</td>
                <td>{d.remarks}</td>
                <td>
                  <button onClick={() => handleEdit(d)}>Edit</button>
                  &nbsp;
                  <button onClick={() => handleViewUser(d.userId)}>
                    User Details
                  </button>
                  &nbsp;
                  <button onClick={() => handleViewLoan(d.loanId)}>
                    Loan Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div style={{ marginTop: 10 }}>
          Page: {currentPage} / {totalPages}
          &nbsp;
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          &nbsp;
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        {/* View Sections */}
        {viewUser && (
          <div style={{ marginTop: 20, padding: 10, border: "1px solid #ccc" }}>
            <h4>User Details</h4>
            <pre>{JSON.stringify(viewUser, null, 2)}</pre>
          </div>
        )}

        {viewLoan && (
          <div style={{ marginTop: 20, padding: 10, border: "1px solid #ccc" }}>
            <h4>Loan Details</h4>
            <pre>{JSON.stringify(viewLoan, null, 2)}</pre>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewLoanDisbursement;
