import { Routes, Route } from "react-router-dom";
import AuthLayout from "./../../layouts/auth.layout";
import LoginPage from "../../pages/Login/login.page";

function AuthRouter() {
  return (
    <AuthLayout>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </AuthLayout>
  );
}

export default AuthRouter;
