import { useEffect, useState } from "react";
import { HiArrowNarrowUp, HiOutlineUserGroup } from "react-icons/hi";
import { FaUserTie } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table, Datepicker } from "flowbite-react";
import { MdOutlinePendingActions } from "react-icons/md";
import { BarChart } from "@tremor/react";
import { BarList } from "@tremor/react";

export default function DashboardComponent() {
  const [instructors, setInstructors] = useState([]);
  const [totalInstructors, setTotalInstructors] = useState(0);
  const [lastMonthInstructors, setLastMonthInstructors] = useState(0);
  const [managers, setManagers] = useState([]);
  const [totalManagers, setTotalManagers] = useState(0);
  const [totalPendingReq, setTotalPendingReq] = useState(0);
  const [lastMonthManagers, setLastMonthManagers] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  const [totalMorningShiftIns, setMorningShiftIns] = useState(0);
  const [totalAfternoonShiftIns, setAfternoonShiftIns] = useState(0);
  const [totalNightShiftIns, setNightShiftIns] = useState(0);
  const [employeeLeaves, setEmployeeLeaves] = useState([]);

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
    const fetchInstructors = async () => {
      const res = await fetch(
        `/api/employee/getemployee?role=Instructor&limit=5`
      );
      const data = await res.json();
      if (res.ok) {
        setInstructors(data.employees);
        setTotalInstructors(data.totalEmployees);
        setLastMonthInstructors(data.lastMonthEmployees);
      }
    };

    const fetchManagers = async () => {
      const res = await fetch(`/api/employee/getemployee?role=Manager&limit=5`);
      const data = await res.json();
      if (res.ok) {
        setManagers(data.employees);
        setTotalManagers(data.totalEmployees);
        setLastMonthManagers(data.lastMonthEmployees);
      }
    };

    const fetchPendingLeave = async () => {
      const res = await fetch(`/api/leave/getleave?status=Pending`);
      const data = await res.json();
      if (res.ok) {
        setTotalPendingReq(data.AllTotalLeavesByStatus);
      }
    };

    const fetchEmployeesMorningCount = async () => {
      try {
        const res = await fetch(
          `/api/employee/getemployee?role=Instructor&shift=6am-11am`
        );
        const data = await res.json();
        if (res.ok) {
          setMorningShiftIns(data.totalShiftEmployees);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchEmployeesAfternoonCount = async () => {
      try {
        const res = await fetch(
          `/api/employee/getemployee?role=Instructor&shift=12pm-5pm`
        );
        const data = await res.json();
        if (res.ok) {
          setAfternoonShiftIns(data.totalShiftEmployees);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchEmployeesNightCount = async () => {
      try {
        const res = await fetch(
          `/api/employee/getemployee?role=Instructor&shift=5pm-10pm`
        );
        const data = await res.json();
        if (res.ok) {
          setNightShiftIns(data.totalShiftEmployees);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchLeaves = async () => {
      try {
        const res = await fetch(`/api/leave/getleave`);
        const data = await res.json();
        if (res.ok) {
          setEmployeeLeaves(data.employees);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchInstructors();
      fetchManagers();
      fetchPendingLeave();
      fetchEmployeesMorningCount();
      fetchEmployeesAfternoonCount();
      fetchEmployeesNightCount();
      fetchLeaves();
    }
  }, [currentUser]);

  return (
    <div className="p-3 md:mx-auto">
      <div className="flex-wrap flex gap-4 justify-center">
      {/* <Datepicker inline className="max-w-xs"/>; */}
        <div className="flex flex-col p-3 justify-between gap-4 md:w-72 w-full rounded-md shadow-md bg-white">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-[#1f1f1f] text-md uppercase">
                Total Instructors
              </h3>
              <p className="text-2xl font-semibold">{totalInstructors}</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              <p>{lastMonthInstructors}</p>
            </span>
            <div className="text-[#707070]">Last month</div>
          </div>
        </div>
        <div className="flex flex-col p-3 justify-between gap-4 md:w-72 w-full rounded-md shadow-md bg-white">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-[#1f1f1f] text-md uppercase">
                Total Managers
              </h3>
              <p className="text-2xl font-semibold">{totalManagers}</p>
            </div>
            <FaUserTie className="bg-blue-950 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              <p>{lastMonthManagers}</p>
            </span>
            <div className="text-[#707070]">Last month</div>
          </div>
        </div>
        <div className="flex flex-col p-3 justify-between gap-4 md:w-72 w-full rounded-md shadow-md bg-white">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-[#1f1f1f] text-md uppercase">
                Total Pending Leaves
              </h3>
              <p className="text-2xl font-semibold">{totalPendingReq}</p>
            </div>
            <MdOutlinePendingActions className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
        </div>
      </div>

      <div className="flex-wrap flex gap-4 py-3 mx-auto justify-center ">
       
        <div className="flex flex-col w-full md:max-w-sm shadow-md p-2 rounded-md bg-white">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2 uppercase">Instructors</h1>
            <Link to={"/admin-dashboard?tab=admin-instructors"}>
              <button className="border-2 border-[#a80000] rounded-md p-2 hover:bg-[#a80000] hover:text-white">
                See all
              </button>
            </Link>
          </div>
          <Table hoverable className="">
            <Table.Head>
              <Table.HeadCell className="bg-[#707070] text-[#d4d4d4]">
                Image
              </Table.HeadCell>
              <Table.HeadCell className="bg-[#707070] text-[#d4d4d4]">
                Username
              </Table.HeadCell>
            </Table.Head>
            {instructors.map((instructor) => (
              <Table.Body key={instructor._id} className="divide-y">
                <Table.Row className="bg-[#d4d4d4]">
                  <Table.Cell>
                    <img
                      src={instructor.profilePicture}
                      alt="user"
                      className="h-10 w-10 rounded-full bg-gray-500"
                    />
                  </Table.Cell>
                  <Table.Cell>{instructor.username}</Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </div>
        <div className="flex flex-col w-full md:max-w-sm shadow-md p-2 rounded-md bg-white">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2 uppercase">Managers</h1>
            <Link to={"/admin-dashboard?tab=admin-managers"}>
              <button className="border-2 border-[#a80000] rounded-md p-2 hover:bg-[#a80000] hover:text-white">
                See all
              </button>
            </Link>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="bg-[#707070] text-[#d4d4d4]">
                Image
              </Table.HeadCell>
              <Table.HeadCell className="bg-[#707070] text-[#d4d4d4]">
                Username
              </Table.HeadCell>
            </Table.Head>
            {managers.map((manager) => (
              <Table.Body key={manager._id} className="divide-y">
                <Table.Row className="bg-[#d4d4d4]">
                  <Table.Cell>
                    <img
                      src={manager.profilePicture}
                      alt="user"
                      className="h-10 w-10 rounded-full bg-gray-500"
                    />
                  </Table.Cell>
                  <Table.Cell>{manager.username}</Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </div>
      </div>
      <div className="flex-wrap flex gap-4 py-3 mx-auto justify-center ">
        <div className="p-3 bg-white rounded-md shadow-lg md:max-w-sm">
          <div className="flex justify-between p-3 text-sm font-semibold gap-2 items-center">
            <h1 className="font-semibold text-sm p-3 text-center uppercase">
              Number of Instructors with their shift
            </h1>
            <Link to={"/admin-dashboard?tab=instuctor-shift"}>
              <button className="border-2 border-[#a80000] rounded-md p-2 hover:bg-[#a80000] hover:text-white">
                View
              </button>
            </Link>
          </div>
          <BarChart
            className="mt-6 w-full mx-auto bg-white "
            data={chartdata}
            index="name"
            categories={["Number of Instructors"]}
            colors={["red"]}
            valueFormatter={dataFormatter}
            yAxisWidth={50}
          />
        </div>
        <div className="p-3 bg-white rounded-md shadow-lg w-full items-center md:max-w-sm">
          <div className="flex justify-between p-3 text-sm font-semibold gap-2 items-center">
            <h1 className="font-semibold text-sm p-3 text-center uppercase">
              Total Instructor Requests
            </h1>
            <Link to={"/admin-dashboard?tab=view-request"}>
              <button className="border-2 border-[#a80000] rounded-md p-2 hover:bg-[#a80000] hover:text-white">
                View
              </button>
            </Link>
          </div>
          <p className="mt-4 mb-2 text-tremor-default flex items-center justify-between font-semibold text-[#1f1f1f]">
            <span>Instructor</span>
            <span>Total Leaves</span>
          </p>

          <BarList
            data={employeeLeaves.map((employee) => ({
              name: employee._id,
              value: employee.totalLeaves,
            }))}
            className="mx-auto"
            color={"red"}
          />
        </div>
      </div>
    </div>
  );
}
