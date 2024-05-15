import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import EmployeeLogin from "./pages/EmployeeLogin";

import Header from "./components/Header";

import AdminDashboard from "./pages/AdminDashboard";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import FooterCom from "./components/Footer";

import WorkoutPlans from "./pages/WorkoutPlans";
import MealPlans from "./pages/MealPlans";
import Bmi from "./pages/Bmi";
import UpdateWorkout from "./components/UpdateWorkout";
import InstructorWorkout from "./components/InstructorWorkout";

import CreateSubPackage from "./pages/subPackagePages/CreateSubPackage";

import EditSubPackage from "./pages/subPackagePages/EditSubPackage";
import ShowSubPackage from "./pages/subPackagePages/ShowSubPackage";

import AdminViewEmployeeDetails from "./components/AdminViewEmployeeDetails";
import ManagerInstructorLeave from "./components/ManagerInstructorLeave";

import Payment from "./pages/Checkout/Payment";
import ShippingPage from "./pages/Checkout/ShippingPage";
import PaymentSelection from "./pages/Checkout/PaymentSelect";
import PaymentSuccess from "./pages/Checkout/PaymentSuccess";
import CreateShippingMethod from "./components/PaymentComponents/Admin Components/ManageShipping";
import EditShipping from "./pages/Checkout/EditShipping";
import Refund from "./pages/Checkout/RefundPage";
import PaymentPackage from "./pages/Checkout/PaymentPackage";
import PCKPayment from "./pages/Checkout/PackagePaymentSelect";

import ManagerUpdateSupplements from "./components/ManagerUpdateSupplements";
// import Protein from "./pages/Protein";
import Shopping from "./pages/Cart";

import SupplementProuductView from "./pages/SupplementProuductView";
// import CartScreen from "./pages/Cart";

import YourTasks from "./pages/YourTasks";
import UpdateTasks from "./pages/UpdateTask";
import MemberView from "./pages/MemberView";
import SubscriptionPackages from "./pages/SubscriptionPackages";
import PromoSubPackage from "./pages/PromoSubPackage";
import ForgotPassword from "./pages/ForgotPassword";
import OTPVerification from "./pages/OTPVerification";
import ResetPassword from "./pages/ResetPassword";

//import inventory management
import Inventory from "./pages/Inventory";
import InstructorAddServiceReq from "./components/InstructorAddServiceReq";
import InventoryUpdateItems from "./components/InventoryUpdateItems";
import EmailForm from "./components/EmailForm";

import Coaching from "./pages/Coaching";
import CoachingFormPage from "./pages/CoachingFormPage";
import CoachingBookingsVIewPage from "./pages/CoachingBookingsVIewPage";
import CoachingMainPage from "./pages/CoachingMainPage";
import CoachingUpdate from "./pages/CoachingUpdate";

export default function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />

        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />

        <Route
          path="/SubscriptionPackages"
          element={<SubscriptionPackages />}
        />
        {/* inventory */}
        <Route path="/inventory" element={<Inventory />} />

        <Route path="/PromoSubPackage" element={<PromoSubPackage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp-verify" element={<OTPVerification />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route element={<AdminPrivateRoute />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />

          <Route
            path="/updateSupplements/:supplementId"
            element={<ManagerUpdateSupplements />}
          />

          <Route
            path="/view-employee-details/:empId"
            element={<AdminViewEmployeeDetails />}
          />
          <Route
            path="/view-instructor-request/:leaveId/:empId"
            element={<ManagerInstructorLeave />}
          />

          <Route
            path="/update-workout/:workoutId"
            element={<UpdateWorkout />}
          />
          <Route
            path="/create-workout/:userId"
            element={<InstructorWorkout />}
          />

          <Route path="/WorkoutPlans" element={<WorkoutPlans />} />
          <Route path="/MealPlans" element={<MealPlans />} />
          <Route path="/yourtasks" element={<YourTasks />} />
          <Route path="/update-tasks/:taskId" element={<UpdateTasks />} />
          <Route path="/member-view/:userId" element={<MemberView />} />

          <Route
            path="/update-inventory/:inventoryId"
            element={<InventoryUpdateItems />}
          />
          <Route
            path="/add-service-request/:inventoryId"
            element={<InstructorAddServiceReq />}
          />
          <Route path="/email-form/:requestId" element={<EmailForm />} />
        </Route>

        <Route path="/Bmi" element={<Bmi />} />

        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* <Route path ="/protein" element={<Protein/>} /> */}
        <Route
          path="/shoppingCart/:SupplementProuductId"
          element={<Shopping />}
        />

        <Route
          path="/SupplementProuductView/:SupplementProuductId"
          element={<SupplementProuductView />}
        />
      </Routes>
      <Routes>
        <Route path="/subpackages/create" element={<CreateSubPackage />} />
        <Route path="/subpackages/details/:id" element={<ShowSubPackage />} />
        <Route path="/subpackages/edit/:id" element={<EditSubPackage />} />
      </Routes>
      <Routes>
        <Route path="/Checkout/payment" element={<Payment />} />
        <Route path="/Checkout/payment/shipping" element={<ShippingPage />} />
        <Route
          path="/Checkout/payment/paymentSelect"
          element={<PaymentSelection />}
        />
        <Route path="/Checkout/payment/success" element={<PaymentSuccess />} />
        <Route path="/shipping/create" element={<CreateShippingMethod />} />
        <Route path="/shipping/edit/:id" element={<EditShipping />} />
        <Route path="/refundRequests" element={<Refund />} />
        <Route path="/Checkout/paymentPCKG" element={<PaymentPackage />} />
        <Route
          path="/Checkout/paymentPCKG/paymentSelect"
          element={<PCKPayment />}
        />
      </Routes>

      <Routes>
        <Route path="/coaching" element={<Coaching />} />

        <Route path="/scheduleSession" element={<CoachingFormPage />}></Route>

        <Route path="/coachin-page" element={<CoachingMainPage />}></Route>
        <Route path="/updateUser/:id" element={<CoachingUpdate />}></Route>
      </Routes>
      <FooterCom />
    </BrowserRouter>
  );
}
