import { Routes, Route } from "react-router-dom";
import SearchAccounts from "./component/SearchAccounts";
import CreateAccount from "./component/CreateAccount";
// import AccountScreen from "./component/AccountScreen";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchAccounts />} />
      <Route path="/create-account" element={<CreateAccount />} />
      {/* <Route path="/account/:id" element={<AccountScreen />} /> */}
    </Routes>
  );
}
