import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/api";
import "./css/cancel-policy.css";

export default function CancelPolicy() {
  const { policyNumber } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    cancelDate: "",
    reason: "",
    cancelType: "PRO_RATA"
  });

  const cancel = async () => {
    await api.post(
      `/api/policies/cancel/${policyNumber}`,
      form
    );

    alert("Policy Cancelled");
    navigate(`/policy/${policyNumber}`);
  };

  return (
    <div className="cancel-container">
      <h2>Cancel Policy</h2>

      <div className="cancel-row">
        <label>Cancellation Date *</label>
        <input
          type="date"
          onChange={e =>
            setForm({ ...form, cancelDate: e.target.value })
          }
        />
      </div>

      <div className="cancel-row">
        <label>Reason *</label>
        <textarea
          onChange={e =>
            setForm({ ...form, reason: e.target.value })
          }
        />
      </div>

      <div className="cancel-row">
        <label>Cancellation Type</label>
        <select
          onChange={e =>
            setForm({ ...form, cancelType: e.target.value })
          }
        >
          <option value="PRO_RATA">Pro Rata</option>
          <option value="FLAT">Flat</option>
        </select>
      </div>

      <button className="danger-btn" onClick={cancel}>
        Cancel Policy
      </button>
    </div>
  );
}
