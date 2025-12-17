import { useParams } from "react-router-dom";
import { useState } from "react";
import api from "../api/api";

export default function ReinstatePolicy() {
  const { policyNumber } = useParams();
  const [reinstateDate, setReinstateDate] = useState("");

  const reinstate = async () => {
    await api.post(`/api/policies/${policyNumber}/reinstate`, {
      reinstateDate,
      reason: "PAYMENT_RECEIVED"
    });
    alert("Policy Reinstated");
  };

  return (
    <div>
      <h2>Reinstate Policy</h2>
      <input type="date" onChange={e => setReinstateDate(e.target.value)} />
      <button onClick={reinstate}>Reinstate</button>
    </div>
  );
}
