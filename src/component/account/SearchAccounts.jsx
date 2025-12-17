import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./pc.css";

export default function SearchAccounts() {
  const navigate = useNavigate();

  // ---------------- State ----------------
  const [criteria, setCriteria] = useState({
    brandName: "",
    firstName: "",
    lastName: "",
    dob: "",
    postcode: "",
    quoteRef: ""
  });

  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState(null);

  // ---------------- Actions ----------------

  const search = async () => {
    try {
      const res = await api.get("/api/account/search", {
        params: criteria
      });
      setResults(res.data);
      setSearched(true);
      setSelectedAccountId(null);
    } catch (e) {
      alert("Search failed");
    }
  };

  const reset = () => {
    setCriteria({
      brandName: "",
      firstName: "",
      lastName: "",
      dob: "",
      postcode: "",
      quoteRef: ""
    });
    setResults([]);
    setSearched(false);
    setSelectedAccountId(null);
  };

  const linkAccount = () => {
    if (!selectedAccountId) {
      alert("Please select an account");
      return;
    }
    navigate(`/account/${selectedAccountId}`);
  };

  const createNewAccount = () => {
    navigate("/createAccount");
  };

  // ---------------- UI ----------------

  return (
    <div className="pc-container">

      <h2 className="pc-title">Search Accounts</h2>

      {/* ================= SEARCH FORM ================= */}
      <div className="pc-form">

        <div className="pc-row">
          <label>Brand Name *</label>
          <select
            value={criteria.brandName}
            onChange={e =>
              setCriteria({ ...criteria, brandName: e.target.value })
            }
          >
            <option value="">&lt;none&gt;</option>
            <option value="GW">GW</option>
            <option value="HOME">HOME</option>
          </select>
        </div>

        <div className="pc-row">
          <label>First name</label>
          <input
            value={criteria.firstName}
            onChange={e =>
              setCriteria({ ...criteria, firstName: e.target.value })
            }
          />
        </div>

        <div className="pc-row">
          <label>Last name</label>
          <input
            value={criteria.lastName}
            onChange={e =>
              setCriteria({ ...criteria, lastName: e.target.value })
            }
          />
        </div>

        <div className="pc-row">
          <label>Date Of Birth</label>
          <input
            type="date"
            value={criteria.dob}
            onChange={e =>
              setCriteria({ ...criteria, dob: e.target.value })
            }
          />
        </div>

        <div className="pc-row">
          <label>Postcode</label>
          <input
            value={criteria.postcode}
            onChange={e =>
              setCriteria({ ...criteria, postcode: e.target.value })
            }
          />
        </div>

        <div className="pc-row">
          <label>Quote Ref ID</label>
          <input
            value={criteria.quoteRef}
            onChange={e =>
              setCriteria({ ...criteria, quoteRef: e.target.value })
            }
          />
        </div>

        {/* ---------- Search / Reset ---------- */}
        <div className="pc-actions">
          <button className="pc-btn" onClick={search}>
            Search
          </button>
          <button className="pc-btn secondary" onClick={reset}>
            Reset
          </button>
        </div>

        {/* ---------- Create New Account (PC logic) ---------- */}
        {searched && results.length === 0 && (
          <button className="pc-btn create" onClick={createNewAccount}>
            Create New Account
          </button>
        )}

        {/* ---------- Link to Selected Account ---------- */}
        {searched && results.length > 0 && (
          <button className="pc-btn link" onClick={linkAccount}>
            Link to Selected Account
          </button>
        )}

      </div>

      {/* ================= SEARCH RESULTS ================= */}
      {searched && results.length > 0 && (
        <div className="pc-results">
          <h3>Search Results</h3>

          <table>
            <thead>
              <tr>
                <th></th>
                <th>Account Number</th>
                <th>Name</th>
                <th>Date Of Birth</th>
                <th>Postcode</th>
              </tr>
            </thead>
            <tbody>
              {results.map(acc => (
                <tr key={acc.id}>
                  <td>
                    <input
                      type="radio"
                      name="selectedAccount"
                      onChange={() => setSelectedAccountId(acc.id)}
                    />
                  </td>
                  <td>{acc.accountNumber}</td>
                  <td>{acc.firstName} {acc.lastName}</td>
                  <td>{acc.dateOfBirth}</td>
                  <td>{acc.postcode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
