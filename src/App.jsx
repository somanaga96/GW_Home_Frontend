import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Account */
import SearchAccounts from "./component/account/SearchAccounts";
import CreateAccount from "./component/account/CreateAccount";
import AccountScreen from "./component/account/AccountScreen";

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

        {/* ================= SUBMISSION (JOB) ================= */}
        <Route
          path="/submission/:submissionNumber"
          element={<PolicyInfo />}
        />

        <Route
          path="/submission/:submissionNumber/home"
          element={<HomeDetails />}
        />

        <Route
          path="/submission/:submissionNumber/claims"
          element={<Claims />}
        />

        <Route
          path="/submission/:submissionNumber/quote"
          element={<Quote />}
        />

        <Route
          path="/submission/:submissionNumber/policy-review"
          element={<PolicyReview />}
        />

        <Route
          path="/submission/:submissionNumber/payment"
          element={<Payment />}
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

        {/* ✅ FINAL SUCCESS SCREEN */}
        <Route
          path="/policy/bound/:policyNumber"
          element={<PolicyBound />}
        />

      </Routes>
  );
}
