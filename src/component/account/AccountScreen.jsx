import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/api";
import "./account_screen_view.css";

export default function AccountScreen() {
  const { accountId } = useParams();
  const navigate = useNavigate();

  const [account, setAccount] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    // Load account details
    api.get(`/api/account/${accountId}`)
      .then(res => setAccount(res.data));

    // Load submissions for account
    api.get(`/api/submissions/account/${accountId}`)
      .then(res => setSubmissions(res.data));
  }, [accountId]);

  const newSubmission = async () => {
    const res = await api.post(`/api/submissions/account/${accountId}`);
    navigate(`/submission/${res.data.submissionNumber}`);
  };

  if (!account) return <div>Loading...</div>;

  return (
    <div className="pc-container">

      {/* ================= HEADER ================= */}
      <div className="pc-header">
        <h2>Account Summary</h2>
        <button className="pc-btn" onClick={newSubmission}>
          New Submission
        </button>
      </div>

      <p>Account details (view only)</p>

      {/* ================= TWO COLUMN LAYOUT ================= */}
      <div className="pc-two-column">

        {/* ============ LEFT COLUMN ============ */}
        <div className="pc-column">

          <h3>Personal Details</h3>

          <div className="pc-row">
            <label>Brand Name</label>
            <input value={account.brandName || ""} disabled />
          </div>

          <div className="pc-row">
            <label>First Name</label>
            <input value={account.firstName || ""} disabled />
          </div>

          <div className="pc-row">
            <label>Last Name</label>
            <input value={account.lastName || ""} disabled />
          </div>

          <div className="pc-row">
            <label>Date of Birth</label>
            <input value={account.dateOfBirth || ""} disabled />
          </div>

          <h3>Account Address</h3>

          <div className="pc-row">
            <label>Postcode</label>
            <input value={account.postcode || ""} disabled />
          </div>

        </div>

        {/* ============ RIGHT COLUMN ============ */}
        <div className="pc-column">

          <h3>Contact Details</h3>

          <div className="pc-row">
            <label>Email Address</label>
            <input value={account.email || ""} disabled />
          </div>

          <div className="pc-row">
            <label>Communication Preference</label>
            <input value="Portal" disabled />
          </div>

        </div>
      </div>

      {/* ================= SUBMISSIONS LIST ================= */}
      <div className="pc-results">
        <h3>Submissions</h3>

        {submissions.length === 0 ? (
          <p>No submissions available</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Submission Number</th>
                <th>Status</th>
                <th>Created Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map(sub => (
                <tr key={sub.id}>
                  <td>{sub.submissionNumber}</td>
                  <td>{sub.status}</td>
                  <td>{sub.createdDate}</td>
                  <td>
                    <button
                      className="pc-btn small"
                      onClick={() =>
                        navigate(`/submission/${sub.submissionNumber}`)
                      }
                    >
                      Open
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}
