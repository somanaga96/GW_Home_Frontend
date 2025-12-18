import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";
import "./css/home-details.css";

export default function HomeDetails() {
  const { submissionNumber } = useParams();
  const navigate = useNavigate();

  const [tab, setTab] = useState("HOME");
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    propertyDetails: {
      riskAddress: "",
      homeType: "",
      ownership: "",
      builtYear: "",
      yearsAtProperty: "",
      listedBuilding: "",
      bedRooms: "",
      bathrooms: "",
      exteriorWalls: "",
      roofMadeOf: "",
      partRoofFlat: "",
      goodStateRepair: "",
      subsidence: false,
      flood10Years: false,
      floodingRisk: false,
      isCurrentlyFlooded: false,
      adultsLiving: "",
      childrenLiving: "",
      permanentResidence: true,
      empty30Days: false,
      businessUse: false,
      hasSecurityAlarm: false
    },
    yourNeeds: {
      contentsCoverAmount: "",
      bikesOver500: false,
      highRiskItemsOver2000: false,
      totalHighRiskValue: "",
      totalPersonalItemsCover: ""
    }
  });

  // ---------------- Load existing data ----------------
  useEffect(() => {
    api.get(`/api/home-details/submission/${submissionNumber}`)
      .then(res => setForm(res.data))
      .catch(() => {});
  }, [submissionNumber]);

  // ---------------- Update helpers ----------------
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

  // ---------------- Validation ----------------
  const validate = () => {
    const e = {};

    const p = form.propertyDetails;
    const n = form.yourNeeds;

    if (!p.riskAddress) e.riskAddress = "Risk address is required";
    if (!p.homeType) e.homeType = "Home type is required";
    if (!p.ownership) e.ownership = "Ownership is required";
    if (!p.builtYear) e.builtYear = "Year built is required";
    if (!p.bedRooms) e.bedRooms = "Bedrooms required";

    if (!n.contentsCoverAmount)
      e.contentsCoverAmount = "Contents cover is required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ---------------- Save ----------------
  const save = async () => {
    if (!validate()) {
      alert("Please fix validation errors");
      return;
    }

    await api.post(
      `/api/home-details/submission/${submissionNumber}`,
      form
    );

    // alert("Home details saved");
    navigate(`/submission/${submissionNumber}/claims`);
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
        <button className={tab === "HOME" ? "active" : ""}
                onClick={() => setTab("HOME")}>
          Your Home
        </button>
        <button className={tab === "NEEDS" ? "active" : ""}
                onClick={() => setTab("NEEDS")}>
          Your Needs
        </button>
      </div>

      {/* ================= YOUR HOME ================= */}
      {tab === "HOME" && (
        <div className="home-details-grid">

          <div className="home-details-section">
            <h3>Property Details</h3>

            <div className="home-details-row">
              <label>Risk Address *</label>
              <input
                value={form.propertyDetails.riskAddress}
                onChange={e => updateProperty("riskAddress", e.target.value)}
              />
              {errors.riskAddress && <span className="err">{errors.riskAddress}</span>}
            </div>

            <div className="home-details-row">
              <label>Type of Home *</label>
              <select
                value={form.propertyDetails.homeType}
                onChange={e => updateProperty("homeType", e.target.value)}
              >
                <option value="">&#60;none&#62;</option>
                <option>Detached</option>
                <option>Semi Detached</option>
                <option>Flat</option>
              </select>
              {errors.homeType && <span className="err">{errors.homeType}</span>}
            </div>

            <div className="home-details-row">
              <label>Ownership *</label>
              <select
                value={form.propertyDetails.ownership}
                onChange={e => updateProperty("ownership", e.target.value)}
              >
                <option value="">&#60;none&#62;</option>
                <option>Owned</option>
                <option>Rented</option>
              </select>
            </div>

            <div className="home-details-row">
              <label>Year Built *</label>
              <input
                value={form.propertyDetails.builtYear}
                onChange={e => updateProperty("builtYear", e.target.value)}
              />
              {errors.builtYear && <span className="err">{errors.builtYear}</span>}
            </div>

            <div className="home-details-row">
              <label>Bedrooms *</label>
              <input
                value={form.propertyDetails.bedRooms}
                onChange={e => updateProperty("bedRooms", e.target.value)}
              />
              {errors.bedRooms && <span className="err">{errors.bedRooms}</span>}
            </div>

          </div>
        </div>
      )}

      {/* ================= YOUR NEEDS ================= */}
      {tab === "NEEDS" && (
        <div className="home-details-grid">

          <div className="home-details-section">
            <h3>Your Needs</h3>

            <div className="home-details-row">
              <label>Contents Cover *</label>
              <select
                value={form.yourNeeds.contentsCoverAmount}
                onChange={e => updateNeeds("contentsCoverAmount", e.target.value)}
              >
                <option value="">&#60;none&#62;</option>
                <option value="20000">£20,000</option>
                <option value="60000">£60,000</option>
                <option value="100000">£100,000</option>
              </select>
              {errors.contentsCoverAmount && (
                <span className="err">{errors.contentsCoverAmount}</span>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
