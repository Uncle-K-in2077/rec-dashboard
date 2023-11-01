import { Routes, Route } from "react-router-dom";
import DashboardRouter from "./dashboard/index.router";
import AuthRouter from "./auth/index.router";

function AppRouter() {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRouter />} />
      <Route path="/dashboard/*" element={<DashboardRouter />} />
    </Routes>
  );
}

export default AppRouter;
