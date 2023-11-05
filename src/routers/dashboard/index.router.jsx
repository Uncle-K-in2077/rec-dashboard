import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./../../layouts/dashboard.layout";
import RolesPage from "../../pages/Roles/Roles.page";
import UsersPage from "../../pages/Users/users.page";
import CreateUserPage from "../../pages/Users/createUser.page";
import IndexPage from "../../pages/Index/index.page";
import CreateRolePage from "../../pages/Roles/CreateRole.page";
import AuthProvider from "../../components/AuthProvider/AuthProvider";

function DashboardRouter() {
  return (
    <AuthProvider>
      <DashboardLayout>
        <Routes>
          <Route path="/users/:id" element={<CreateUserPage />} />
          <Route path="/users/create" element={<CreateUserPage />} />
          <Route path="/users" element={<UsersPage />} />

          <Route path="/roles/create" element={<CreateRolePage />} />
          <Route path="/roles" element={<RolesPage />} />

          <Route path="/index" element={<IndexPage />} />
          <Route path="/" element={<IndexPage />} />
        </Routes>
      </DashboardLayout>
    </AuthProvider>
  );
}

export default DashboardRouter;
