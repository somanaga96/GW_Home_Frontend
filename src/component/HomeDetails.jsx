import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";
import "./css/home-details.css";

export default function HomeDetails() {
  const { submissionNumber } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState("HOME");

  // ================= STATE (ALL FIELDS, BOOLEAN SAFE) =================
  const [form, setForm] = useState({
    propertyDetails: {
      riskAddress: "",
      homeType: "",
      ownership: "",
      builtYear: "",
      bedRooms: "",
      listedBuilding: null,
      subsidence: null,
      flood10Years: null,
      currentlyFlooded: null,
      adultsLiving: "",
      childrenLiving: "",
      hasSecurityAlarm: null
    },
    yourNeeds: {
      contentsCoverAmount: "",
      bikesOver500: null,
      highRiskItemsOver2000: null,
      totalHighRiskValue: "",
      personalItemsCover: ""
    }
  });

  // ================= LOAD (OPTIONAL – SAFE IF API EXISTS) =================
  useEffect(() => {
    api.get(`/api/home-details/submission/${submissionNumber}`)
      .then(res => res?.data && setForm(res.data))
      .catch(() => {});
  }, [submissionNumber]);

  // ================= HELPERS =================
  const updateProperty = (field, value) => {
    setForm(prev => ({
      ...prev,
      propertyDetails: { ...prev.propertyDetails, [field]: value }
    }));
  };

  const updateNeeds = (field, value) => {
    setForm(prev => ({
      ...prev,
      yourNeeds: { ...prev.yourNeeds, [field]: value }
    }));
  };

  const boolToSelect = (v) => v === null ? "" : v ? "Yes" : "No";
  const selectToBool = (v) => v === "" ? null : v === "Yes";

  const save = async () => {
    // API can be wired later
    await api.post(`/api/home-details/submission/${submissionNumber}`, form);
    navigate(`/submission/${submissionNumber}/claims`);
  };

  // ================= UI =================
  return (
    <div className="home-details-container">

      {/* HEADER */}
      <div className="home-details-header">
        <h2>Your Home</h2>
        <div className="actions">
          <button onClick={save}>OK</button>
          <button onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </div>

      {/* TABS */}
      <div className="home-details-tabs">
        <button className={tab === "HOME" ? "active" : ""} onClick={() => setTab("HOME")}>
          Your Home
        </button>
        <button className={tab === "NEEDS" ? "active" : ""} onClick={() => setTab("NEEDS")}>
          Your Needs
        </button>
      </div>

      {/* ================= YOUR HOME ================= */}
      {tab === "HOME" && (
        <div className="gw-grid">

          {/* LEFT */}
          <div className="gw-section">
            <h3>Property Details</h3>

            <div className="gw-row">
              <label>Risk Address</label>
              <select value={form.propertyDetails.riskAddress}
                      onChange={e => updateProperty("riskAddress", e.target.value)}>
                <option value="">&lt;none&gt;</option>
                <option>risk1</option>
                <option>risk2</option>
              </select>
            </div>

            <div className="gw-row">
              <label>Home Type</label>
              <select value={form.propertyDetails.homeType}
                      onChange={e => updateProperty("homeType", e.target.value)}>
                <option value="">&lt;none&gt;</option>
                <option>Detached</option>
                <option>Semi Detached</option>
                <option>Flat</option>
              </select>
            </div>

            <div className="gw-row">
              <label>Ownership</label>
              <select value={form.propertyDetails.ownership}
                      onChange={e => updateProperty("ownership", e.target.value)}>
                <option value="">&lt;none&gt;</option>
                <option>Owned</option>
                <option>Rented</option>
              </select>
            </div>

            <div className="gw-row">
              <label>Built Year</label>
              <input value={form.propertyDetails.builtYear}
                     onChange={e => updateProperty("builtYear", e.target.value)} />
            </div>

            <div className="gw-row">
              <label>Bedrooms</label>
              <input value={form.propertyDetails.bedRooms}
                     onChange={e => updateProperty("bedRooms", e.target.value)} />
            </div>

            <div className="gw-row">
              <label>Listed Building?</label>
              <select value={boolToSelect(form.propertyDetails.listedBuilding)}
                      onChange={e => updateProperty("listedBuilding", selectToBool(e.target.value))}>
                <option value="">&lt;none&gt;</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div className="gw-row">
              <label>Security Alarm?</label>
              <div className="radio">
                <label>
                  <input type="radio"
                         checked={form.propertyDetails.hasSecurityAlarm === true}
                         onChange={() => updateProperty("hasSecurityAlarm", true)} />
                  Yes
                </label>
                <label>
                  <input type="radio"
                         checked={form.propertyDetails.hasSecurityAlarm === false}
                         onChange={() => updateProperty("hasSecurityAlarm", false)} />
                  No
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="gw-section">
            <h3>Risk Information</h3>

            <div className="gw-row">
              <label>Subsidence?</label>
              <select value={boolToSelect(form.propertyDetails.subsidence)}
                      onChange={e => updateProperty("subsidence", selectToBool(e.target.value))}>
                <option value="">&lt;none&gt;</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div className="gw-row">
              <label>Flooded last 10 years?</label>
              <select value={boolToSelect(form.propertyDetails.flood10Years)}
                      onChange={e => updateProperty("flood10Years", selectToBool(e.target.value))}>
                <option value="">&lt;none&gt;</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div className="gw-row">
              <label>Currently Flooded?</label>
              <select value={boolToSelect(form.propertyDetails.currentlyFlooded)}
                      onChange={e => updateProperty("currentlyFlooded", selectToBool(e.target.value))}>
                <option value="">&lt;none&gt;</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div className="gw-row">
              <label>Adults Living</label>
              <select value={form.propertyDetails.adultsLiving}
                      onChange={e => updateProperty("adultsLiving", e.target.value)}>
                <option value="">&lt;none&gt;</option>
                <option>1</option>
                <option>2</option>
                <option>3+</option>
              </select>
            </div>

            <div className="gw-row">
              <label>Children Living</label>
              <select value={form.propertyDetails.childrenLiving}
                      onChange={e => updateProperty("childrenLiving", e.target.value)}>
                <option value="">&lt;none&gt;</option>
                <option>0</option>
                <option>1</option>
                <option>2+</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* ================= YOUR NEEDS ================= */}
      {tab === "NEEDS" && (
        <div className="gw-grid">
          <div className="gw-section full">

            <div className="gw-row">
              <label>Contents Cover Amount</label>
              <select value={form.yourNeeds.contentsCoverAmount}
                      onChange={e => updateNeeds("contentsCoverAmount", e.target.value)}>
                <option value="">&lt;none&gt;</option>
                <option>£20,000</option>
                <option>£60,000</option>
                <option>£100,000</option>
              </select>
            </div>

            <div className="gw-row split">
              <label>Bikes over £500?</label>
              <div className="radio">
                <label>
                  <input type="radio"
                         checked={form.yourNeeds.bikesOver500 === true}
                         onChange={() => updateNeeds("bikesOver500", true)} /> Yes
                </label>
                <label>
                  <input type="radio"
                         checked={form.yourNeeds.bikesOver500 === false}
                         onChange={() => updateNeeds("bikesOver500", false)} /> No
                </label>
              </div>

              <label>High risk items over £2000?</label>
              <div className="radio">
                <label>
                  <input type="radio"
                         checked={form.yourNeeds.highRiskItemsOver2000 === true}
                         onChange={() => updateNeeds("highRiskItemsOver2000", true)} /> Yes
                </label>
                <label>
                  <input type="radio"
                         checked={form.yourNeeds.highRiskItemsOver2000 === false}
                         onChange={() => updateNeeds("highRiskItemsOver2000", false)} /> No
                </label>
              </div>
            </div>
            <div className="gw-row">
              <label>Contents Cover Amount</label>
              <select value={form.yourNeeds.totalHighRiskValue}
                      onChange={e => updateNeeds("totalHighRiskValue", e.target.value)}>
                <option value="">&lt;none&gt;</option>
                <option>True</option>
                <option>False</option>
              </select>
            </div>
            <div className="gw-row">
              <label>Contents Cover Amount</label>
              <select value={form.yourNeeds.personalItemsCover}
                      onChange={e => updateNeeds("personalItemsCover", e.target.value)}>
                <option value="">&lt;none&gt;</option>
                <option>True</option>
                <option>False</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
