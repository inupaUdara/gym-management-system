import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from "./Header";
import AdminDashSideBar from "./AdminDashSideBar";
import { Select } from "flowbite-react";
import EmployeeContact from "./EmployeeContact";
import { enqueueSnackbar } from "notistack";
export default function ManagerInstructorLeave() {
  const { leaveId } = useParams();
  const { empId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(null);
  const [LeaveIns, setLeaveIns] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [leaveData, setLeaveData] = useState({});
  const [contact, setContact] = useState(false);
  const navigate = useNavigate();

  console.log(leaveData);
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
          setLeaveData(data.allLeaves[0]);
          setLeaveIns(data.allLeaves[0]);
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

    const handleUpdateStatus = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch(`/api/leave/updateLeave/${leaveData._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(leaveData),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.message);
          return;
        }
  
        if (res.ok) {
          setError(null);
          enqueueSnackbar("Status updated successfully", { variant: "success" });
          navigate(`/admin-dashboard?tab=view-request`);
        }
      } catch (error) {
        setError("Something went wrong");
      }
    }
  

  return (
    <>
    <Header/>
    <div className="min-h-screen flex flex-col md:flex-row bg-[#d4d4d4]">
      <div className="md:w-56">
        <AdminDashSideBar/>
      </div>
    <div className="flex-grow w-full min-h-[60vh] bg-[#d4d4d4] p-10 md:p-20 justify-center">
      <div className="max-w-[600px] mx-auto rounded-md p-10 bg-white shadow-lg">
        <div className="flex items-center justify-center">
          <img
            src={employee && employee.profilePicture}
            alt={employee && employee.username}
            className="mt-10  rounded-full w-32 h-32 border-4 object-center object-cover shadow-md"
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
          <div className="flex flex-row justify-between mt-5 items-center">
          <p>Change Status:</p>
          <Select
            onChange={(e) => 
              setLeaveData({ ...leaveData, status: e.target.value})
            }
            value={leaveData.status}>
            
            <option value="Approve">Approve</option>
            <option value="Reject">Reject</option>
            <option value="Pending">Pending</option>
            

            </Select>
            <button className="bg-[#a80000] text-[#d4d4d4] p-2 rounded-lg font-semibold hover:opacity-80"
          onClick={handleUpdateStatus}>
            Update Status
          </button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center mt-7 gap-3">
          
          <button onClick={() => setContact(true)}
          className="bg-[#1f1f1f] text-white rounded-lg uppercase hover:opacity-80 p-2"
          >
          Contact
         </button>
         {contact && <EmployeeContact employee={employee}/>}
        </div>
        {success && <p className="text-green-500 text-center mt-5">{success}</p>}
      </div>
    </div>
    </div>
    </>
  )
}
