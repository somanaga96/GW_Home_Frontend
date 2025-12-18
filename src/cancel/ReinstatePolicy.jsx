import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/api";
import "./css/reinstate-policy.css";

export default function ReinstatePolicy() {
  const { policyNumber } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    reinstateDate: "",
    reason: ""
  });

  const reinstate = async () => {
    await api.post(
      `/api/policies/reinstate/${policyNumber}`,
      form
    );

    alert("Policy Reinstated");
    navigate(`/policy/${policyNumber}`);
  };

  return (
    <div className="reinstate-container">
      <h2>Reinstate Policy</h2>

      <div className="reinstate-row">
        <label>Reinstate Date *</label>
        <input
          type="date"
          onChange={e =>
            setForm({ ...form, reinstateDate: e.target.value })
          }
        />
      </div>

      <div className="reinstate-row">
        <label>Reason *</label>
        <textarea
          onChange={e =>
            setForm({ ...form, reason: e.target.value })
          }
        />
      </div>

      <button className="primary-btn" onClick={reinstate}>
        Reinstate Policy
      </button>
    </div>
  );
}
