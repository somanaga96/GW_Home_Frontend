import { Routes, Route } from "react-router-dom";

/* Account */
import SearchAccounts from "./component/account/SearchAccounts";
import CreateAccount from "./component/account/CreateAccount";
import AccountScreen from "./component/account/AccountScreen";

/* Submission Layout */
import SubmissionLayout from "./component/layout/SubmissionLayout"

/* Submission (Job Wizard) */
import PolicyInfo from "./component/PolicyInfo";
import HomeDetails from "./component/HomeDetails";
import Claims from "./component/Claims";
import Quote from "./component/Quote";
import PolicyReview from "./component/PolicyReview";
import Payment from "./component/Payment";

/* Policy Jobs */
import CancelPolicy from "./component/CancelPolicy";
import ReinstatePolicy from "./component/ReinstatePolicy";
import PolicyBound from "./component/PolicyBound";

export default function App() {
  return (
    <Routes>

      {/* ================= ACCOUNT ================= */}
      <Route path="/" element={<SearchAccounts />} />
      <Route path="/createAccount" element={<CreateAccount />} />
      <Route path="/account/:accountId" element={<AccountScreen />} />

      {/* ================= SUBMISSION (JOB WIZARD) ================= */}
      <Route
        path="/submission/:submissionNumber"
        element={<SubmissionLayout />}
      >
        <Route index element={<PolicyInfo />} />
        <Route path="home" element={<HomeDetails />} />
        <Route path="claims" element={<Claims />} />
        <Route path="quote" element={<Quote />} />
        <Route path="policy-review" element={<PolicyReview />} />
        <Route path="payment" element={<Payment />} />
      </Route>

      {/* ================= POLICY JOBS ================= */}
      <Route
        path="/policy/:policyNumber/cancel"
        element={<CancelPolicy />}
      />
      <Route
        path="/policy/:policyNumber/reinstate"
        element={<ReinstatePolicy />}
      />

      {/* ================= FINAL ================= */}
      <Route
        path="/policy/bound/:policyNumber"
        element={<PolicyBound />}
      />

    </Routes>
  );
}
