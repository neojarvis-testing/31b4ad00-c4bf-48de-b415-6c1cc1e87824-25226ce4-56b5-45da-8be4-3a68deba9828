import React, { useState } from "react";
import LoanManagerNavbar from "./LoanManagerNavbar";

// Mock feedback + user data
const mockFeedbacks = [
  {
    id: 1,
    date: "2025-05-29",
    feedback: "Great loan disbursement experience.",
    userId: "U001",
  },
  {
    id: 2,
    date: "2025-05-28",
    feedback: "Support team was helpful.",
    userId: "U002",
  },
];

const fetchUserById = (id) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        name: id === "U001" ? "John Doe" : "Jane Smith",
        email: id.toLowerCase() + "@example.com",
        phone: "9876543210",
      });
    }, 300);
  });

const ViewFeedBack = () => {
  const [feedbacks] = useState(mockFeedbacks); // or empty array to test "no feedback"
  const [selectedUser, setSelectedUser] = useState(null);

  const handleViewUser = async (userId) => {
    const user = await fetchUserById(userId);
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  return (
    <>
      <LoanManagerNavbar />
      <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
        <h2>Customer Feedbacks</h2>

        {feedbacks.length === 0 ? (
          <p>No feedbacks found.</p>
        ) : (
          <table
            border="1"
            cellPadding="10"
            style={{ width: "100%", marginTop: 20 }}
          >
            <thead>
              <tr>
                <th>Serial No</th>
                <th>Date</th>
                <th>Feedback</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((fb, index) => (
                <tr key={fb.id}>
                  <td>{index + 1}</td>
                  <td>{fb.date}</td>
                  <td>{fb.feedback}</td>
                  <td>
                    <button onClick={() => handleViewUser(fb.userId)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Modal */}
        {selectedUser && (
          <div style={modalStyles.overlay}>
            <div style={modalStyles.modal}>
              <h3>User Details</h3>
              <p>
                <strong>Name:</strong> {selectedUser.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedUser.phone}
              </p>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

// CSS-in-JS styles
const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    backdropFilter: "blur(5px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px 30px",
    borderRadius: 8,
    minWidth: "300px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
  },
};

export default ViewFeedBack;
