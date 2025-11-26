import React, { useState } from "react";
import { saveYourNeeds } from "../api/yourNeedsApi";
import "./yourNeeds.css";

export default function YourNeeds() {
  const [form, setForm] = useState({
    contentsCoverAmount: "",
    bikesOver500: null,
    highRiskItemsOver2000: null,
    totalHighRiskValue: "",
    totalPersonalItemsCover: "",
  });

  const setField = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
    const res = await saveYourNeeds(form);
    alert("Saved. ID: " + res.id);
  };

  return (
    <div className="needs-wrapper">
      <h2>Your Needs</h2>

      <div className="row-block">
        <label>How much do you need to replace all of the contents?</label>
        <select
          value={form.contentsCoverAmount}
          onChange={(e) => setField("contentsCoverAmount", e.target.value)}
        >
          <option value="">{"<none>"}</option>
          <option value="25000">£25,000</option>
          <option value="50000">£50,000</option>
          <option value="75000">£75,000</option>
        </select>
      </div>

      <div className="split-block">
        <div className="left">
          <label>Do you have any bikes valued at more than £500?</label>
          <div>
            <input
              type="radio"
              name="bikesOver500"
              onChange={() => setField("bikesOver500", true)}
            />{" "}
            Yes
            <input
              type="radio"
              name="bikesOver500"
              onChange={() => setField("bikesOver500", false)}
            />{" "}
            No
          </div>
        </div>

        <div className="right">
          <label>
            Do you have any high risk items valued at more than £2000?
            <br />
            <small>(Jewellery, Electronics, TVs, Musical Instruments, Art, Clothing)</small>
          </label>
          <div>
            <input
              type="radio"
              name="highRisk"
              onChange={() => setField("highRiskItemsOver2000", true)}
            />{" "}
            Yes
            <input
              type="radio"
              name="highRisk"
              onChange={() => setField("highRiskItemsOver2000", false)}
            />{" "}
            No
          </div>
        </div>
      </div>

      <div className="row-block">
        <label>Total value of high-risk items</label>
        <input
          value={form.totalHighRiskValue}
          onChange={(e) => setField("totalHighRiskValue", e.target.value)}
          type="number"
        />
      </div>

      <div className="row-block">
        <label>Total personal items cover (outside home & abroad)</label>
        <input
          value={form.totalPersonalItemsCover}
          onChange={(e) => setField("totalPersonalItemsCover", e.target.value)}
          type="number"
        />
      </div>

      <button className="save-btn" onClick={save}>
        Save
      </button>
    </div>
  );
}
