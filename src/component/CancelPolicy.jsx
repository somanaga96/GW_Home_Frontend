import { useParams } from "react-router-dom";
import { useState } from "react";
import api from "../api/api";

export default function CancelPolicy() {
  const { policyNumber } = useParams();
  const [cancelDate, setCancelDate] = useState("");

  const cancel = async () => {
    await api.post(`/api/policies/${policyNumber}/cancel`, {
      cancelDate,
      reason: "CUSTOMER_REQUEST",
      cancelType: "PRO_RATA"
    });
    alert("Policy Cancelled");
  };

  return (
    <div>
      <h2>Cancel Policy</h2>
      <input type="date" onChange={e => setCancelDate(e.target.value)} />
      <button onClick={cancel}>Cancel</button>
    </div>
  );
}
