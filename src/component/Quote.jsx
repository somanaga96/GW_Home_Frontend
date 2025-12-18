import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";
import "./css/quote.css";

export default function Quote() {
  const { submissionNumber } = useParams();
  const navigate = useNavigate();

  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  // ---------------- Load Quote ----------------
  useEffect(() => {
    const loadQuote = async () => {
      try {
        // Create quote if not exists
        await api.post(`/api/quotes/submission/${submissionNumber}`);
      } catch (e) {
        // ignore if already quoted
      }

      const res = await api.get(
        `/api/quotes/submission/${submissionNumber}`
      );
      setQuote(res.data);
      setLoading(false);
    };

    loadQuote();
  }, [submissionNumber]);

  if (loading) return <div>Loading quote...</div>;
  if (!quote) return <div>No quote available</div>;

  return (
    <div className="quote-container">

      {/* HEADER */}
      <div className="quote-header">
        <h2>Quote</h2>
        <div>
          <button onClick={() => navigate(-1)}>Back</button>
          <button
  onClick={() =>
    navigate(`/submission/${submissionNumber}/policy-review`)
  }
>
  Next
</button>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="quote-summary">
        <div className="quote-summary-row">
          <label>Total Policy Premium (incl IPT)</label>
          <span>£{quote.totalPremium}</span>
        </div>

        <div className="quote-summary-row">
          <label>Buildings Sum Insured</label>
          <span>{quote.buildingsSumInsured || "Unlimited"}</span>
        </div>

        <div className="quote-summary-row">
          <label>Contents Sum Insured</label>
          <span>£{quote.contentsSumInsured}</span>
        </div>
      </div>

      {/* DETAILS */}
      <div className="quote-details">

        <div className="quote-block">
          <h3>Offering</h3>
          <input value={quote.offering} disabled />
        </div>

        <div className="quote-block">
          <h3>Claims Free Years</h3>
          <div className="quote-summary-row">
            <label>Buildings</label>
            <span>{quote.claimFreeBuildingsYears}</span>
          </div>
          <div className="quote-summary-row">
            <label>Contents</label>
            <span>{quote.claimFreeContentsYears}</span>
          </div>
        </div>

        <div className="quote-block">
          <h3>Excess</h3>
          <div className="quote-summary-row">
            <label>Total Property Excess</label>
            <span>£{quote.totalPropertyExcess}</span>
          </div>
          <div className="quote-summary-row">
            <label>Compulsory Excess</label>
            <span>£{quote.compulsoryExcess}</span>
          </div>
          <div className="quote-summary-row">
            <label>Voluntary Excess</label>
            <span>£{quote.voluntaryExcess}</span>
          </div>
        </div>

      </div>

    </div>
  );
}
