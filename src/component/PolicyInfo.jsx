import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/api";
import "./css/policy-info.css";

export default function PolicyInfo() {
  const { submissionNumber } = useParams();
  const navigate = useNavigate();

  // ---------------- Editable Fields (GW correct) ----------------
  const [coverStartDate, setCoverStartDate] = useState("2025-11-17");
  const [promoName, setPromoName] = useState("");
  const [promoOverride, setPromoOverride] = useState("");
  const [crossSell, setCrossSell] = useState("NO");
  const [offering, setOffering] = useState("");

  // ---------------- Actions ----------------

  // ✔ Next = Save + Navigate to Home
  const handleNext = async () => {
    try {
      const payload = {
        coverStartDate,
        promoName,
        promoOverride,
        crossSell,
        offering
      };

      // Save Policy Info (job data)
      await api.post(
        `/api/submissions/${submissionNumber}/policy-info`,
        payload
      );

      // Move to Home (Risk)
      navigate(`/submission/${submissionNumber}/home`);
    } catch (err) {
      alert("Failed to save Policy Info");
    }
  };

  // ✔ Save Draft = Save only
  const handleSaveDraft = async () => {
    try {
      const payload = {
        coverStartDate,
        promoName,
        promoOverride,
        crossSell,
        offering
      };

      await api.post(
        `/api/submissions/${submissionNumber}/policy-info`,
        payload
      );

      alert("Draft saved");
    } catch (err) {
      alert("Failed to save draft");
    }
  };

  return (
    <div className="policy-info-container">

      {/* ================= HEADER ================= */}
      <div className="policy-info-header">
        <h2>Policy Info</h2>

        <div className="policy-info-actions">
          <button onClick={handleNext}>Next</button>
          <button onClick={() => navigate(`/submission/${submissionNumber}/quote`)}>
            Quote
          </button>
          <button onClick={handleSaveDraft}>Save Draft</button>
        </div>
      </div>

      {/* ================= TWO COLUMN ================= */}
      <div className="policy-info-columns">

        {/* ========== LEFT COLUMN ========== */}
        <div className="policy-info-column">

          {/* ---- Policy Holder ---- */}
          <div className="policy-info-section">
            <h3>Policy Holder</h3>

            <div className="policy-info-row">
              <label>Quote Reference ID</label>
              <input value={submissionNumber} disabled />
            </div>

            <div className="policy-info-row">
              <label>Brand</label>
              <input value="Privilege" disabled />
            </div>

            <div className="policy-info-row">
              <label>Name</label>
              <input value="Fgji Dghiu" disabled />
            </div>

            <div className="policy-info-row">
              <label>Phone Number</label>
              <input value="07888980989" disabled />
            </div>

            <div className="policy-info-row">
              <label>Account Address</label>
              <textarea
                disabled
                value={`4-5 Market Square
Bromley
Kent
BR1 1NA`}
              />
            </div>
          </div>

          {/* ---- Employment ---- */}
          <div className="policy-info-section">
            <h3>Employment</h3>

            <div className="policy-info-row">
              <label>Status</label>
              <input value="Employed (full time)" disabled />
            </div>

            <div className="policy-info-row">
              <label>Occupation</label>
              <input value="Able Seaman or Woman" disabled />
            </div>

            <div className="policy-info-row">
              <label>Industry</label>
              <input value="Armed Forces - Foreign" disabled />
            </div>
          </div>

        </div>

        {/* ========== RIGHT COLUMN ========== */}
        <div className="policy-info-column">

          {/* ---- Promos ---- */}
          <div className="policy-info-section">
            <h3>Promos and Discounts</h3>

            <div className="policy-info-row">
              <label>Promo Name</label>
              <input
                value={promoName}
                onChange={e => setPromoName(e.target.value)}
              />
            </div>

            <div className="policy-info-row">
              <label>Promo Override</label>
              <input
                value={promoOverride}
                onChange={e => setPromoOverride(e.target.value)}
              />
            </div>

            <div className="policy-info-row">
              <label>Another Privilege policy?</label>
              <div className="policy-info-radio">
                <label>
                  <input
                    type="radio"
                    checked={crossSell === "YES"}
                    onChange={() => setCrossSell("YES")}
                  /> Yes
                </label>
                <label>
                  <input
                    type="radio"
                    checked={crossSell === "NO"}
                    onChange={() => setCrossSell("NO")}
                  /> No
                </label>
              </div>
            </div>
          </div>

          {/* ---- Policy Details ---- */}
          <div className="policy-info-section">
            <h3>Policy Details</h3>

            <div className="policy-info-row">
              <label>Term Type</label>
              <input value="Annual" disabled />
            </div>

            <div className="policy-info-row">
              <label>Cover Start Date *</label>
              <input
                type="date"
                value={coverStartDate}
                onChange={e => setCoverStartDate(e.target.value)}
              />
            </div>

            <div className="policy-info-row">
              <label>Expiration Date</label>
              <input value="16/11/2026" disabled />
            </div>

            <div className="policy-info-row">
              <label>Submission Start Date</label>
              <input value="17/11/2025" disabled />
            </div>
          </div>

          {/* ---- Offering ---- */}
          <div className="policy-info-section">
            <h3>Offerings Selection</h3>

            <div className="policy-info-row">
              <label>What do you want to cover?</label>
              <select
                value={offering}
                onChange={e => setOffering(e.target.value)}
              >
                <option value="">&#60;none&#62;</option>
                <option value="BUILDINGS">Buildings</option>
                <option value="CONTENTS">Contents</option>
                <option value="BOTH">Buildings & Contents</option>
              </select>
            </div>

            <div className="policy-info-row">
              <label>CAIS Enabled?</label>
              <input value="Yes" disabled />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
