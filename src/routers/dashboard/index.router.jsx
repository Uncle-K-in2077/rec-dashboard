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


import TaskPage from "../../pages/Task/Tasks.page";
import TaskStatus from "../../pages/TaskStatus/TaskStatus.page";
import PricingsPage from "../../pages/Pricings/pricings.page";
import PricingsStatusPage from "../../pages/PricingsStatus/pricingsStatus.page";
import CreatePricingStatus from "../../pages/PricingsStatus/createPricingStaus.page";
import CreatePricing from "../../pages/Pricings/createPricing.page";
import CreateTasks from "../../pages/Task/createTask.page";
import CreateStatusTask from "../../pages/TaskStatus/createStatus.page";


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

          <Route path="/pricings" element={<PricingsPage />} />
          <Route path="/pricings/:id" element={<CreatePricing />} />
          <Route path="/pricings/create" element={<CreatePricing />} />

          <Route path="/task" element={<TaskPage />} />
          <Route path="/task/:id" element={<CreateTasks />} />
          <Route path="/task/create" element={<CreateTasks />} />
          <Route path="/task_status" element={<TaskStatus />} />
          <Route path="/task_status/:id" element={<CreateStatusTask />} />
          <Route path="/task_status/create" element={<CreateStatusTask />} />

          <Route path="/pricing-status" element={<PricingsStatusPage />} />
          <Route path="/pricing-status/:id" element={<CreatePricingStatus />} />
          <Route path="/pricing-status/create" element={<CreatePricingStatus />} />



          <Route path="/index" element={<IndexPage />} />
          <Route path="/" element={<IndexPage />} />
          <Route path="*" element={<h1>not found</h1>} />
        </Routes>
      </DashboardLayout>
    </AuthProvider>
  );
}

export default DashboardRouter;
