import React, { useEffect, useState } from "react";
import { getQuote, createQuote, updateQuote } from "../api/quoteApi";
import "./quote.css";
import { useNavigate, useParams } from "react-router-dom";

const SAMPLE_COVERS = [
  { description: "Premium for Buildings and Contents Coverage", premium: 0 },
  { description: "AD Cover", premium: 0 },
  { description: "Buildings", premium: 0 },
  { description: "Contents", premium: 0 },
  { description: "Home Emergency", premium: 29.12 },
  { description: "Family Legal Protection", premium: 26.88 }
];

export default function Quote(){
  const { id } = useParams();
  const navigate = useNavigate();

  const [quote, setQuote] = useState({
    totalPolicyPremium: 0,
    buildingsSumInsured: 0,
    contentsSumInsured: 0,
    offering: "Home",
    claimFreeBuildings: "1 year",
    claimFreeContents: "2 years",
    totalPropertyExcess: 250,
    compulsoryExcess: 100,
    voluntaryExcess: 150,
    totalSubsidenceExcess: 1000,
    totalEscapeOfWaterExcess: 550,
    riskAddress: "4-5 Market Square, BROMLEY, Kent BR1 1NA",
    coverRows: SAMPLE_COVERS.map(c => ({ description: c.description, premium: c.premium, selected: false }))
  });

  useEffect(()=>{
    if(id){
      getQuote(id).then(q => {
        // ensure coverRows present
        if(!q.coverRows || !q.coverRows.length){
          q.coverRows = SAMPLE_COVERS.map(c => ({ description:c.description, premium:c.premium, selected:false }));
        }
        setQuote(q);
      }).catch(console.error);
    }
  }, [id]);

  function setField(k, v){
    setQuote(prev => ({ ...prev, [k]: v }));
  }

  function toggleRow(i){
    setQuote(prev => {
      const rows = [...prev.coverRows];
      rows[i] = { ...rows[i], selected: !rows[i].selected };
      const totalPremium = rows.reduce((s,r) => s + (r.selected ? r.premium : 0), 0);
      return { ...prev, coverRows: rows, totalPolicyPremium: Math.round((totalPremium + Number.EPSILON)*100)/100 };
    });
  }

  async function onSave(){
    // calculate totals quickly
    const selectedPremium = quote.coverRows.reduce((s,r)=> s + (r.selected ? r.premium : 0), 0);
    const payload = {...quote, totalPolicyPremium: selectedPremium};
    try {
      if(id){
        await updateQuote(id, payload);
        alert("Quote updated");
      } else {
        const saved = await createQuote(payload);
        alert("Quote created: " + saved.id);
        navigate(`/quote/${saved.id}`);
      }
    } catch(err){
      alert("Save failed: " + err.message);
    }
  }

  return (
    <div className="quote-wrapper">
      <div className="quote-left">
        <h1>Quote</h1>

        <div className="summary-row">
          <div>
            <div className="summary-label">Total Policy Premium (incl IPT)</div>
            <div className="summary-value">£{quote.totalPolicyPremium?.toFixed(2)}</div>
          </div>
          <div className="sums">
            <div>Buildings Sums Insured<br/><strong>Unlimited</strong></div>
            <div>Contents Sums Insured<br/><strong>£{quote.contentsSumInsured}</strong></div>
          </div>
        </div>

        <div className="form-grid">
          <label>Offering</label>
          <select value={quote.offering} onChange={e=>setField("offering", e.target.value)}>
            <option value="Home">Home</option>
            <option value="Buildings">Buildings</option>
          </select>

          <label>Claims Free Years on Buildings</label>
          <div>{quote.claimFreeBuildings}</div>

          <label>Claims Free Years on Contents</label>
          <div>{quote.claimFreeContents}</div>
        </div>

        <hr/>

        <div className="risk-address">
          <label>Risk Address 1:</label>
          <div className="address-text">{quote.riskAddress}</div>
        </div>

        <div className="covers-table">
          <table>
            <thead>
              <tr><th>Description</th><th>Premium</th><th>Select</th></tr>
            </thead>
            <tbody>
              {quote.coverRows.map((r, idx)=>(
                <tr key={idx}>
                  <td>{r.description}</td>
                  <td>£{(r.premium||0).toFixed(2)}</td>
                  <td><input type="checkbox" checked={r.selected||false} onChange={()=>toggleRow(idx)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="quote-right">
        <div className="right-box">
          <div className="excess-row"><div>Total Property Excess</div><div>£{quote.totalPropertyExcess}</div></div>
          <div className="excess-row"><div>Compulsory Excess</div><div>£{quote.compulsoryExcess}</div></div>
          <div className="excess-row">
            <div>Voluntary Excess</div>
            <div>
              <select value={quote.voluntaryExcess} onChange={e=>setField("voluntaryExcess", Number(e.target.value))}>
                <option value={50}>£50</option>
                <option value={100}>£100</option>
                <option value={150}>£150</option>
                <option value={250}>£250</option>
              </select>
            </div>
          </div>

          <div className="excess-row"><div>Total Subsidence Excess</div><div>£{quote.totalSubsidenceExcess}</div></div>
          <div className="excess-row"><div>Total Escape of Water Excess</div><div>£{quote.totalEscapeOfWaterExcess}</div></div>
        </div>

        <div style={{marginTop:16}}>
          <button className="btn-primary" onClick={onSave}>Save</button>
        </div>
      </div>
    </div>
  );
}
