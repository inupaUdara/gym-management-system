import { Alert, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BarChart } from "@tremor/react";

// import { updateFailure, updateStart, updateSuccess } from "../redux/user/userSlice";

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
  const [shiftChanges, setShiftChange] = useState([]);
  const [formData, setFormData] = useState({});
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const dispatch = useDispatch();

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
        const res = await fetch(
          `/api/employee/getemployee?role=Instructor&shift=6am-11am`
        );
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
        const res = await fetch(
          `/api/employee/getemployee?role=Instructor&shift=12pm-5pm`
        );
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
        const res = await fetch(
          `/api/employee/getemployee?role=Instructor&shift=5pm-10pm`
        );
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
    const fetchShiftChanges = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/shiftchange/getShiftChanges`);
        const data = await res.json();
        if (res.ok) {
          setLoading(false);
          setShiftChange(data.shiftChanges);
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
      fetchShiftChanges();
    }
  }, [currentUser._id]);

  const handleSubmit = async (e, employeeId, shiftChangeId) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }

    try {
      const res = await fetch(`/api/employee/updatebyshift/${employeeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setUpdateUserError(data.message);
      } else {
        setUpdateUserSuccess("Shift updated successfully");
        await fetch(`/api/shiftchange/updateStatus/${shiftChangeId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "shift changed" }),
        });
      }
    } catch (error) {
      setUpdateUserError(error.message);
    }
  };
  return (
    <div className="md:mx-auto">
      <h1 className="text-center m-5 font-bold text-2xl uppercase">
        Instructors Shifts
      </h1>

      <div className="flex flex-wrap gap-3 p-3 mx-auto justify-center">
        <div className="p-3 bg-white rounded-md shadow-lg w-full md:max-w-md">
          <h3 className="text-lg font-medium text-center text-tremor-content-strong dark:text-dark-tremor-content-strong ">
            Number of Instructors with their shift
          </h3>
          <BarChart
            className="mt-6 sm:max-w-full mx-auto bg-white "
            data={chartdata}
            index="name"
            categories={["Number of Instructors"]}
            colors={["red"]}
            valueFormatter={dataFormatter}
            yAxisWidth={50}
          />
        </div>
        <div className="flex flex-col w-full shadow-md p-2 rounded-md bg-white table-auto  md:mx-auto p-3 overflow-x-scroll scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 ">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2 uppercase">
              Instructor Shift Changes Request
            </h1>
            {updateUserSuccess && (
              <Alert color="success" className="mt-5">
                {updateUserSuccess}
              </Alert>
            )}
            {updateUserError && (
              <Alert color="failure" className="mt-5">
                {updateUserError}
              </Alert>
            )}
          </div>
          
          <Table hoverable className="">
            <Table.Head>
              <Table.HeadCell className="bg-[#707070] text-[#d4d4d4]">
                Instructor Name
              </Table.HeadCell>

              <Table.HeadCell className="bg-[#707070] text-[#d4d4d4]">
                Requested shift
              </Table.HeadCell>
              <Table.HeadCell className="bg-[#707070] text-[#d4d4d4]">
                Reason
              </Table.HeadCell>
              <Table.HeadCell className="bg-[#707070] text-[#d4d4d4]">
                Status
              </Table.HeadCell>
              <Table.HeadCell className="bg-[#707070] text-[#d4d4d4]">
                Update Shift
              </Table.HeadCell>
            </Table.Head>
            {shiftChanges.map((shift) => (
              <Table.Body key={shift._id} className="divide-y">
                <Table.Row className="bg-[#d4d4d4] text-[#1f1f1f]">
                  <Table.Cell>
                    <Link to={`/view-employee-details/${shift.employeeId}`}>
                      {shift.employeeName}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{shift.shiftName}</Table.Cell>
                  <Table.Cell>{shift.reason}</Table.Cell>
                  <Table.Cell>{shift.status}</Table.Cell>
                  <Table.Cell className="flex gap-2">
                    <select
                      className="mt-3 rounded-md bg-[#d4d4d4] text-[#1f1f1f]"
                      id="shift"
                      onChange={(e) =>
                        setFormData({ ...formData, shift: e.target.value })
                      }
                    >
                      <option>Select the shift</option>
                      <option value="6am-11am">6.00 AM to 11.00 AM</option>
                      <option value="12pm-5pm">12.00 PM to 5.00 PM</option>
                      <option value="5pm-10pm">5.00 PM to 10.00 PM</option>
                    </select>
                    <button
                      className="mt-1 text-green-500"
                      onClick={(e) => handleSubmit(e, shift.employeeId, shift._id)}
                    >
                      Update
                    </button>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 p-3 justify-center">
        {currentUser.isAdmin && employees.length > 0 ? (
          <>
            <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg w-full md:w-[330px]">
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
        ) : loading ? (
          <p className="text-xl text-gray-500 text-center">loading...</p>
        ) : (
          <div className="text-center">No Instructors found</div>
        )}
      </div>
    </div>
  );
}
