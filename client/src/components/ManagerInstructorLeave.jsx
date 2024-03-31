import { useEffect, useState } from "react"
import { Link, useParams } from 'react-router-dom';
import Header from "./Header";
import AdminDashSideBar from "./AdminDashSideBar";
export default function ManagerInstructorLeave() {
  const { leaveId } = useParams();
  const { empId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [LeaveIns, setLeaveIns] = useState(null);
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    // const urlParams = new URLSearchParams(location.search);
    // const idFromUrl = urlParams.get('leaveId');
    // if(idFromUrl){
    //   setLeaveId(idFromUrl);
    // }
    const fetchLeave = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/leave/getleave?leaveId=${leaveId}`);
        const data = await res.json();
        if(!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setLeaveIns(data.leaves[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    fetchLeave();
  }, [leaveId]);

  useEffect(
    () => {
      const fetchEmployee = async () => {
        try {
         
          setLoading(true);
          const res = await fetch(`/api/employee/getemployee?empId=${empId}`);
          const data = await res.json();
          if (!res.ok) {
            setError(true);
            setLoading(false);
            return;
          }
          if (res.ok) {
            setEmployee(data.employees[0]);
            setLoading(false);
            setError(false);
          }
        } catch (error) {
          setError(true);
          setLoading(false);
        }
      };
      fetchEmployee();
    },[empId],);
  

  return (
    <>
    <Header/>
    <div className="min-h-screen flex flex-col md:flex-row bg-[#d4d4d4]">
      <div className="md:w-56">
        <AdminDashSideBar/>
      </div>
    <div className="flex-grow w-full min-h-[60vh] bg-[#d4d4d4] p-10 md:p-20 justify-center">
      <div className="max-w-[500px] mx-auto rounded-md p-10 bg-white shadow-lg">
        <div className="flex items-center justify-center">
          <img
            src={employee && employee.profilePicture}
            alt={employee && employee.username}
            className="mt-10 p-3 rounded-full w-32 border-4 object-center"
          />
        </div>
        <div className="flex flex-col mt-5 p-2">
          <div className="text-center mb-5">
            <h1 className="text-2xl font-bold uppercase">
              {employee && employee.firstname} {employee && employee.lastname} 
            </h1>
          </div>
          <div className="flex flex-row justify-between">
            <p>Username:</p>
            <p className="font-semibold">{LeaveIns && LeaveIns.empUsername}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>Email:</p>
            <p className="font-semibold">{employee && employee.email}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>Phone:</p>
            <p className="font-semibold">{employee && employee.phone}</p>
          </div>
          <hr color="#707070"/>
          <div className="text-center mb-5 mt-3">
            <h1 className="text-xl font-bold uppercase">
              Leave Details 
            </h1>
          </div>
          <div className="flex flex-row justify-between">
            <p>Leave Type:</p>
            <p className="font-semibold">{LeaveIns && LeaveIns.leaveType}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>Start Date:</p>
            <p className="font-semibold">{LeaveIns && new Date(LeaveIns.startDate).toLocaleDateString()}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>End Date:</p>
            <p className="font-semibold">{LeaveIns && new Date(LeaveIns.endDate).toLocaleDateString()}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>Reason:</p>
            <p className="font-semibold">{LeaveIns && LeaveIns.reason}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>Status:</p>
            <p className="font-semibold">{LeaveIns && LeaveIns.status}</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button className="bg-[#a80000] text-[#d4d4d4] p-2 rounded-md font-semibold">
            Contact
          </button>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}
