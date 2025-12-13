import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createAccount } from "../api/api";

export default function CreateAccount() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchData = location.state || {};

  const [form, setForm] = useState({
    brandName: searchData.brandName || "",
    privilege: "",
    title: "",
    firstName: searchData.firstName || "",
    lastName: searchData.lastName || "",
    dateOfBirth: searchData.dateOfBirth || "",
    gender: "",
    employeeNumber: "",

    postcode: searchData.postcode || "",
    address1: "",
    address2: "",
    address3: "",
    townCity: "",
    county: "",
    country: "United Kingdom",

    maritalStatus: "",
    employmentStatus: "",
    homePhone: "",
    mobilePhone: "",
    otherNumber: "",
    primaryNumber: "",
    email: "",
    communicationPreference: "",
  });

  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async () => {
    const saved = await createAccount(form);
    navigate(`/account/${saved.id}`);
  };

  return (
    <div className="create-wrapper">
      <h1>Create Account</h1>
      <p className="subtitle">Please confirm account information</p>

      <div className="grid-two">
        
        {/* LEFT SIDE */}
        <div className="left-panel">

          <h3>Personal Details</h3>

          <label>Brand Name *</label>
          <input value={form.brandName} onChange={(e) => setField("brandName", e.target.value)} />

          <label>Privilege</label>
          <select value={form.privilege} onChange={(e) => setField("privilege", e.target.value)}>
            <option value="">{`<none>`}</option>
            <option value="Admin">Admin</option>
            <option value="Standard">Standard</option>
          </select>

          <label>Title</label>
          <input value={form.title} onChange={(e) => setField("title", e.target.value)} />

          <label>First Name *</label>
          <input value={form.firstName} onChange={(e) => setField("firstName", e.target.value)} />

          <label>Last Name *</label>
          <input value={form.lastName} onChange={(e) => setField("lastName", e.target.value)} />

          <label>Date of Birth *</label>
          <input type="date" value={form.dateOfBirth} onChange={(e) => setField("dateOfBirth", e.target.value)} />

          <label>Gender</label>
          <input value={form.gender} onChange={(e) => setField("gender", e.target.value)} />

          <label>Employee Number</label>
          <input value={form.employeeNumber} onChange={(e) => setField("employeeNumber", e.target.value)} />

          <h3>Account Address</h3>

          <label>Postcode *</label>
          <input value={form.postcode} onChange={(e) => setField("postcode", e.target.value)} />

          <label>Address 1</label>
          <input value={form.address1} onChange={(e) => setField("address1", e.target.value)} />

          <label>Address 2</label>
          <input value={form.address2} onChange={(e) => setField("address2", e.target.value)} />

          <label>Address 3</label>
          <input value={form.address3} onChange={(e) => setField("address3", e.target.value)} />

          <label>Town/City</label>
          <input value={form.townCity} onChange={(e) => setField("townCity", e.target.value)} />

          <label>County</label>
          <input value={form.county} onChange={(e) => setField("county", e.target.value)} />

          <label>Country</label>
          <input value={form.country} disabled />
        </div>

        {/* RIGHT SIDE */}
        <div className="right-panel">

          <h3>Extended Customer Details</h3>

          <label>Marital Status</label>
          <select value={form.maritalStatus} onChange={(e) => setField("maritalStatus", e.target.value)}>
            <option value="">{`<none>`}</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </select>

          <label>What is your employment status?</label>
          <select value={form.employmentStatus} onChange={(e) => setField("employmentStatus", e.target.value)}>
            <option value="">{`<none>`}</option>
            <option value="Employed">Employed</option>
            <option value="Self Employed">Self Employed</option>
          </select>

          <h3>Phone & Mobile</h3>

          <label>Home Phone *</label>
          <input value={form.homePhone} onChange={(e) => setField("homePhone", e.target.value)} />

          <label>Mobile Phone</label>
          <input value={form.mobilePhone} onChange={(e) => setField("mobilePhone", e.target.value)} />

          <label>Other Number</label>
          <input value={form.otherNumber} onChange={(e) => setField("otherNumber", e.target.value)} />

          <label>Primary Number *</label>
          <select value={form.primaryNumber} onChange={(e) => setField("primaryNumber", e.target.value)}>
            <option value="Home">Home</option>
            <option value="Mobile">Mobile</option>
          </select>

          <label>Email Address *</label>
          <input value={form.email} onChange={(e) => setField("email", e.target.value)} />

          <label>Communication Preference *</label>
          <select
            value={form.communicationPreference}
            onChange={(e) => setField("communicationPreference", e.target.value)}
          >
            <option value="Portal">Portal</option>
            <option value="Email">Email</option>
            <option value="Phone">Phone</option>
          </select>

          <h3>Special Communication Preferences</h3>
          <div className="checkbox-group">
            <label><input type="checkbox" /> Large Print</label>
            <label><input type="checkbox" /> Braille</label>
            <label><input type="checkbox" /> Audio (CD)</label>
            <label><input type="checkbox" /> Audio (Tape)</label>
            <label><input type="checkbox" /> MP3 on USB Stick</label>
          </div>
        </div>

      </div>

      <button className="btn-submit" onClick={submit}>Create Account</button>
    </div>
  );
}
