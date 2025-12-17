import { useParams, useState } from "react";
import api from "../api/api";

export default function Quote() {
  const { submissionNumber } = useParams();
  const [quote, setQuote] = useState(null);

  const quotePolicy = async () => {
    const res = await api.post(`/api/quotes/submission/${submissionNumber}`);
    setQuote(res.data);
  };

  return (
    <div>
      <h2>Quote</h2>

      <button onClick={quotePolicy}>Generate Quote</button>

      {quote && (
        <div>
          <p>Total Premium: {quote.totalPremium}</p>
        </div>
      )}
    </div>
  );
}
