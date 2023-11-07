import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./../../layouts/dashboard.layout";
import RolesPage from "../../pages/Roles/Roles.page";
import UsersPage from "../../pages/Users/users.page";
import CreateUserPage from "../../pages/Users/createUser.page";
import IndexPage from "../../pages/Index/index.page";
import CreateRolePage from "../../pages/Roles/CreateRole.page";
import AuthProvider from "../../components/AuthProvider/AuthProvider";

import FeedBackPage from "../../pages/FeedBack/feedbacks.page";
import LandsPage from "../../pages/Lands/lands.page";

import RealEstates from "../../pages/RealEstates/real_estates.page";
import CreateRealEstate from "../../pages/RealEstates/CreateRealEstates.page";
import SingleRealEstates from "../../pages/RealEstates/SingleRealEstates.page";
import FeedBackDetailsPage from "../../pages/FeedBack/feedbackDetails.page";
import CreateLand from "../../pages/Lands/createLand.page";


function DashboardRouter() {
  return (
    <AuthProvider>
      <DashboardLayout>
        <Routes>
          <Route path="/users/:id" element={<CreateUserPage />} />
          <Route path="/users/create" element={<CreateUserPage />} />
          <Route path="/users" element={<UsersPage />} />

          <Route path="/roles/:id" element={<CreateRolePage />} />
          <Route path="/roles/create" element={<CreateRolePage />} />
          <Route path="/roles" element={<RolesPage />} />


          <Route path="/feedbacks" element={<FeedBackPage />} />
          <Route path="/feedbacks/:id" element={<FeedBackDetailsPage />} />

          <Route path="/real_estates" element={<RealEstates />} />
          <Route path="/real_estates/create" element={<CreateRealEstate />} />
          <Route path="/real_estates/:id" element={<SingleRealEstates />} />

          <Route path="/lands" element={<LandsPage />} />
          <Route path="/lands/create" element={<CreateLand />} />
          <Route path="/lands/:id" element={<CreateLand />} />


          <Route path="/index" element={<IndexPage />} />
          <Route path="/" element={<IndexPage />} />
          <Route path="*" element={<h1>not found</h1>} />
        </Routes>
      </DashboardLayout>
    </AuthProvider>
  );
}

export default DashboardRouter;
