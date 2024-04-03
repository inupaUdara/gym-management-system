import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function AdminInstructorShifts() {
  const { currentUser } = useSelector((state) => state.user);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch(`/api/employee/getemployee?role=Instructor`);
        const data = await res.json();
        if (res.ok) {
          setEmployees(data.employees);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchEmployees();
    }
  }, [currentUser._id]);
  return (
    
    <div className="md:mx-auto">
      <div className="flex flex-col gap-3 p-3 lg:flex-row">
      {currentUser.isAdmin && employees.length > 0 ? (
        <>
        <div  className="bg-white shadow-md border hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full  md:w-[330px]">
        <h1 className="text-center p-3 font-semibold">5.00 AM to 9.00 PM</h1>
        {employees.map((employee) => (
          
         <>
         {employee.shift === "5.00 AM to 9.00 PM" && (
          <div className="flex justify-between p-3 border hover:bg-[#d4d4d4]">
          <p>
            {employee.firstname} {employee.lastname}
          </p>
          <p>
            <Link to={`/view-employee-details/${employee._id}`}>
              <img
                src={employee.profilePicture}
                alt={employee.username}
                className="w-10 h-10 object-cover bg-gray-500 rounded-full"
              />
            </Link>
          </p>
          </div>
         )}
         
         
            </>
        )
          
      )}
      </div>
      
      <div  className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full md:w-[330px]">
      <h1 className="text-center p-3 font-semibold">6.00 AM to 12.00 PM</h1>
      {employees.map((employee) => (
        
       <>
       {employee.shift === "6.00 AM to 12.00 PM" && (
        <div className="flex justify-between p-3 border">
        <p>
          {employee.firstname} {employee.lastname}
        </p>
        <p>
          <Link to={`/view-employee-details/${employee._id}`}>
            <img
              src={employee.profilePicture}
              alt={employee.username}
              className="w-10 h-10 object-cover bg-gray-500 rounded-full"
            />
          </Link>
        </p>
        </div>
       )}
       
       
          </>
      )
        
    )}
    </div>
    <div  className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full md:w-[330px]">
      <h1 className="text-center p-3 font-semibold">12.00 PM to 5.00 PM</h1>
      {employees.map((employee) => (
        
       <>
       {employee.shift === "12.00 PM to 5.00 PM" && (
        <div className="flex justify-between p-3 border">
        <p>
          {employee.firstname} {employee.lastname}
        </p>
        <p>
          <Link to={`/view-employee-details/${employee._id}`}>
            <img
              src={employee.profilePicture}
              alt={employee.username}
              className="w-10 h-10 object-cover bg-gray-500 rounded-full"
            />
          </Link>
        </p>
        </div>
       )}
       
       
          </>
      )
        
    )}
    </div>
    </>
      ) : (
        <div className="text-center">No Instructors found</div>
      )}
      </div>
    </div>
  )
}
