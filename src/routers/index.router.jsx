import { Routes, Route, Navigate } from "react-router-dom";
import DashboardRouter from "./dashboard/index.router";
import AuthRouter from "./auth/index.router";

function AppRouter() {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRouter />} />
      <Route path="/dashboard/*" element={<DashboardRouter />} />
      <Route path="/*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default AppRouter;
