import React, { useState } from "react";
import { saveClaims } from "../api/claimsApi";
import "../component/CSS_Style/claims.css";

export default function Claims() {
  const [form, setForm] = useState({
    anyClaimsIn5Years: "",
    anyOutstandingClaims: "",
    claimFreeBuildingsYears: "",
    claimFreeContentsYears: "",
    claims: []
  });

  const [newClaim, setNewClaim] = useState({
    claimCause: "",
    cover: "",
    dateOfLoss: "",
    value: "",
    sameAddress: false
  });

  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const addClaim = () => {
    setForm((f) => ({
      ...f,
      claims: [...f.claims, newClaim]
    }));
    setNewClaim({
      claimCause: "",
      cover: "",
      dateOfLoss: "",
      value: "",
      sameAddress: false
    });
  };

  const save = async () => {
    const result = await saveClaims(form);
    alert("Saved claim page with ID: " + result.id);
  };

  return (
    <div className="claims-wrapper">
      <h2>Claims</h2>

      {/* MAIN QUESTION */}
      <label>In the last 5 years, have you or anyone living with you had claims?</label>
      <select
        value={form.anyClaimsIn5Years}
        onChange={(e) => setField("anyClaimsIn5Years", e.target.value)}
      >
        <option value="">{"<none>"}</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>

      {/* CLAIM LIST TABLE */}
      <div className="claim-table-container">
        <button className="add-btn" onClick={addClaim}>Add</button>

        <table className="claim-table">
          <thead>
            <tr>
              <th>Claim Cause</th>
              <th>Cover</th>
              <th>Date of Loss</th>
              <th>Value</th>
              <th>Same Address?</th>
            </tr>
          </thead>

          <tbody>
            {form.claims.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No data to display
                </td>
              </tr>
            ) : (
              form.claims.map((c, i) => (
                <tr key={i}>
                  <td>{c.claimCause}</td>
                  <td>{c.cover}</td>
                  <td>{c.dateOfLoss}</td>
                  <td>{c.value}</td>
                  <td>{c.sameAddress ? "Yes" : "No"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* NEW CLAIM FORM */}
        <div className="new-claim">
          <input placeholder="Cause"
            value={newClaim.claimCause}
            onChange={(e) => setNewClaim({ ...newClaim, claimCause: e.target.value })}
          />

          <input placeholder="Cover"
            value={newClaim.cover}
            onChange={(e) => setNewClaim({ ...newClaim, cover: e.target.value })}
          />

          <input type="date"
            value={newClaim.dateOfLoss}
            onChange={(e) => setNewClaim({ ...newClaim, dateOfLoss: e.target.value })}
          />

          <input type="number" placeholder="Value"
            value={newClaim.value}
            onChange={(e) => setNewClaim({ ...newClaim, value: e.target.value })}
          />

          <label>
            <input
              type="checkbox"
              checked={newClaim.sameAddress}
              onChange={(e) =>
                setNewClaim({ ...newClaim, sameAddress: e.target.checked })
              }
            />
            Same Address
          </label>
        </div>
      </div>

      {/* Footer Questions */}
      <label>Are any of these claims outstanding?</label>
      <select
        value={form.anyOutstandingClaims}
        onChange={(e) => setField("anyOutstandingClaims", e.target.value)}
      >
        <option value="">{"<none>"}</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>

      <label>How many years claim-free on buildings?</label>
      <select
        value={form.claimFreeBuildingsYears}
        onChange={(e) => setField("claimFreeBuildingsYears", e.target.value)}
      >
        <option value="">{"<none>"}</option>
        <option value="1 year">1 year</option>
        <option value="2 years">2 years</option>
        <option value="3 years">3 years</option>
      </select>

      <label>How many years claim-free on contents?</label>
      <select
        value={form.claimFreeContentsYears}
        onChange={(e) => setField("claimFreeContentsYears", e.target.value)}
      >
        <option value="">{"<none>"}</option>
        <option value="1 year">1 year</option>
        <option value="2 years">2 years</option>
        <option value="3 years">3 years</option>
      </select>

      <button className="save-btn" onClick={save}>Save</button>
    </div>
  );
}
