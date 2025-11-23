import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchAccounts } from "../api/api";

export default function SearchAccounts() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    brandName: "",
    firstName: "",
    lastName: "",
    dob: "",
    postcode: "",
    quoteRef: "",
  });

  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const onSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await searchAccounts(form);
      setResults(data);

      if (data.length === 1) setSelected(data[0].id); // auto-select
    } finally {
      setLoading(false);
    }
  };

  const goToAccount = () => {
    if (!selected) return alert("Select an account!");
    navigate(`/account/${selected}`);
  };

  const openCreateAccount = () => {
    navigate("/create-account", { state: form });
  };

  return (
    <div className="search-container">
      <h1>Search Accounts</h1>

      <form className="form" onSubmit={onSearch}>
        <label>Brand Name</label>
        <select
          value={form.brandName}
          onChange={(e) => setField("brandName", e.target.value)}
        >
          <option value="">{"<none>"}</option>
          <option value="BrandA">BrandA</option>
          <option value="BrandB">BrandB</option>
        </select>

        <label>First Name</label>
        <input
          value={form.firstName}
          onChange={(e) => setField("firstName", e.target.value)}
        />

        <label>Last Name</label>
        <input
          value={form.lastName}
          onChange={(e) => setField("lastName", e.target.value)}
        />

        <label>Date Of Birth</label>
        <input
          type="date"
          value={form.dob}
          onChange={(e) => setField("dob", e.target.value)}
        />

        <label>Postcode</label>
        <input
          value={form.postcode}
          onChange={(e) => setField("postcode", e.target.value)}
        />

        <label>Quote Ref ID</label>
        <input
          value={form.quoteRef}
          onChange={(e) => setField("quoteRef", e.target.value)}
        />

        <div className="button-row">
          <button type="submit">Search</button>
          <button type="button" onClick={openCreateAccount}>
            Create Account
          </button>
        </div>
      </form>

      {/* Show Create/Go depending on results */}
      {results.length > 0 ? (
        <button className="btn" onClick={goToAccount}>
          Go to Account
        </button>
      ) : null}

      <h2>Search Results</h2>

      {loading && <p>Loading...</p>}

      <table className="results-table">
        <thead>
          <tr>
            <th></th>
            <th>Account Number</th>
            <th>Name</th>
            <th>Date Of Birth</th>
            <th>Address</th>
            <th>Postcode</th>
            <th>Quote Ref ID</th>
          </tr>
        </thead>

        <tbody>
          {results.map((r) => (
            <tr key={r.id}>
              <td>
                <input
                  type="radio"
                  checked={selected === r.id}
                  onChange={() => setSelected(r.id)}
                />
              </td>
              <td>{r.accountNumber}</td>
              <td>
                {r.firstName} {r.lastName}
              </td>
              <td>{r.dateOfBirth}</td>
              <td>{r.address}</td>
              <td>{r.postcode}</td>
              <td>{r.quoteRefId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
