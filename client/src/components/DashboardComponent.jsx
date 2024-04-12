import { useEffect, useState } from "react";
import { HiArrowNarrowUp, HiOutlineUserGroup } from "react-icons/hi";
import { FaUserTie } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "flowbite-react";
import { MdOutlinePendingActions } from "react-icons/md";
export default function DashboardComponent() {
  const [instructors, setInstructors] = useState([]);
  const [totalInstructors, setTotalInstructors] = useState(0);
  const [lastMonthInstructors, setLastMonthInstructors] = useState(0);
  const [managers, setManagers] = useState([]);
  const [totalManagers, setTotalManagers] = useState(0);
  const [totalPendingReq, setTotalPendingReq] = useState(0);
  const [lastMonthManagers, setLastMonthManagers] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  console.log(totalManagers);
  useEffect(() => {
    const fetchInstructors = async () => {
      const res = await fetch(`/api/employee/getemployee?role=Instructor&limit=5`);
      const data = await res.json();
      if(res.ok) {
        setInstructors(data.employees);
        setTotalInstructors(data.totalEmployees);
        setLastMonthInstructors(data.lastMonthEmployees);
      }
    }

    const fetchManagers = async () => {
      const res =await fetch(`/api/employee/getemployee?role=Manager&limit=5`);
      const data = await res.json();
      if(res.ok) {
        setManagers(data.employees);
        setTotalManagers(data.totalEmployees);
        setLastMonthManagers(data.lastMonthEmployees);
      }
    }

    const fetchPendingLeave = async () => {
      const res = await fetch(
        `/api/leave/getleave?status=Pending`
      );
      const data = await res.json();
      if (res.ok) {
        setTotalPendingReq(data.AllTotalLeavesByStatus);
      }
    }

    if(currentUser.isAdmin) {
      fetchInstructors();
      fetchManagers();
      fetchPendingLeave();
    }

  }, [currentUser]);

  return (
    <div className="p-3 md:mx-auto">
      <div className="flex-wrap flex gap-4 justify-center">
        <div className="flex flex-col p-3 justify-between gap-4 md:w-72 w-full rounded-md shadow-md bg-white">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-[#1f1f1f] text-md uppercase">Total Instructors</h3>
              <p className="text-2xl font-semibold">{totalInstructors}</p>
              
            </div>
            <HiOutlineUserGroup className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg"/>
            
          </div>
          <div className="flex gap-2 text-sm">
              <span className="text-green-500 flex items-center">
                <HiArrowNarrowUp/>
                <p>{lastMonthInstructors}</p>
              </span>
              <div className="text-[#707070]">Last month</div>
            </div>
        </div>
        <div className="flex flex-col p-3 justify-between gap-4 md:w-72 w-full rounded-md shadow-md bg-white">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-[#1f1f1f] text-md uppercase">Total Managers</h3>
              <p className="text-2xl font-semibold">{totalManagers}</p>
              
            </div>
            <FaUserTie className="bg-blue-950 text-white rounded-full text-5xl p-3 shadow-lg"/>
            
          </div>
          <div className="flex gap-2 text-sm">
              <span className="text-green-500 flex items-center">
                <HiArrowNarrowUp/>
                <p>{lastMonthManagers}</p>
              </span>
              <div className="text-[#707070]">Last month</div>
            </div>
        </div>
        <div className="flex flex-col p-3 justify-between gap-4 md:w-72 w-full rounded-md shadow-md bg-white">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-[#1f1f1f] text-md uppercase">Total Pending Leaves</h3>
              <p className="text-2xl font-semibold">{totalPendingReq}</p>
              
            </div>
            <MdOutlinePendingActions className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg"/>
            
          </div>
          
        </div>
      </div>
      <div className="flex-wrap flex gap-4 py-3 mx-auto justify-center w-full">
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md bg-white">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2 uppercase">Instructors</h1>
            <Link to={"/admin-dashboard?tab=admin-instructors"}>
            <button className="border-2 border-[#a80000] rounded-md p-2 hover:bg-[#a80000] hover:text-white">See all</button>
            </Link>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="bg-[#707070] text-[#d4d4d4]">Image</Table.HeadCell>
              <Table.HeadCell className="bg-[#707070] text-[#d4d4d4]">Username</Table.HeadCell>
            </Table.Head>
            {instructors.map((instructor) => (
              <Table.Body key={instructor._id} className="divide-y">
                <Table.Row className="bg-[#d4d4d4]">

                <Table.Cell>
                  <img
                    src={instructor.profilePicture}
                    alt='user'
                    className="h-10 w-10 rounded-full bg-gray-500"
                  />
                </Table.Cell>
                <Table.Cell>{instructor.username}</Table.Cell>
                </Table.Row>
              </Table.Body>
            )
          )}
          </Table>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md bg-white">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p-2 uppercase">Managers</h1>
            <Link to={"/admin-dashboard?tab=admin-managers"}>
            <button className="border-2 border-[#a80000] rounded-md p-2 hover:bg-[#a80000] hover:text-white">See all</button>
            </Link>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="bg-[#707070] text-[#d4d4d4]">Image</Table.HeadCell>
              <Table.HeadCell className="bg-[#707070] text-[#d4d4d4]">Username</Table.HeadCell>
            </Table.Head>
            {managers.map((manager) => (
              <Table.Body key={manager._id} className="divide-y">
                <Table.Row className="bg-[#d4d4d4]">

                <Table.Cell>
                  <img
                    src={manager.profilePicture}
                    alt='user'
                    className="h-10 w-10 rounded-full bg-gray-500"
                  />
                </Table.Cell>
                <Table.Cell>{manager.username}</Table.Cell>
                </Table.Row>
              </Table.Body>
            )
          )}
          </Table>
        </div>
      </div>
    </div>
  )
}
