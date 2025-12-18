import { useParams, useNavigate } from "react-router-dom";
import "./css/policy-bound.css";

export default function PolicyBound() {
  const { policyNumber } = useParams();
  const navigate = useNavigate();

  return (
    <div className="policy-bound-container">

      {/* HEADER */}
      <div className="policy-bound-header">
        <h2>Policy Change Bound</h2>
      </div>

      {/* MESSAGE */}
      <div className="policy-bound-message">
        <p>
          Your policy <strong>{policyNumber}</strong> has been successfully bound.
        </p>
      </div>

      {/* ACTION LINKS */}
      <div className="policy-bound-actions">
        <button
          className="link-btn"
          onClick={() => navigate(`/policy/${policyNumber}`)}
        >
          View your policy
        </button>

        <button
          className="link-btn"
          onClick={() => navigate(`/policy/${policyNumber}/review`)}
        >
          Review changes
        </button>

        <button
          className="link-btn"
          onClick={() => navigate("/")}
        >
          Go to your desktop
        </button>
      </div>

    </div>
  );
}
