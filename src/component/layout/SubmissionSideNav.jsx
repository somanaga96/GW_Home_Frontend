import { useNavigate, useLocation, useParams } from "react-router-dom";
import "../css/submission-sidenav.css";

export default function SubmissionSideNav() {
  const { submissionNumber } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ FIX: use startsWith instead of ===
  const isActive = (path) =>
    location.pathname.startsWith(
      `/submission/${submissionNumber}${path}`
    );

  return (
    <aside className="submission-sidenav">
      <div className="nav-title">Policy Contract</div>

      <button
        className={isActive("") ? "active" : ""}
        onClick={() => navigate(`/submission/${submissionNumber}`)}
      >
        Policy Info
      </button>

      <button
        className={isActive("/home") ? "active" : ""}
        onClick={() => navigate(`/submission/${submissionNumber}/home`)}
      >
        Home
      </button>

      <button
        className={isActive("/claims") ? "active" : ""}
        onClick={() => navigate(`/submission/${submissionNumber}/claims`)}
      >
        Claims
      </button>

      <button
        className={isActive("/quote") ? "active" : ""}
        onClick={() => navigate(`/submission/${submissionNumber}/quote`)}
      >
        Quote
      </button>

      {/* ✅ ADD THESE */}
      <button
        className={isActive("/policy-review") ? "active" : ""}
        onClick={() =>
          navigate(`/submission/${submissionNumber}/policy-review`)
        }
      >
        Policy Review
      </button>

      <button
        className={isActive("/payment") ? "active" : ""}
        onClick={() =>
          navigate(`/submission/${submissionNumber}/payment`)
        }
      >
        Payment
      </button>
    </aside>
  );
}
