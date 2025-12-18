import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";
import "./css/policy-review.css";

export default function PolicyReview() {
  const { submissionNumber } = useParams();
  const navigate = useNavigate();

  const [quote, setQuote] = useState(null);
  const [submission, setSubmission] = useState(null);

  useEffect(() => {
    api.get(`/api/quotes/submission/${submissionNumber}`)
      .then(res => setQuote(res.data));

    api.get(`/api/submissions/${submissionNumber}`)
      .then(res => setSubmission(res.data));
  }, [submissionNumber]);

  if (!quote || !submission) return <div>Loading...</div>;

  return (
    <div className="policy-review-container">

      {/* HEADER */}
      <div className="policy-review-header">
        <h2>Policy Review</h2>
        <div>
          <button onClick={() => navigate(-1)}>Back</button>
          <button onClick={() => navigate(`/submission/${submissionNumber}/payment`)}>
            Next
          </button>
          <button>Save Draft</button>
        </div>
      </div>

      <div className="policy-review-columns">

        {/* LEFT COLUMN */}
        <div className="policy-review-column">

          <div className="policy-review-section">
            <h3>Policy Details</h3>

            <div className="policy-review-row">
              <label>Primary Named Insured</label>
              <span>{submission.primaryInsuredName || "Fgji Dghiu"}</span>
            </div>

            <div className="policy-review-row">
              <label>Risk Address</label>
              <span>{submission.riskAddress || "4-5 Market Square, BROMLEY, Kent BR1 1NA"}</span>
            </div>

            <div className="policy-review-row">
              <label>Cover Start Date</label>
              <span>{submission.coverStartDate}</span>
            </div>

            <div className="policy-review-row">
              <label>Expiration Date</label>
              <span>16/11/2026</span>
            </div>
          </div>

          <div className="policy-review-section">
            <h3>Excess</h3>

            <div className="policy-review-row">
              <label>Total Property Excess</label>
              <span>£{quote.totalPropertyExcess}</span>
            </div>

            <div className="policy-review-row">
              <label>Compulsory Excess</label>
              <span>£{quote.compulsoryExcess}</span>
            </div>

            <div className="policy-review-row">
              <label>Voluntary Excess</label>
              <span>£{quote.voluntaryExcess}</span>
            </div>
          </div>

          <div className="policy-review-section">
            <h3>Subsidence Excess</h3>

            <div className="policy-review-row">
              <label>Total Subsidence Excess</label>
              <span>£{quote.subsidenceExcess}</span>
            </div>
          </div>

          <div className="policy-review-section">
            <h3>Escape of Water Excess</h3>

            <div className="policy-review-row">
              <label>Total Escape of Water Excess</label>
              <span>£{quote.escapeOfWaterExcess}</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="policy-review-column">

          <div className="policy-review-section highlight">
            <h3>Total Policy Premium (Incl IPT)</h3>
            <div className="policy-review-premium">
              £{quote.totalPremium}
            </div>
          </div>

          <div className="policy-review-section">
            <h3>Taxes</h3>
            <div className="policy-review-row">
              <label>IPT</label>
              <span>£45.19</span>
            </div>
          </div>

          <div className="policy-review-section">
            <h3>Fees and Charges</h3>

            <div className="policy-review-row">
              <label>Admin Fee (Digital)</label>
              <span>£0.00</span>
            </div>

            <div className="policy-review-row">
              <label>Admin Fee (Phone)</label>
              <span>£16.80</span>
            </div>

            <div className="policy-review-row">
              <label>Cancellation Fee</label>
              <span>£24.64</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
