import { Outlet } from "react-router-dom";
import SubmissionSideNav from "./SubmissionSideNav";
import "../css/submission-layout.css";

export default function SubmissionLayout() {
  return (
    <div className="submission-layout">
      <SubmissionSideNav />
      <main className="submission-content">
        <Outlet />
      </main>
    </div>
  );
}
