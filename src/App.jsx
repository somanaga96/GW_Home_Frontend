import { Routes, Route } from "react-router-dom";
import SearchAccounts from "./component/SearchAccounts";
import CreateAccount from "./component/CreateAccount";
import PolicyInfo from "./component/PolicyInfo"
import YourHome from "./component/YourHome"
import YourNeeds from "./component/YourNeeds"
import Claims from "./component/Claims"
import Quote from "./component/Quote"
import Claims from "./component/Claims"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchAccounts />} />
      <Route path="/create-account" element={<CreateAccount />} />
     <Route path="/policy/:id" element={<PolicyInfo/>} />
<Route path="/policy" element={<PolicyInfo/>} /> 
<Route path="/yourHome" element={<YourHome/>} /> 
<Route path="/yourNeeds" element={<YourNeeds/>} /> 
<Route path="/claims" element={<Claims/>} /> 
<Route path="/quote" element={<Quote/>} />
<Route path="/quote/:id" element={<Quote/>} />
    </Routes>
  );
}
