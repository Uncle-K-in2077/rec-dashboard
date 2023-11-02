import { Routes, Route } from "react-router-dom";
import IndexPage from "../../pages/index/index.page";
import DashboardLayout from "./../../layouts/dashboard.layout";
import RolesPage from "../../pages/Roles/Roles.page";
import UsersPage from "../../pages/Users/users.page";
import CreateUserPage from "../../pages/Users/createUser.page";

function DashboardRouter() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/users/create" element={<CreateUserPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/roles" element={<RolesPage />} />

        <Route path="/index" element={<IndexPage />} />
        <Route path="/" element={<IndexPage />} />
      </Routes>
    </DashboardLayout>
  );
}

export default DashboardRouter;
