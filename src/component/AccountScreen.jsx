import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAccount } from "../api/api";
import "./accountScreen.css";

export default function AccountScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);

  useEffect(() => {
    getAccount(id).then(setAccount);
  }, [id]);

  if (!account) return <p style={{ padding: "20px" }}>Loading account...</p>;

  // ➤ Create Quote → navigate to policy info screen
 const goToPolicyInfo = (accountId) => {
  navigate(`/policyinfo/${accountId}`);
};


  return (
    <div className="account-wrapper">

      {/* ⭐ Breadcrumb ⭐ */}
      <div className="breadcrumb">
        <span onClick={() => navigate("/")}>Home</span> {" / "}
        <span onClick={() => navigate("/")}>Accounts</span> {" / "}
        <span className="active">Account Summary</span>
      </div>

      {/* Top Header */}
      <div className="header-row">
        <h1>Account Summary</h1>

        {/* ⭐ Create Quote Button ⭐ */}
        <button className="btn-quote" onClick={() => goToPolicyInfo(account.id)}>
          Create Quote
        </button>
      </div>

      <p className="subtext">Account ID: {account.id}</p>

      <div className="info-section">

        <h3>Personal Details</h3>
        <div className="row">
          <label>Brand Name</label>
          <span>{account.brandName}</span>
        </div>

        <div className="row">
          <label>First Name</label>
          <span>{account.firstName}</span>
        </div>

        <div className="row">
          <label>Last Name</label>
          <span>{account.lastName}</span>
        </div>

        <div className="row">
          <label>Date of Birth</label>
          <span>{account.dateOfBirth}</span>
        </div>

        <h3>Address Details</h3>

        <div className="row">
          <label>Postcode</label>
          <span>{account.postcode}</span>
        </div>

        <div className="row">
          <label>Address</label>
          <span>{account.address}</span>
        </div>

        <h3>Other Information</h3>

        <div className="row">
          <label>Quote Ref ID</label>
          <span>{account.quoteRefId || "N/A"}</span>
        </div>
      </div>
    </div>
  );
}
