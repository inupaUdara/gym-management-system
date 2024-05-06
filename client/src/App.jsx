import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Inventory from "./pages/Inventory";
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
import InventoryUpdateItems from "./components/InventoryUpdateItems";
import InstructorAddServiceReq from "./components/InstructorAddServiceReq";

export default function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />        
        <Route element={<AdminPrivateRoute />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/view-employee-details/:empId" element={<AdminViewEmployeeDetails />} />
          <Route path="/view-instructor-request/:leaveId/:empId" element={<ManagerInstructorLeave/>} /> 
          <Route path="/update-inventory/:inventoryId" element={<InventoryUpdateItems/>}/>
          <Route path="/add-service-request/:inventoryId" element={<InstructorAddServiceReq/>} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <FooterCom />
    </BrowserRouter>
  );
}
