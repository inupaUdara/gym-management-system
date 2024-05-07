import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import EmployeeLogin from "./pages/EmployeeLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import FooterCom from "./components/Footer";

import AdminViewEmployeeDetails from "./components/AdminViewEmployeeDetails";
import ManagerInstructorLeave from "./components/ManagerInstructorLeave";


import Payment from "./pages/Payment";
import ManagerUpdateSupplements from "./components/ManagerUpdateSupplements";
// import Protein from "./pages/Protein";
import Shopping from "./pages/Cart";


import SupplementProuductView from "./pages/SupplementProuductView";
// import CartScreen from "./pages/Cart";



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
        {/* <Route path ="/protein" element={<Protein/>} /> */}
        <Route path="/shoppingCart/:SupplementProuductId" element={<Shopping/>}/>
        
       
        <Route path ="/SupplementProuductView/:SupplementProuductId" element={<SupplementProuductView/>} />
      
      
      </Routes>
      <FooterCom />
    </BrowserRouter>
  );
}
