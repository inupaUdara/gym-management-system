import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom"; 
import AdminDashSideBar from "../components/AdminDashSideBar";
import AdminDasAddEmp from "../components/AdminDasAddEmp";
import DasProfile from "../components/DasProfile";
import AdminDasInstructors from "../components/AdminDasInstructors";
import AdminDasManagers from "../components/AdminDasManagers";
import InstructorDasRequests from "../components/InstructorDasRequests";
import ManagerViewLeave from "../components/ManagerViewLeave";
import Header from "../components/Header";
import InstructorViewLeaveRequest from "../components/InstructorViewLeaveRequest";
import ManagerInstructorLeave from "../components/ManagerInstructorLeave";
import AdminViewEmployeeDetails from "../components/AdminViewEmployeeDetails";
import InventoryAddNew from "../components/InventoryAddNew";
import InventoryViewItems from "../components/InventoryViewItems";
import InventoryUpdateItems from "../components/InventoryUpdateItems";

export default function AdminDashboard() {
  const location = useLocation();
  const [tab,setTab] = useState('');
  const [leaveId,setLeaveId] = useState('');
  const [empId,setEmpId] = useState('');
  // const isInstructorRequest = location.pathname === "/admin-dashboard/viewinstructors-request/:leaveId";
  useEffect(() => {
    const urlParama = new URLSearchParams(location.search);
    const tabFromUrl = urlParama.get('tab');
    // const leaveIdFromUrl = urlParama.get('leaveId');
    // const empIdFromUrl = urlParama.get('empId');
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
    // if(leaveIdFromUrl){
    //   setLeaveId(leaveIdFromUrl)
    // }
    // if(empIdFromUrl){
    //   setEmpId(empIdFromUrl)
    // }
  }, [location.search])


  return (
    <>
    <Header/>
    <div className="min-h-screen flex flex-col md:flex-row bg-[#d4d4d4]">
      <div className="md:w-56">
        <AdminDashSideBar/>
      </div>
      
      {tab === 'addemployee' && <AdminDasAddEmp/>}
      {tab === 'profile' && <DasProfile/>}
      {tab === 'admin-instructors' && <AdminDasInstructors/>}
      {tab === 'admin-managers' && <AdminDasManagers/>}
      {tab === 'instructor-request' && <InstructorDasRequests/>}
      {tab === 'view-request'  && <ManagerViewLeave/>}
      {tab === 'view-inventory' && <InventoryViewItems/>}
      {tab === 'update-inventory' && <InventoryUpdateItems/>}
      {tab === 'addinventory' && <InventoryAddNew/>}
      {tab === 'add-inventory'  && <InventoryAdd/>}     
      {tab === 'view-instructors-request' && <InstructorViewLeaveRequest/>}
      {/* {tab === 'view-instructor-request' && leaveId && <ManagerInstructorLeave/>}
      {tab === 'view-employee-details' && empId && <AdminViewEmployeeDetails/>} */}
    </div>
    </>
    
  )
}
