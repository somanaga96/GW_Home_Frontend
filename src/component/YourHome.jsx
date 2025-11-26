import React, { useState } from "react";
import { saveProperty } from "../api/propertyApi";
import "./yourHome.css";

export default function YourHome() {
  const [form, setForm] = useState({
    riskAddress: "",
    homeType: "",
    ownership: "",
    builtYear: "",
    yearsAtProperty: "",
    listedBuilding: "",
    bedrooms: "",
    bathrooms: "",
    exteriorWalls: "",
    roofMadeOf: "",
    partRoofFlat: "",
    goodStateRepair: "",
    subsidence: "",
    flood10Years: "",
    floodingRisk: "",
    isCurrentlyFlooded: false,
    adultsLiving: "",
    childrenLiving: "",
    permanentResidence: "",
    empty30Days: "",
    businessUse: ""
  });

  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
    const saved = await saveProperty(form);
    alert("Saved ID = " + saved.id);
  };

  return (
    <div className="yourhome-wrapper">
      {/* LEFT Column */}
      <div className="column">
        <h3>Property Details</h3>

        <label>Risk Address</label>
        <input value={form.riskAddress} onChange={(e)=>setField("riskAddress", e.target.value)} />

        <label>What type of home do you have?</label>
        <select value={form.homeType} onChange={(e)=>setField("homeType", e.target.value)}>
          <option value="">{"<none>"}</option>
          <option value="House">House</option>
          <option value="Flat">Flat</option>
        </select>

        <label>Do you own or rent your home?</label>
        <select value={form.ownership} onChange={(e)=>setField("ownership", e.target.value)}>
          <option value="">{"<none>"}</option>
          <option value="Own">Own</option>
          <option value="Rent">Rent</option>
        </select>

        <label>When was your home built?</label>
        <input value={form.builtYear} onChange={(e)=>setField("builtYear", e.target.value)} />

        <label>How many years have you lived at this property?</label>
        <select value={form.yearsAtProperty} onChange={(e)=>setField("yearsAtProperty", e.target.value)}>
          <option value="">{"<none>"}</option>
          <option value="1-5">1–5</option>
          <option value="5-10">5–10</option>
        </select>

        <label>Is it a listed building?</label>
        <select value={form.listedBuilding} onChange={(e)=>setField("listedBuilding", e.target.value)}>
          <option value="">{"<none>"}</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <label>How many bedrooms?</label>
        <input value={form.bedrooms} onChange={(e)=>setField("bedrooms", e.target.value)} />

        <label>How many bathrooms?</label>
        <input value={form.bathrooms} onChange={(e)=>setField("bathrooms", e.target.value)} />

        <label>Exterior walls mostly built of?</label>
        <input value={form.exteriorWalls} onChange={(e)=>setField("exteriorWalls", e.target.value)} />

        <label>Roof made of?</label>
        <input value={form.roofMadeOf} onChange={(e)=>setField("roofMadeOf", e.target.value)} />

        <label>Is any part of your roof flat?</label>
        <select value={form.partRoofFlat} onChange={(e)=>setField("partRoofFlat", e.target.value)}>
          <option value="">{"<none>"}</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <label>Property in good state of repair?</label>
        <select value={form.goodStateRepair} onChange={(e)=>setField("goodStateRepair", e.target.value)}>
          <option value="">{"<none>"}</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      {/* RIGHT Column */}
      <div className="column">
        <h3>Risks</h3>

        <label>Subsidence history?</label>
        <select value={form.subsidence} onChange={(e)=>setField("subsidence", e.target.value)}>
          <option value="">{"<none>"}</option>
        </select>

        <label>Flooded in last 10 years?</label>
        <select value={form.flood10Years} onChange={(e)=>setField("flood10Years", e.target.value)}>
          <option value="">{"<none>"}</option>
        </select>

        <label>Is property currently flooded?</label>
        <div>
          <input type="radio" name="flood" checked={form.isCurrentlyFlooded===true} onChange={()=>setField("isCurrentlyFlooded", true)} /> Yes
          <input type="radio" name="flood" checked={form.isCurrentlyFlooded===false} onChange={()=>setField("isCurrentlyFlooded", false)} /> No
        </div>

        <h3>Policyholder and Occupants</h3>

        <label>Adults permanently living?</label>
        <input value={form.adultsLiving} onChange={(e)=>setField("adultsLiving", e.target.value)} />

        <label>Children under 18?</label>
        <input value={form.childrenLiving} onChange={(e)=>setField("childrenLiving", e.target.value)} />

        <label>Permanent residence?</label>
        <select value={form.permanentResidence} onChange={(e)=>setField("permanentResidence", e.target.value)}>
          <option value="">{"<none>"}</option>
        </select>

        <label>Empty for 30+ days?</label>
        <select value={form.empty30Days} onChange={(e)=>setField("empty30Days", e.target.value)}>
          <option value="">{"<none>"}</option>
        </select>

        <label>Used for business?</label>
        <select value={form.businessUse} onChange={(e)=>setField("businessUse", e.target.value)}>
          <option value="">{"<none>"}</option>
        </select>

        <button className="save-btn" onClick={save}>Save</button>
      </div>
    </div>
  );
}
