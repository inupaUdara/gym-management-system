import {
  Alert,
  Spinner,
  Select,
  Textarea,
  Modal,
  Button,
  Table,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlinePendingActions } from "react-icons/md";
import { FcLeave, FcApproval, FcCancel   } from "react-icons/fc";
import {
  HiArrowNarrowUp,
  HiOutlineExclamationCircle,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { FaUserTie } from "react-icons/fa";
import { set } from "mongoose";
export default function InstructorViewLeaveRequest() {
  const [pendingLeave, setPendingLeave] = useState([]);
  const [approveLeave, setApproveLeave] = useState([]);
  const [rejectLeave, setRejectLeave] = useState([]);
  const [totalRejectLeave, settotalRejectLeave] = useState(0);
  const [totalPendingLeave, settotalPendingLeave] = useState(0);
  const [lastMonthLeavesPending, setLastMonthLeavePendings] = useState(0);
  const [lastMonthLeavesRejected, setLastMonthLeavesRejected] = useState(0);
  const [lastMonthLeaves, setLastMonthLeaves] = useState(0);
  const [allTotalLeaves, setAllTotalLeaves] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPendingLeave = async () => {
      const res = await fetch(
        `/api/leave/getleave?employeeId=${currentUser._id}&status=Pending`
      );
      const data = await res.json();
      if (res.ok) {
        setPendingLeave(data.allLeaves);
        settotalPendingLeave(data.totalLeaves);
        setLastMonthLeaves(data.lastMonthLeaves);
        setLastMonthLeavePendings(data.lastMonthLeavesByStatus);
        setAllTotalLeaves(data.allTotalLeaves);
      }
    };

    const fetchApproveLeave = async () => {
      const res = await fetch(
        `/api/leave/getleave?employeeId=${currentUser._id}&status=Approve`
      );
      const data = await res.json();
      if (res.ok) {
        setApproveLeave(data.allLeaves);
      }
    }
    const fetchRejectLeave = async () => {
      const res = await fetch(
        `/api/leave/getleave?employeeId=${currentUser._id}&status=Reject`
      );
      const data = await res.json();
      if (res.ok) {
        setRejectLeave(data.allLeaves);
        settotalRejectLeave(data.totalLeaves);
        setLastMonthLeavesRejected(data.lastMonthLeavesByStatus);
      }
    }


    fetchPendingLeave();
    fetchApproveLeave();
    fetchRejectLeave();
  }, [currentUser._id]);

  console.log(pendingLeave);
  return (
    <div className="p-3 md:mx-auto">
      <div className="flex-wrap flex gap-4 justify-center">
        <div className="flex flex-col p-3 justify-between gap-4 md:w-72 w-full rounded-md shadow-md bg-white">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-[#1f1f1f] text-md uppercase">
                Total Pending Requets
              </h3>
              <p className="text-2xl font-semibold">{totalPendingLeave}</p>
            </div>
            <MdOutlinePendingActions className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              <p>{lastMonthLeavesPending}</p>
            </span>
            <div className="text-[#707070]">This month</div>
          </div>
        </div>
        <div className="flex flex-col p-3 justify-between gap-4 md:w-72 w-full rounded-md shadow-md bg-white">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-[#1f1f1f] text-md uppercase">
                Total Requests
              </h3>
              <p className="text-2xl font-semibold">{allTotalLeaves}</p>
            </div>
            <FcLeave  className="bg-blue-950 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              <p>{lastMonthLeaves}</p>
            </span>
            <div className="text-[#707070]">This month</div>
          </div>
        </div>
        <div className="flex flex-col p-3 justify-between gap-4 md:w-72 w-full rounded-md shadow-md bg-white">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-[#1f1f1f] text-md uppercase">
                Total Rejected Requests
              </h3>
              <p className="text-2xl font-semibold">{totalRejectLeave}</p>
            </div>
            <FcCancel   className="bg-black text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              <p>{lastMonthLeavesRejected}</p>
            </span>
            <div className="text-[#707070]">This month</div>
          </div>
        </div>
      </div>
      <div className="flex-wrap flex gap-4 py-3 mx-auto justify-center">
        <div className="flex flex-col w-full shadow-md p-2 rounded-md bg-white">
          <div className="flex p-3 text-sm font-semibold items-center">
            <h1 className="text-center p-2 uppercase">Pending requests</h1>
            <MdOutlinePendingActions/>
          </div>
          <div className="overflow-x-scroll scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300">

          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="bg-[#707070] text-[#d4d4d4]">
                Reason
              </Table.HeadCell>
              <Table.HeadCell className="bg-[#707070] text-[#d4d4d4]">
                Start Date
              </Table.HeadCell>
              <Table.HeadCell className="bg-[#707070] text-[#d4d4d4]">
                End Date
              </Table.HeadCell>
              <Table.HeadCell className="bg-[#707070] text-[#d4d4d4]">
                Status
              </Table.HeadCell>
            </Table.Head>
            {pendingLeave.map((leave) => (
              <Table.Body key={leave._id} className="divide-y">
                <Table.Row className="bg-[#d4d4d4]">
                  <Table.Cell className="text-[#1f1f1f]">{leave.reason}</Table.Cell>
                  <Table.Cell className="text-[#1f1f1f]"> {new Date(leave.startDate).toLocaleDateString()}</Table.Cell>
                  <Table.Cell className="text-[#1f1f1f]"> {new Date(leave.endDate).toLocaleDateString()}</Table.Cell>
                  <Table.Cell className="text-[#1f1f1f]"> <div className="flex"><MdOutlinePendingActions className="mt-1" />{leave.status}</div></Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {pendingLeave.length === 0 && (
            <div className="text-center text-[#1f1f1f] p-3">No pending requests</div>
          )}
          </div>
        </div>
      </div>
      <div className="flex-wrap flex gap-4 py-3 mx-auto justify-center">
        <div className="flex flex-col w-full shadow-md p-2 rounded-md bg-white">
          <div className="flex p-3 text-sm font-semibold items-center">
            <h1 className="text-center p-2 uppercase">Rejcted Leave requests</h1>
            <FcCancel />
          </div>
          <div className="overflow-x-scroll scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300">

          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="bg-[#707070] text-[#d4d4d4]">
                Reason
              </Table.HeadCell>
              <Table.HeadCell className="bg-[#707070] text-[#d4d4d4]">
                Start Date
              </Table.HeadCell>
              <Table.HeadCell className="bg-[#707070] text-[#d4d4d4]">
                End Date
              </Table.HeadCell>
              <Table.HeadCell className="bg-[#707070] text-[#d4d4d4]">
                Status
              </Table.HeadCell>
            </Table.Head>
            {rejectLeave.map((leave) => (
              <Table.Body key={leave._id} className="divide-y">
                <Table.Row className="bg-[#d4d4d4]">
                  <Table.Cell className="text-[#1f1f1f]">{leave.reason}</Table.Cell>
                  <Table.Cell className="text-[#1f1f1f]"> {new Date(leave.startDate).toLocaleDateString()}</Table.Cell>
                  <Table.Cell className="text-[#1f1f1f]"> {new Date(leave.endDate).toLocaleDateString()}</Table.Cell>
                  <Table.Cell className="text-[#1f1f1f]"> <div className="flex"><FcCancel className="mt-1" />{leave.status}</div></Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {rejectLeave.length === 0 && (
            <div className="text-center text-[#1f1f1f] p-3">No requests in history</div>
          )}
          </div>
        </div>
      </div>
      <div className="flex-wrap flex gap-4 py-3 mx-auto justify-center">
        <div className="flex flex-col w-full shadow-md p-2 rounded-md bg-white">
          <div className="flex p-3 text-sm font-semibold items-center">
            <h1 className="text-center p-2 uppercase">Leave request history - approved</h1>
            <FcApproval />
          </div>
          <div className="overflow-x-scroll scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300">

          <Table hoverable>
            <Table.Head>
              <Table.HeadCell className="bg-[#707070] text-[#d4d4d4]">
                Reason
              </Table.HeadCell>
              <Table.HeadCell className="bg-[#707070] text-[#d4d4d4]">
                Start Date
              </Table.HeadCell>
              <Table.HeadCell className="bg-[#707070] text-[#d4d4d4]">
                End Date
              </Table.HeadCell>
              <Table.HeadCell className="bg-[#707070] text-[#d4d4d4]">
                Status
              </Table.HeadCell>
            </Table.Head>
            {approveLeave.map((leave) => (
              <Table.Body key={leave._id} className="divide-y">
                <Table.Row className="bg-[#d4d4d4]">
                  <Table.Cell className="text-[#1f1f1f]">{leave.reason}</Table.Cell>
                  <Table.Cell className="text-[#1f1f1f]"> {new Date(leave.startDate).toLocaleDateString()}</Table.Cell>
                  <Table.Cell className="text-[#1f1f1f]"> {new Date(leave.endDate).toLocaleDateString()}</Table.Cell>
                  <Table.Cell className="text-[#1f1f1f]"> <div className="flex"><FcApproval className="mt-1" />{leave.status}</div></Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {approveLeave.length === 0 && (
            <div className="text-center text-[#1f1f1f] p-3">No requests in history</div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
