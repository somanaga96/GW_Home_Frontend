import React, { useState } from "react";
import "./policy_info.css";

export default function PolicyInfo() {
  const [form, setForm] = useState({
    quoteRef: "PRV-6000-0241-509",
    brand: "Privilege",
    policyHolder: "",
    name: "",
    phone: "",
    address: "",
    employmentStatus: "",
    occupation: "",
    industry: "",
    promoName: "",
    promoOverride: "",
    crossSellMonth: "",
    paymentMethod: "",
    termType: "Annual",
    termNumber: "",
    coverStart: "",
    expirationDate: "",
    submissionStartDate: "",
    reasonCode: "",
    channel: "Contact Centre",
    sourceCode: "Direct",
    offering: "",
    caisEnabled: "Yes",
  });

  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="policyinfo-page">

      {/* Header Section */}
      <div className="pi-header-bar">
        <div className="pi-title">Policy Info</div>

        <div className="pi-header-buttons">
          <button onClick={() => navigate(`/yourHome/${sub.id}`)}>Next</button>
          <button>Quote</button>
          <button>Save Draft</button>
          <button>Close Options</button>
        </div>
      </div>

      {/* 3 Column Layout */}
      <div className="pi-grid">

        {/* LEFT COLUMN */}
        <div className="pi-col">
          <h3 className="section-title">Main Details</h3>

          <div className="pi-row">
            <label>Quote Reference ID</label>
            <div className="readonly">{form.quoteRef}</div>
          </div>

          <div className="pi-row">
            <label>Brand</label>
            <input value={form.brand} onChange={(e) => setField("brand", e.target.value)} />
          </div>

          <div className="pi-row">
            <label>PolicyHolder</label>
            <input value={form.policyHolder} onChange={(e) => setField("policyHolder", e.target.value)} />
          </div>

          <div className="pi-row">
            <label>Name</label>
            <input value={form.name} onChange={(e) => setField("name", e.target.value)} />
          </div>

          <div className="pi-row">
            <label>Phone Number</label>
            <input value={form.phone} onChange={(e) => setField("phone", e.target.value)} />
          </div>

          <div className="pi-row">
            <label>Account Address</label>
            <textarea rows="3" value={form.address} onChange={(e) => setField("address", e.target.value)} />
          </div>

          <h3 className="section-title">Employment</h3>

          <div className="pi-row">
            <label>Employment Status</label>
            <div className="readonly">{form.employmentStatus}</div>
          </div>

          <div className="pi-row">
            <label>Occupation</label>
            <div className="readonly">{form.occupation}</div>
          </div>

          <div className="pi-row">
            <label>Industry</label>
            <div className="readonly">{form.industry}</div>
          </div>

          <h3 className="section-title">Joint Policy Holders</h3>
          <div className="joint-table">No data to display</div>

        </div>

        {/* MIDDLE COLUMN */}
        <div className="pi-col">
          <h3 className="section-title">Promos and Discounts</h3>

          <div className="pi-row">
            <label>Promo Name</label>
            <input value={form.promoName} onChange={(e) => setField("promoName", e.target.value)} />
          </div>

          <div className="pi-row">
            <label>Promo Override</label>
            <input value={form.promoOverride} onChange={(e) => setField("promoOverride", e.target.value)} />
          </div>

          <h3 className="section-title">Cross Sell</h3>

          <div className="pi-row">
            <label>Month your car insurance renews?</label>
            <select value={form.crossSellMonth} onChange={(e) => setField("crossSellMonth", e.target.value)}>
              <option value="">{`<none>`}</option>
              <option>January</option>
              <option>February</option>
              <option>March</option>
            </select>
          </div>

          <div className="pi-row">
            <label>How do you normally pay?</label>
            <select value={form.paymentMethod} onChange={(e) => setField("paymentMethod", e.target.value)}>
              <option value="">{`<none>`}</option>
              <option>Card</option>
              <option>Direct Debit</option>
            </select>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="pi-col">
          <h3 className="section-title">Policy Details</h3>

          <div className="pi-row">
            <label>Term Type</label>
            <input value={form.termType} onChange={(e) => setField("termType", e.target.value)} />
          </div>

          <div className="pi-row">
            <label>Term Number</label>
            <input value={form.termNumber} onChange={(e) => setField("termNumber", e.target.value)} />
          </div>

          <div className="pi-row">
            <label>Cover Start Date</label>
            <input type="date" value={form.coverStart} onChange={(e) => setField("coverStart", e.target.value)} />
          </div>

          <div className="pi-row">
            <label>Expiration Date</label>
            <input type="date" value={form.expirationDate} onChange={(e) => setField("expirationDate", e.target.value)} />
          </div>

          <div className="pi-row">
            <label>Submission Start Date</label>
            <input type="date" value={form.submissionStartDate} onChange={(e) => setField("submissionStartDate", e.target.value)} />
          </div>

          <h3 className="section-title">Channel and Source</h3>

          <div className="pi-row">
            <label>Reason Code</label>
            <select value={form.reasonCode} onChange={(e) => setField("reasonCode", e.target.value)}>
              <option>{`<none>`}</option>
            </select>
          </div>

          <div className="pi-row">
            <label>Channel</label>
            <input value={form.channel} onChange={(e) => setField("channel", e.target.value)} />
          </div>

          <div className="pi-row">
            <label>Source Code</label>
            <input value={form.sourceCode} onChange={(e) => setField("sourceCode", e.target.value)} />
          </div>
          <h3 className="section-title">Offering Selection</h3>
          <div className="pi-row">
            <label>What do you want to cover?</label>
            <select value={form.offering} onChange={(e) => setField("offering", e.target.value)}>
              <option>{`<none>`}</option>
              <option>Buildings</option>
              <option>Contents</option>
            </select>
          </div>
          <div className="pi-row">
            <label>CAIS Enabled?</label>
            <div className="readonly">{form.caisEnabled}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
