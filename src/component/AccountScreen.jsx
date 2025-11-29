import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAccount } from "../api/api";
import { createSubmission } from "../api/submissionApi"; // API FUNCTION
import "./CSS_Style/AccountScreen.css";

export default function AccountScreen() {
  const { id } = useParams();  // always ACCOUNT ID
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);
  // const { account_id } = account.id;

  useEffect(() => {
    getAccount(id).then(setAccount);
  }, [id]);

  if (!account) return <p style={{ padding: "20px" }}>Loading account...</p>;

  // ⭐ CREATE NEW SUBMISSION CORRECT LOGIC
  const handleCreateSubmission = async () => {
    try {
      // const sub = await createSubmission(id);  // backend call
      navigate(`/submission/create/${id}`);       // go to submission screen
    } catch (err) {
      alert("Submission creation failed: " + err.message);
    }
  };

  // ⭐ OPEN EXISTING SUBMISSION
  const openSubmission = (submissionId) => {
    navigate(`/submission/${submissionId}`);
  };

  return (
    <div className="account-wrapper">

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span onClick={() => navigate("/")}>Home</span> {" / "}
        <span onClick={() => navigate("/")}>Accounts</span> {" / "}
        <span className="active">Account Summary</span>
      </div>

      {/* Header */}
      <div className="header-row">
        <h1>Account Summary</h1>

        {/* CREATE SUBMISSION BUTTON */}
        <button className="btn-quote" onClick={handleCreateSubmission}>
          Create Submission
        </button>
      </div>

      <p className="subtext">Account ID: {account.id}</p>

      {/* Account Details */}
      <div className="info-section">
        <h3>Personal Details</h3>
        <div className="row"><label>Brand Name</label><span>{account.brandName}</span></div>
        <div className="row"><label>First Name</label><span>{account.firstName}</span></div>
        <div className="row"><label>Last Name</label><span>{account.lastName}</span></div>
        <div className="row"><label>Date of Birth</label><span>{account.dateOfBirth}</span></div>
        <h3>Address Details</h3>
        <div className="row"><label>Postcode</label><span>{account.postcode}</span></div>
        <div className="row"><label>Address</label><span>{account.address}</span></div>
        <h3>Other Info</h3>
        <div className="row"><label>Quote Ref</label><span>{account.quoteRefId || "N/A"}</span></div>
      </div>

      {/* SUBMISSIONS TABLE */}
      <h2>Submissions</h2>

      <table className="submission-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Submission No</th>
            <th>Status</th>
            <th>Created Date</th>
            <th>Open</th>
          </tr>
        </thead>

        <tbody>
          {account.submissions?.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.submissionNumber}</td>
              <td>{s.status}</td>
              <td>{s.createdDate}</td>
              <td>
                <button onClick={() => openSubmission(s.id)}>Open</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
