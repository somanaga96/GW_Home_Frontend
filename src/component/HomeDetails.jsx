import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";
import "./css/home-details.css";

export default function HomeDetails() {
  const { submissionNumber } = useParams();
  const navigate = useNavigate();

  const [tab, setTab] = useState("HOME");

  const [form, setForm] = useState({
    riskAddress: "",
    homeType: "",
    ownership: "",
    yearBuilt: "",
    yearsLived: "",
    listedBuilding: "",
    bedrooms: "",
    bathrooms: "",
    wallType: "",
    roofType: "",
    flatRoof: "",
    goodRepair: "",
    subsidence: "",
    floodedLast10Years: "",
    floodRisk: "",
    adults: "",
    children: "",
    permanentResidence: "",
    emptyMoreThan30Days: "",
    businessUse: "",
    contentsValue: "",
    bikesOver500: "",
    highRiskItems: "",
    highRiskValue: "",
    personalItemsCover: ""
  });

  useEffect(() => {
    api.get(`/api/home-details/submission/${submissionNumber}`)
      .then(res => setForm(res.data))
      .catch(() => {});
  }, [submissionNumber]);

  const update = (field, value) =>
    setForm({ ...form, [field]: value });

  const save = async () => {
    await api.post(`/api/home-details/submission/${submissionNumber}`, form);
    alert("Saved");
  };

  return (
    <div className="home-details-container">

      {/* HEADER */}
      <div className="home-details-header">
        <h2>Your Home</h2>
        <div>
          <button onClick={save}>OK</button>
          <button onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </div>

      {/* TABS */}
      <div className="home-details-tabs">
        <button
          className={tab === "HOME" ? "active" : ""}
          onClick={() => setTab("HOME")}
        >
          Your Home
        </button>
        <button
          className={tab === "NEEDS" ? "active" : ""}
          onClick={() => setTab("NEEDS")}
        >
          Your Needs
        </button>
      </div>

      {/* ================= YOUR HOME ================= */}
      {tab === "HOME" && (
        <div className="home-details-grid">

          <div className="home-details-section">
            <h3>Property Details</h3>

            <div className="home-details-row">
              <label>Risk Address</label>
              <input onChange={e => update("riskAddress", e.target.value)} />
            </div>

            <div className="home-details-row">
              <label>Type of home</label>
              <select onChange={e => update("homeType", e.target.value)}>
                <option value="">&#60;none&#62;</option>
                <option>Detached</option>
                <option>Semi Detached</option>
                <option>Flat</option>
              </select>
            </div>

            <div className="home-details-row">
              <label>Own or Rent</label>
              <select onChange={e => update("ownership", e.target.value)}>
                <option value="">&#60;none&#62;</option>
                <option>Own</option>
                <option>Rent</option>
              </select>
            </div>

            <div className="home-details-row">
              <label>Year Built</label>
              <input onChange={e => update("yearBuilt", e.target.value)} />
            </div>

            <div className="home-details-row">
              <label>Bedrooms</label>
              <input onChange={e => update("bedrooms", e.target.value)} />
            </div>

            <div className="home-details-row">
              <label>Exterior walls</label>
              <select onChange={e => update("wallType", e.target.value)}>
                <option>&lt;none&gt;</option>
                <option>Brick</option>
                <option>Stone</option>
              </select>
            </div>

            <div className="home-details-row">
              <label>Roof type</label>
              <select onChange={e => update("roofType", e.target.value)}>
                <option>&lt;none&gt;</option>
                <option>Tile</option>
                <option>Slate</option>
              </select>
            </div>
          </div>

          <div className="home-details-section">
            <h3>Flood & Subsidence</h3>

            <div className="home-details-row">
              <label>Subsidence or movement?</label>
              <select onChange={e => update("subsidence", e.target.value)}>
                <option>&lt;none&gt;</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div className="home-details-row">
              <label>Flooded in last 10 years?</label>
              <select onChange={e => update("floodedLast10Years", e.target.value)}>
                <option>&lt;none&gt;</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
          </div>

        </div>
      )}

      {/* ================= YOUR NEEDS ================= */}
      {tab === "NEEDS" && (
        <div className="home-details-grid">

          <div className="home-details-section">
            <h3>Contents Cover</h3>

            <div className="home-details-row">
              <label>Contents value</label>
              <select onChange={e => update("contentsValue", e.target.value)}>
                <option>&lt;none&gt;</option>
                <option>£20,000</option>
                <option>£50,000</option>
                <option>£100,000</option>
              </select>
            </div>

            <div className="home-details-row">
              <label>Bikes over £500?</label>
              <input
                type="radio"
                name="bikes"
                onChange={() => update("bikesOver500", "Yes")}
              /> Yes
              <input
                type="radio"
                name="bikes"
                onChange={() => update("bikesOver500", "No")}
              /> No
            </div>

            <div className="home-details-row">
              <label>High risk items over £2000?</label>
              <input
                type="radio"
                name="risk"
                onChange={() => update("highRiskItems", "Yes")}
              /> Yes
              <input
                type="radio"
                name="risk"
                onChange={() => update("highRiskItems", "No")}
              /> No
            </div>

            <div className="home-details-row">
              <label>Total value of high risk items</label>
              <input onChange={e => update("highRiskValue", e.target.value)} />
            </div>

            <div className="home-details-row">
              <label>Personal items outside home</label>
              <input onChange={e => update("personalItemsCover", e.target.value)} />
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
