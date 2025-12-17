import { Routes, Route } from "react-router-dom";

/* Account */
import SearchAccounts from "./component/account/SearchAccounts"
import CreateAccount from "./component/account/CreateAccount";
import AccountScreen from "./component/account/AccountScreen";

/* Submission (Job Wizard) */
import PolicyInfo from "./component/PolicyInfo";
import HomeDetails from "./component/HomeDetails";
import Claims from "./component/Claims";
import Quote from "./component/Quote";

/* Policy Jobs */
import CancelPolicy from "./component/CancelPolicy";
import ReinstatePolicy from "./component/ReinstatePolicy";

export default function App() {
  return (
    <Routes>

      {/* ================= ACCOUNT ================= */}
      <Route path="/" element={<SearchAccounts />} />
      <Route path="/createAccount" element={<CreateAccount />} />
      <Route path="/account/:accountId" element={<AccountScreen />} />

      {/* ================= SUBMISSION (JOB) ================= */}
      {/* Submission Overview */}
      <Route
        path="/submission/:submissionNumber"
        element={<PolicyInfo />}
      />

      {/* Risk */}
      <Route
        path="/submission/:submissionNumber/home"
        element={<HomeDetails />}
      />
  
      {/* Claims */}
      <Route
        path="/submission/:submissionNumber/claims"
        element={<Claims />}
      />

      {/* Quote */}
      <Route
        path="/submission/:submissionNumber/quote"
        element={<Quote />}
      />

      {/* ================= POLICY JOBS ================= */}
      <Route
        path="/policy/:policyNumber/cancel"
        element={<CancelPolicy />}
      />
      <Route
        path="/policy/:policyNumber/reinstate"
        element={<ReinstatePolicy />}
      />

    </Routes>
  );
}
