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
import CreateSubPackage from "./pages/subPackagePages/CreateSubPackage";

import EditSubPackage from "./pages/subPackagePages/EditSubPackage";
import ShowSubPackage from "./pages/subPackagePages/ShowSubPackage";

import AdminViewEmployeeDetails from "./components/AdminViewEmployeeDetails";
import ManagerInstructorLeave from "./components/ManagerInstructorLeave";

import Payment from "./pages/Payment";
import SubscriptionPackages from "./pages/SubscriptionPackages";
import PromoSubPackage from "./pages/PromoSubPackage";


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
        <Route path="/SubscriptionPackages" element={<SubscriptionPackages />}/> 
        <Route path="/PromoSubPackage" element={<PromoSubPackage />}/>     
        <Route element={<AdminPrivateRoute />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/view-employee-details/:empId" element={<AdminViewEmployeeDetails />} />
          <Route path="/view-instructor-request/:leaveId/:empId" element={<ManagerInstructorLeave />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
      <Routes>
          <Route path="/subpackages/create" element={ <CreateSubPackage /> }/>
          <Route path="/subpackages/details/:id" element={ <ShowSubPackage /> }/>
          <Route path="/subpackages/edit/:id" element={ <EditSubPackage /> }/>
      </Routes>
      <FooterCom />
    </BrowserRouter>

  );
}
