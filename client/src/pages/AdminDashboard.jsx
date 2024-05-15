import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import AdminDashSideBar from "../components/AdminDashSideBar";
import AdminDasAddEmp from "../components/AdminDasAddEmp";
import DasProfile from "../components/DasProfile";
import AdminDasInstructors from "../components/AdminDasInstructors";
import AdminDasManagers from "../components/AdminDasManagers";
import ManagerViewLeave from "../components/ManagerViewLeave";
import Header from "../components/Header";
import InstructorViewLeaveRequest from "../components/InstructorViewLeaveRequest";

import AdminInstructorShifts from "../components/AdminInstructorShifts";
import MemberDashProfile from "../components/MemberDashProfile";

import InstructorWorkout from "../components/InstructorWorkout";
import InstructorMealPlan from "../components/InstructorMealPlan";
import MemberRequests from "../components/MemberRequests";
import PlansProfile from "../components/PlansProfile";

import ManagerAddSupplements from "../components/ManagerAddSupplements";
import ManagerShowSupplements from "../components/ManagerShowSupplements";
import ManagerShowMassGainer from "../components/ManagerShowMassGainer";
import ManagerShowCreatine from "../components/ManagerShowCreatine";
import ManagerShowPreworkout from "../components/ManagerShowPreworkout";
import ManagerShowFatBurners from "../components/ManagerShowFatBurners";
import ManagerShowVitamins from "../components/ManagerShowVitamins";
import ManagerShowProtein from "../components/ManagerShowProtein";

import DashUsers from "../components/DashUsers";
import DashTasks from "../components/DashTasks";

import FinanceSum from "../components/PaymentComponents/Admin Components/FinanceSummary";
import TransacTable from "../components/PaymentComponents/Admin Components/TransactionTable";
import ManageShippingMethods from "../components/PaymentComponents/Admin Components/DisplayShipping";
import RefundMemberTable from "../components/PaymentComponents/refundTableMember";
import RefundAdminTable from "../components/PaymentComponents/Admin Components/refundAdminTable";

import AdminSubscriptionPanel from "../components/subpacComp/AdminSubscriptionPanel";
import DashboardComponent from "../components/DashboardComponent";
import SearchEmployee from "../components/SearchEmployee";
import InstructorShiftRequets from "../components/InstructorShiftRequets";
import AdminAnnouncement from "../components/AdminAnnouncement";
import AdminPromoPackage from "../components/subpacComp/AdminPromoPackage";
import AdminApprovePromo from "../components/subpacComp/AdminApprovePromo";

import InventoryAddNew from "../components/InventoryAddNew";
import InventoryViewItems from "../components/InventoryViewItems";
import InventoryUpdateItems from "../components/InventoryUpdateItems";
import InstructorServiceRequest from "../components/InstructorServiceRequest";
import InstructorAddServiceReq from "../components/InstructorAddServiceReq";
import ServiceRequestView from "../components/ManagerServiceRequestView";
import InstructorServiceRequestView from "../components/InstructorViewRequests";
import CoachingBookingsViewPage from "./CoachingBookingsVIewPage";

export default function AdminDashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const [leaveId, setLeaveId] = useState("");
  const [empId, setEmpId] = useState("");
  // const isInstructorRequest = location.pathname === "/admin-dashboard/viewinstructors-request/:leaveId";
  useEffect(() => {
    const urlParama = new URLSearchParams(location.search);
    const tabFromUrl = urlParama.get("tab");
    // const leaveIdFromUrl = urlParama.get('leaveId');
    // const empIdFromUrl = urlParama.get('empId');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
    // if(leaveIdFromUrl){
    //   setLeaveId(leaveIdFromUrl)
    // }
    // if(empIdFromUrl){
    //   setEmpId(empIdFromUrl)
    // }
  }, [location.search]);

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col md:flex-row bg-[#d4d4d4]">
        <div className="md:w-56">
          <AdminDashSideBar />
        </div>
        {tab === "member-task" && <DashTasks />}
        {tab === "admin-users" && <DashUsers />}
        {tab === "dashboard-comp" && <DashboardComponent />}
        {tab === "request-shift-change" && <InstructorShiftRequets />}
        {tab === "search-employee" && <SearchEmployee />}
        {tab === "addemployee" && <AdminDasAddEmp />}
        {tab === "profile" && <DasProfile />}
        {tab === "member-profile" && <MemberDashProfile />}
        {tab === "admin-instructors" && <AdminDasInstructors />}
        {tab === "admin-managers" && <AdminDasManagers />}
        {tab === "view-request" && <ManagerViewLeave />}
        {tab === "view-instructors-request" && <InstructorViewLeaveRequest />}

        {tab === "instuctor-shift" && <AdminInstructorShifts />}
        {/* {tab === 'view-instructor-request' && leaveId && <ManagerInstructorLeave/>}

      {tab === 'view-employee-details' && empId && <AdminViewEmployeeDetails/>} */}

        {tab === "admin-subscripition-panel" && <AdminSubscriptionPanel />}
        {tab === "admin-promo-subscripition-panel" && <AdminPromoPackage />}
        {tab === "admin-approval-subpackage-panel" && <AdminApprovePromo />}
        {tab === "admin-announcement" && <AdminAnnouncement />}

        {tab === "finance-summary" && <FinanceSum />}
        {tab === "all-transactions" && <TransacTable />}
        {tab === "manage-shipping" && <ManageShippingMethods />}
        {tab === "refund-member" && <RefundMemberTable />}
        {tab === "refund-admin" && <RefundAdminTable />}

        {tab === "add-supplements" && <ManagerAddSupplements />}
        {tab === "show-supplements" && <ManagerShowSupplements />}
        {tab === "show-Mass" && <ManagerShowMassGainer />}
        {tab === "show-Creatine" && <ManagerShowCreatine />}
        {tab === "show-Preworkout" && <ManagerShowPreworkout />}
        {tab === "show-FatBurners" && <ManagerShowFatBurners />}
        {tab === "show-Vitamins" && <ManagerShowVitamins />}
        {tab === "show-Protein" && <ManagerShowProtein />}

        {tab === "view-inventory" && <InventoryViewItems />}
        {tab === "update-inventory" && <InventoryUpdateItems />}
        {tab === "addinventory" && <InventoryAddNew />}
        {tab === "view-instructors-service-request" && (
          <InstructorServiceRequest />
        )}
        {tab === "view-manager-service-request" && <ServiceRequestView />}
        {tab === "view-instructor-service-request" && (
          <InstructorServiceRequestView />
        )}

        {tab === "member-plan-profile" && <PlansProfile />}
        {tab === "member-request" && <MemberRequests />}
        {tab === "create-mealplan" && <InstructorMealPlan />}

        {tab === "viewSessions" && <CoachingBookingsViewPage />}
      </div>
    </>
  );
}
