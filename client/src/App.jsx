import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Supplements from "./pages/Supplements";
import LiftingAccessories from "./pages/LiftingAccessories";
import ShakersAndBottels from "./pages/ShakersAndBottles";
import GiftCollection from "./pages/GiflCollection";
import OffersAndDeals from "./pages/OffersAndDeals";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import EmployeeLogin from "./pages/EmployeeLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Header from "./components/Header";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import FooterCom from "./components/Footer";

import AdminViewEmployeeDetails from "./components/AdminViewEmployeeDetails";
import ManagerInstructorLeave from "./components/ManagerInstructorLeave";


import Payment from "./pages/Payment";
import ManagerUpdateSupplements from "./components/ManagerUpdateSupplements";


export default function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/supplements" element={<Supplements />} />
        <Route path="/liftingaccessories" element={<LiftingAccessories />} />
        <Route path="/shakersandbottles" element={<ShakersAndBottels />} />
        <Route path="/giflcollection" element={<GiftCollection />} />
        <Route path="/offersanddeals" element={<OffersAndDeals />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />        
        <Route element={<AdminPrivateRoute />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/view-employee-details/:empId" element={<AdminViewEmployeeDetails />} />
          <Route path="/view-instructor-request/:leaveId/:empId" element={<ManagerInstructorLeave />} />
          <Route path="/updateSupplements/:supplementId" element={<ManagerUpdateSupplements />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/payment" element={<Payment />} />
        
      
      </Routes>
      <FooterCom />
    </BrowserRouter>
  );
}
