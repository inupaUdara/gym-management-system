import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BarChart } from "@tremor/react";

export default function AdminInstructorShifts() {
  const { currentUser } = useSelector((state) => state.user);
  const [employees, setEmployees] = useState([]);
  const [morningEmployees, setMorningEmployees] = useState([]);
  const [afternoonEmployees, setAfternoonEmployees] = useState([]);
  const [nightEmployees, setNightEmployees] = useState([]);
  const [totalMorningShiftIns, setMorningShiftIns] = useState(0);
  const [totalAfternoonShiftIns, setAfternoonShiftIns] = useState(0);
  const [totalNightShiftIns, setNightShiftIns] = useState(0);
  const [loading, setLoading] = useState(false);

  const chartdata = [
    {
      name: "6 AM to 11 AM",
      "Number of Instructors": totalMorningShiftIns,
    },
    {
      name: "12 PM to 5 PM",
      "Number of Instructors": totalAfternoonShiftIns,
    },
    {
      name: "5 PM to 10 PM",
      "Number of Instructors": totalNightShiftIns,
    },
  ];
  const dataFormatter = (number) =>
    Intl.NumberFormat("us").format(number).toString();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/employee/getemployee?role=Instructor`);
        const data = await res.json();
        if (res.ok) {
          setLoading(false);
          setEmployees(data.employees);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchEmployeesMorningCount = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/employee/getemployee?role=Instructor&shift=6am-11am`);
        const data = await res.json();
        if (res.ok) {
          setLoading(false);
          setMorningShiftIns(data.totalShiftEmployees);
          setMorningEmployees(data.employees);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchEmployeesAfternoonCount = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/employee/getemployee?role=Instructor&shift=12pm-5pm`);
        const data = await res.json();
        if (res.ok) {
          setLoading(false);
          setAfternoonShiftIns(data.totalShiftEmployees);
          setAfternoonEmployees(data.employees);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchEmployeesNightCount = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/employee/getemployee?role=Instructor&shift=5pm-10pm`);
        const data = await res.json();
        if (res.ok) {
          setLoading(false);
          setNightShiftIns(data.totalShiftEmployees);
          setNightEmployees(data.employees);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchEmployees();
      fetchEmployeesMorningCount();
      fetchEmployeesAfternoonCount();
      fetchEmployeesNightCount();
    }
  }, [currentUser._id]);
  return (
    <div className="md:mx-auto">
      <h1 className="text-center m-5 font-bold text-2xl uppercase">
        Instructors Shifts
      </h1>
      
      <div className="p-3 bg-white m-3 rounded-md shadow-lg">
      <h3 className="text-lg font-medium text-center text-tremor-content-strong dark:text-dark-tremor-content-strong ">
        Number of Instructors with their shift
      </h3>
        <BarChart
          className="mt-6 sm:w-2/4 mx-auto bg-white "
          data={chartdata}
          index="name"
          categories={["Number of Instructors"]}
          colors={["violet"]}
          valueFormatter={dataFormatter}
          yAxisWidth={50}
        />
      </div>
      <div className="flex flex-wrap gap-3 p-3">
        {currentUser.isAdmin && employees.length > 0 ? (
          <>
            <div className="bg-white shadow-md border hover:shadow-lg transition-shadow h-full rounded-lg w-full md:w-[330px]">
              <h1 className="text-center p-3 font-semibold">
                6.00 AM to 11.00 AM
              </h1>
              {morningEmployees.map((employee) => (
                <>
                  
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
                  
                </>
              ))}
            </div>

            <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full md:w-[330px]">
              <h1 className="text-center p-3 font-semibold">
                12.00 PM to 5.00 PM
              </h1>
              {afternoonEmployees.map((employee) => (
                <>
                  
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
                
                </>
              ))}
            </div>
            <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg w-full md:w-[330px]">
              <h1 className="text-center p-3 font-semibold">
                5.00 PM to 10.00 PM
              </h1>
              {nightEmployees.map((employee) => (
                <>
                  
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
                  
                </>
              ))}
            </div>
          </>
        ) : loading ?  (<p className="text-xl text-gray-500 text-center">loading...</p>): (
          <div className="text-center">No Instructors found</div>
        )}
      </div>
    </div>
  );
}
