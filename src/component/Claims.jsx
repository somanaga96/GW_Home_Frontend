import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/api";
import "./css/claims.css";

export default function Claims() {
  const { submissionNumber } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    anyClaimsIn5Years: "",
    anyOutstandingClaims: "",
    claimFreeBuildingsYears: "",
    claimFreeContentsYears: ""
  });

  const [errors, setErrors] = useState({});

  // ---------------- Validation ----------------
  const validate = () => {
    const e = {};

    if (form.anyClaimsIn5Years === "")
      e.anyClaimsIn5Years = "Required";

    if (form.anyOutstandingClaims === "")
      e.anyOutstandingClaims = "Required";

    if (!form.claimFreeBuildingsYears)
      e.claimFreeBuildingsYears = "Required";

    if (!form.claimFreeContentsYears)
      e.claimFreeContentsYears = "Required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ---------------- Save ----------------
  const save = async () => {
    if (!validate()) return;

    const payload = {
      ...form,
      submissionNumber
    };

    await api.post(`/api/claims/submission/${submissionNumber}`, payload);

    navigate(`/submission/${submissionNumber}/quote`);
  };

  return (
    <div className="claims-container">

      {/* HEADER */}
      <div className="claims-header">
        <h2>Claims</h2>
        <div>
          <button onClick={() => navigate(-1)}>Back</button>
          <button onClick={save}>Quote</button>
        </div>
      </div>

      {/* ===== CLAIMS SUMMARY ===== */}
      <div className="claims-section">

        <div className="claims-row">
          <label>
            In the last 5 years, have you or anyone living with you had any claims or losses? *
          </label>
          <select
            value={form.anyClaimsIn5Years}
            onChange={e =>
              setForm({ ...form, anyClaimsIn5Years: e.target.value === "true" })
            }
          >
            <option value="">&#60;none&#62;</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          {errors.anyClaimsIn5Years && (
            <span className="err">{errors.anyClaimsIn5Years}</span>
          )}
        </div>

        <div className="claims-row">
          <label>Are any of these claims outstanding? *</label>
          <select
            value={form.anyOutstandingClaims}
            onChange={e =>
              setForm({ ...form, anyOutstandingClaims: e.target.value === "true" })
            }
          >
            <option value="">&#60;none&#62;</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          {errors.anyOutstandingClaims && (
            <span className="err">{errors.anyOutstandingClaims}</span>
          )}
        </div>

        <div className="claims-row">
          <label>
            How many consecutive years have you been claim free on your buildings? *
          </label>
          <select
            value={form.claimFreeBuildingsYears}
            onChange={e =>
              setForm({ ...form, claimFreeBuildingsYears: e.target.value })
            }
          >
            <option value="">&#60;none&#62;</option>
            <option value="1 year">1 year</option>
            <option value="2 years">2 years</option>
            <option value="3 years">3 years</option>
            <option value="5 years">5 years</option>
          </select>
          {errors.claimFreeBuildingsYears && (
            <span className="err">{errors.claimFreeBuildingsYears}</span>
          )}
        </div>

        <div className="claims-row">
          <label>
            How many consecutive years have you been claim free on your contents? *
          </label>
          <select
            value={form.claimFreeContentsYears}
            onChange={e =>
              setForm({ ...form, claimFreeContentsYears: e.target.value })
            }
          >
            <option value="">&#60;none&#62;</option>
            <option value="1 year">1 year</option>
            <option value="2 years">2 years</option>
            <option value="3 years">3 years</option>
            <option value="5 years">5 years</option>
          </select>
          {errors.claimFreeContentsYears && (
            <span className="err">{errors.claimFreeContentsYears}</span>
          )}
        </div>

      </div>
    </div>
  );
}
