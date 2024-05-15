import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import EmployeeLogin from "./pages/EmployeeLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Header from "./components/Header";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import FooterCom from "./components/Footer";
import WorkoutPlans from "./pages/WorkoutPlans";
import MealPlans from "./pages/MealPlans";
import AdminViewEmployeeDetails from "./components/AdminViewEmployeeDetails";
import ManagerInstructorLeave from "./components/ManagerInstructorLeave";
import Payment from "./pages/Payment";
import Bmi from "./pages/Bmi";
import UpdateWorkout from "./components/UpdateWorkout";
import InstructorWorkout from "./components/InstructorWorkout";

export default function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />
        <Route element={<AdminPrivateRoute />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
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
        </Route>
        
        <Route path="/MealPlans" element={<MealPlans />} />
        <Route path="/Bmi" element={<Bmi />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
      <FooterCom />
    </BrowserRouter>
  );
}
