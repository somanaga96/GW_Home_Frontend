import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./pc.css";

export default function CreateAccount() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    brandName: "",
    title: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    postcode: "",
    address1: "",
    address2: "",
    city: "",
    county: "",
    country: "United Kingdom",
    email: "",
    homePhone: "",
    mobilePhone: "",
    primaryNumber: "Home",
    communicationPreference: "Portal"
  });

  const update = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const createAccount = async () => {
    try {
      const payload = {
        brandName: form.brandName,
        firstName: form.firstName,
        lastName: form.lastName,
        dateOfBirth: form.dateOfBirth,
        postcode: form.postcode,
        email: form.email
      };

      const res = await api.post("/api/account/create", payload);
      navigate(`/account/${res.data.id}`);
    } catch (e) {
      alert("Account creation failed");
    }
  };

  return (
    <div className="pc-container">

      <div className="pc-header">
        <h2>Create Account</h2>
        <div>
          <button className="pc-btn" onClick={createAccount}>Update</button>
          <button className="pc-btn secondary" onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </div>

      <p>Please confirm account information</p>

      <div className="pc-two-column">

        {/* ================= LEFT COLUMN ================= */}
        <div className="pc-column">

          <h3>Personal Details</h3>

          <div className="pc-row">
            <label>Brand Name *</label>
            <select onChange={e => update("brandName", e.target.value)}>
              <option value="">&#60;none&#62;</option>
              <option value="GW">GW</option>
              <option value="HOME">HOME</option>
            </select>
          </div>

          <div className="pc-row">
            <label>Title</label>
            <select onChange={e => update("title", e.target.value)}>
              <option value="">&#60;none&#62;</option>
              <option>Mr</option>
              <option>Mrs</option>
              <option>Ms</option>
            </select>
          </div>

          <div className="pc-row">
            <label>First Name *</label>
            <input onChange={e => update("firstName", e.target.value)} />
          </div>

          <div className="pc-row">
            <label>Last Name *</label>
            <input onChange={e => update("lastName", e.target.value)} />
          </div>

          <div className="pc-row">
            <label>Date of Birth *</label>
            <input type="date" onChange={e => update("dateOfBirth", e.target.value)} />
          </div>

          <div className="pc-row">
            <label>Gender</label>
            <select onChange={e => update("gender", e.target.value)}>
              <option value="">&#60;none&#62;</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <h3>Account Address</h3>

          <div className="pc-row">
            <label>Postcode *</label>
            <input onChange={e => update("postcode", e.target.value)} />
          </div>

          <div className="pc-row">
            <label>Address 1</label>
            <input onChange={e => update("address1", e.target.value)} />
          </div>

          <div className="pc-row">
            <label>Address 2</label>
            <input onChange={e => update("address2", e.target.value)} />
          </div>

          <div className="pc-row">
            <label>Town / City</label>
            <input onChange={e => update("city", e.target.value)} />
          </div>

          <div className="pc-row">
            <label>County</label>
            <input onChange={e => update("county", e.target.value)} />
          </div>

          <div className="pc-row">
            <label>Country</label>
            <input value="United Kingdom" disabled />
          </div>

        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="pc-column">

          <h3>Extended Customer Details</h3>

          <div className="pc-row">
            <label>Marital Status</label>
            <select>
              <option>&lt;none&gt;</option>
            </select>
          </div>

          <div className="pc-row">
            <label>Employment Status</label>
            <select>
              <option>&lt;none&gt;</option>
            </select>
          </div>

          <h3>Phone & Mobile</h3>

          <div className="pc-row">
            <label>Home Phone</label>
            <input onChange={e => update("homePhone", e.target.value)} />
          </div>

          <div className="pc-row">
            <label>Mobile Phone</label>
            <input onChange={e => update("mobilePhone", e.target.value)} />
          </div>

          <div className="pc-row">
            <label>Primary Number *</label>
            <select onChange={e => update("primaryNumber", e.target.value)}>
              <option>Home</option>
              <option>Mobile</option>
            </select>
          </div>

          <div className="pc-row">
            <label>Email Address *</label>
            <input onChange={e => update("email", e.target.value)} />
          </div>

          <div className="pc-row">
            <label>Communication Preference *</label>
            <select onChange={e => update("communicationPreference", e.target.value)}>
              <option>Portal</option>
              <option>Email</option>
              <option>Post</option>
            </select>
          </div>

          <h3>Special Communication Preferences</h3>

          <div className="pc-checkbox">
            <input type="checkbox" /> Large Print
          </div>
          <div className="pc-checkbox">
            <input type="checkbox" /> Braille
          </div>
          <div className="pc-checkbox">
            <input type="checkbox" /> Audio (CD)
          </div>
          <div className="pc-checkbox">
            <input type="checkbox" /> MP3 on USB Stick
          </div>

        </div>
      </div>

    </div>
  );
}
