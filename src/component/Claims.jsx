import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";

export default function Claims() {
  const { submissionNumber } = useParams();
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    api.get(`/api/claims/submission/${submissionNumber}`)
      .then(res => setClaims(res.data));
  }, [submissionNumber]);

  return (
    <div>
      <h2>Claims</h2>

      {claims.map(c => (
        <div key={c.id}>
          {c.claimType} - {c.claimAmount}
        </div>
      ))}
    </div>
  );
}
