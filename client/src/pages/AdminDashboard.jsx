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
export default function AdminDashboard() {
  const location = useLocation();
  const [tab,setTab] = useState('');
  useEffect(() => {
    const urlParama = new URLSearchParams(location.search);
    const tabFromUrl = urlParama.get('tab');
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
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
      {tab === 'view-request' && <ManagerViewLeave/>}
      {tab === 'view-instructors-request' && <InstructorViewLeaveRequest/>}
      
    </div>
    </>
    
  )
}
