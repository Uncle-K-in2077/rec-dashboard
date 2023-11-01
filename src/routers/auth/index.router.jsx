import { Routes, Route } from "react-router-dom";
import LoginPage from "../../pages/login/login.page";
import AuthLayout from "./../../layouts/auth.layout";

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
