import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Header from "./Header";
import AdminDashSideBar from "./AdminDashSideBar";
export default function AdminViewEmployeeDetails() {
  const location = useLocation();
  // const [empId, setEmpId] = useState("");
  const { empId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [employee, setEmployee] = useState(null);

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(location.search);
  //   const idFromUrl = urlParams.get("empId");
  //   if (idFromUrl) {
  //     setEmpId(idFromUrl);
  //   }
  // }, [location.search]);
  

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
            <p className="font-semibold">{employee && employee.username}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>Role:</p>
            <p className="font-semibold">{employee && employee.role}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>Email:</p>
            <p className="font-semibold">{employee && employee.email}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>NIC:</p>
            <p className="font-semibold">{employee && employee.nic}</p>
          </div>

          <div className="flex flex-row justify-between">
            <p>Phone:</p>
            <p className="font-semibold">{employee && employee.phone}</p>
          </div>
          <div className="flex flex-row justify-between">
            <p>Address:</p>
            <p className="font-semibold">{employee && employee.address}</p>
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
  );
}
