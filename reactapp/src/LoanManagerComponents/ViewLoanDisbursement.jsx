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

// Reusable Modal component
const Modal = ({ children, onClose }) => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      backdropFilter: "blur(4px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }}
    onClick={onClose}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        background: "white",
        borderRadius: "8px",
        padding: "20px",
        maxWidth: "600px",
        width: "90%",
        maxHeight: "80vh",
        overflowY: "auto",
        boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
      }}
    >
      {children}
      <button
        onClick={onClose}
        style={{ marginTop: 15, padding: "8px 16px", cursor: "pointer" }}
      >
        Close
      </button>
    </div>
  </div>
);

const ViewLoanDisbursement = () => {
  const [disbursements, setDisbursements] = useState(mockDisbursements);
  const [editing, setEditing] = useState(null);
  const [modalContent, setModalContent] = useState(null);

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

  // Fetch user details and show modal
  const handleViewUser = async (id) => {
    const data = await fetchUserById(id);
    setModalContent(
      <>
        <h3>User Details</h3>
        <p>
          <strong>ID:</strong> {data.id}
        </p>
        <p>
          <strong>Name:</strong> {data.name}
        </p>
        <p>
          <strong>Email:</strong> {data.email}
        </p>
        <p>
          <strong>Phone:</strong> {data.phone}
        </p>
      </>
    );
  };

  // Fetch loan details and show modal
  const handleViewLoan = async (id) => {
    const data = await fetchLoanById(id);
    setModalContent(
      <>
        <h3>Loan Details</h3>
        <p>
          <strong>ID:</strong> {data.id}
        </p>
        <p>
          <strong>Amount:</strong> ₹{data.amount}
        </p>
        <p>
          <strong>Tenure:</strong> {data.tenure} months
        </p>
        <p>
          <strong>Status:</strong> {data.status}
        </p>
      </>
    );
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

        {/* Modal popup */}
        {modalContent && (
          <Modal onClose={() => setModalContent(null)}>{modalContent}</Modal>
        )}
      </div>
    </>
  );
};

export default ViewLoanDisbursement;
