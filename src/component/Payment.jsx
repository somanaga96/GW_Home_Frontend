import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/api";
import "./css/payment.css";

export default function BindPolicy() {
  const { submissionNumber } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    paymentPlanType: "SINGLE_PAYMENT",   // ✅ ENUM VALUE
    paymentMethod: "CARD",
    preferredPaymentDate: "17",
    autoRenew: true
  });

  const bind = async () => {
    const payload = {
      paymentPlanType: form.paymentPlanType,
      paymentMethod: form.paymentMethod,
      preferredPaymentDate: Number(form.preferredPaymentDate),
      autoRenew: form.autoRenew
    };

    const res = await api.post(
      `/api/policies/bind/${submissionNumber}`,
      payload
    );

    navigate(`/policy/bound/${res.data.policyNumber}`);
  };

  return (
    <div className="bind-container">
      <h2>Bind Policy</h2>

      {/* PAYMENT PLAN */}
      <div className="bind-row">
        <label>Payment Plan</label>
        <select
          value={form.paymentPlanType}
          onChange={e =>
            setForm({ ...form, paymentPlanType: e.target.value })
          }
        >
          <option value="SINGLE_PAYMENT">Single Payment</option>
          <option value="DEPOSIT_AND_INSTALLMENTS">
            Deposit + Installments
          </option>
          <option value="FULL_INSTALLMENTS">
            12 Monthly Installments
          </option>
        </select>
      </div>

      {/* PAYMENT METHOD */}
      <div className="bind-row">
        <label>Payment Method</label>
        <select
          value={form.paymentMethod}
          onChange={e =>
            setForm({ ...form, paymentMethod: e.target.value })
          }
        >
          <option value="CARD">Card</option>
          <option value="ACCOUNT">Bank Account</option>
        </select>
      </div>

      {/* PREFERRED DATE */}
      <div className="bind-row">
        <label>Preferred Payment Date</label>
        <select
          value={form.preferredPaymentDate}
          onChange={e =>
            setForm({ ...form, preferredPaymentDate: e.target.value })
          }
        >
          {[...Array(28)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      {/* AUTO RENEW */}
      <div className="bind-row">
        <label>Auto Renew</label>
        <input
          type="radio"
          checked={form.autoRenew}
          onChange={() =>
            setForm({ ...form, autoRenew: true })
          }
        /> Yes
        <input
          type="radio"
          checked={!form.autoRenew}
          onChange={() =>
            setForm({ ...form, autoRenew: false })
          }
        /> No
      </div>

      <button className="primary-btn" onClick={bind}>
        Bind Policy
      </button>
    </div>
  );
}
