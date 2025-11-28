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
      if (data.length === 1) setSelected(data[0].id);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      brandName: "",
      firstName: "",
      lastName: "",
      dob: "",
      postcode: "",
      quoteRef: "",
    });
    setResults([]);
    setSelected(null);
  };

  const goToAccount = () => {
    if (!selected) return alert("Select an account!");
    navigate(`/account/${selected}`);
  };

  const openCreateAccount = () => {
    navigate("/createaccount", { state: form });
  };

  return (
    <div className="gw-container">
      <h2 className="gw-title">Search Accounts</h2>

      <form className="gw-form" onSubmit={onSearch}>
        <div className="gw-form-row">
          <label>Brand Name</label>
          <select
            value={form.brandName}
            onChange={(e) => setField("brandName", e.target.value)}
          >
            <option value="">{"<none>"}</option>
            <option value="BrandA">BrandA</option>
            <option value="BrandB">BrandB</option>
          </select>
        </div>

        <div className="gw-form-row">
          <label>First Name</label>
          <input
            value={form.firstName}
            onChange={(e) => setField("firstName", e.target.value)}
          />
        </div>

        <div className="gw-form-row">
          <label>Last Name</label>
          <input
            value={form.lastName}
            onChange={(e) => setField("lastName", e.target.value)}
          />
        </div>

        <div className="gw-form-row">
          <label>Date Of Birth</label>
          <input
            type="date"
            value={form.dob}
            onChange={(e) => setField("dob", e.target.value)}
          />
        </div>

        <div className="gw-form-row">
          <label>Postcode</label>
          <input
            value={form.postcode}
            onChange={(e) => setField("postcode", e.target.value)}
          />
        </div>

        <div className="gw-form-row">
          <label>Quote Ref ID</label>
          <input
            value={form.quoteRef}
            onChange={(e) => setField("quoteRef", e.target.value)}
          />
        </div>

        <div className="gw-button-row">
          <button type="submit" className="gw-btn-primary">Search</button>
          <button type="button" className="gw-btn-secondary" onClick={resetForm}>
            Reset
          </button>
          <button type="button" className="gw-btn-secondary" onClick={openCreateAccount}>
            Create Account
          </button>
        </div>
      </form>

      <h3 className="gw-subtitle">Search Results</h3>

      {loading && <p>Loading...</p>}

      <table className="gw-table">
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
              <td>{r.firstName} {r.lastName}</td>
              <td>{r.dateOfBirth}</td>
              <td>{r.address}</td>
              <td>{r.postcode}</td>
              <td>{r.quoteRefId}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {results.length > 0 && (
        <button className="gw-btn-primary" onClick={goToAccount}>
          Go to Selected Account
        </button>
      )}
    </div>
  );
}
