import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPolicy, createPolicy, updatePolicy } from "../api/policyApi";
import "./policy.css";

export default function PolicyInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [policy, setPolicy] = useState({
    quoteReferenceId: "",
    brand: "",
    policyHolderName: "",
    phoneNumber: "",
    accountAddress: "",
    postcode: "",
    townCity: "",
    county: "",
    employmentStatus: "",
    occupation: "",
    industry: "",
    termType: "Annual",
    termNumber: 1,
    coverStartDate: "",
    expirationDate: "",
    submissionStartDate: "",
    reasonCode: "",
    channel: "Contact Centre",
    sourceCode: "Direct",
    offering: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if (id) {
      setLoading(true);
      getPolicy(id).then(p => {
        // ensure date fields formatted as yyyy-mm-dd for input[type=date]
        const fmt = (d) => d ? d.split("T")[0] : "";
        setPolicy({
          ...p,
          coverStartDate: fmt(p.coverStartDate),
          expirationDate: fmt(p.expirationDate),
          submissionStartDate: fmt(p.submissionStartDate),
        });
      }).catch(console.error).finally(()=>setLoading(false));
    }
  }, [id]);

  function setField(k, v){ setPolicy(prev => ({...prev, [k]: v})); }

  async function onSave(e){
    e.preventDefault();
    try {
      if (id) {
        await updatePolicy(id, policy);
        alert("Policy updated");
      } else {
        const created = await createPolicy(policy);
        navigate(`/policy/${created.id}`);
      }
    } catch(err){
      alert("Save failed: " + err.message);
    }
  }

  return (
    <div className="policy-wrapper">
      <div className="left-col">
        <h2>Policy Info</h2>
        <div className="info-grid">
          <label>Quote Reference ID</label>
          <div className="value">{policy.quoteReferenceId}</div>

          <label>Brand</label>
          <input value={policy.brand} onChange={e=>setField('brand', e.target.value)} />

          <label>PolicyHolder</label>
          <input value={policy.policyHolderName} onChange={e=>setField('policyHolderName', e.target.value)} />

          <label>Phone Number</label>
          <input value={policy.phoneNumber} onChange={e=>setField('phoneNumber', e.target.value)} />

          <label>Account Address</label>
          <textarea value={policy.accountAddress} onChange={e=>setField('accountAddress', e.target.value)} rows={3} />

          <label>Employment status</label>
          <div className="value">{policy.employmentStatus}</div>

          <label>Occupation</label>
          <div className="value">{policy.occupation}</div>

          <label>Industry</label>
          <div className="value">{policy.industry}</div>
        </div>

        <h3>Joint Policy Holders</h3>
        <div className="panel-box">No data to display</div>
      </div>

      <div className="middle-col">
        <h3>Promos and Discounts</h3>
        <label>Promo Name</label>
        <input />

        <label>Promo Override</label>
        <input />

        <label>Cross Sell</label>
        <select>
          <option value="">{"<none>"}</option>
        </select>
      </div>

      <div className="right-col">
        <h3>Policy Details</h3>

        <label>Term Type</label>
        <input value={policy.termType} onChange={e=>setField('termType', e.target.value)} />

        <label>Term Number</label>
        <input type="number" value={policy.termNumber || ""} onChange={e=>setField('termNumber', parseInt(e.target.value||0))} />

        <label>What date would you like cover to start from?</label>
        <input type="date" value={policy.coverStartDate || ""} onChange={e=>setField('coverStartDate', e.target.value)} />

        <label>Expiration Date</label>
        <input type="date" value={policy.expirationDate || ""} onChange={e=>setField('expirationDate', e.target.value)} />

        <label>Submission Start Date</label>
        <input type="date" value={policy.submissionStartDate || ""} onChange={e=>setField('submissionStartDate', e.target.value)} />

        <h3>Channel and Source</h3>
        <label>Reason Code</label>
        <select value={policy.reasonCode} onChange={e=>setField('reasonCode', e.target.value)}>
          <option value="">{'<none>'}</option>
        </select>

        <label>Channel</label>
        <input value={policy.channel} onChange={e=>setField('channel', e.target.value)} />

        <label>Source Code</label>
        <input value={policy.sourceCode} onChange={e=>setField('sourceCode', e.target.value)} />

        <h3>Offerings Selection</h3>
        <label>What do you want to cover?</label>
        <select value={policy.offering} onChange={e=>setField('offering', e.target.value)}>
          <option value="">{"<none>"}</option>
          <option value="Buildings">Buildings</option>
          <option value="Contents">Contents</option>
        </select>

        <div style={{marginTop:16}}>
          <button onClick={onSave} className="primary">Save</button>
          <button onClick={()=>navigate(-1)} style={{marginLeft:8}}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
