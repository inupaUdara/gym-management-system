import { Modal, Table, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { BarList } from "@tremor/react";
import { enqueueSnackbar } from "notistack";

export default function AdminDasInstructors() {
  const { currentUser } = useSelector((state) => state.user);
  const [leavesByCurrentMonth, setLeavesByCurrentMonth] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [leaveIdToDelete, setLeaveIdToDelete] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMonth, setLoadingMonth] = useState(false);
  const [employeeLeaves, setEmployeeLeaves] = useState([]);

  

  useEffect(() => {
    const fetchLeavesByCurrentMonth = async () => {
      try {
        setLoadingMonth(true);
        const res = await fetch(`/api/leave/getleave`);
        const data = await res.json();
        if (res.ok) {
          setLoadingMonth(false);
          setLeavesByCurrentMonth(data.leavesByCurrentMonth);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchLeaves = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/leave/getleave`);
        const data = await res.json();
        if (res.ok) {
          setLoading(false);
          setLeaves(data.leaves);
          setEmployeeLeaves(data.employees);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin || currentUser.role === "Manager") {
      fetchLeaves();
      fetchLeavesByCurrentMonth();
    }
  }, [currentUser._id]);

  const handleDeleteLeave = async () => {
    try {
      const res = await fetch(`/api/leave/deleteleave/${leaveIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setLeaves((prev) =>
          prev.filter((leave) => leave._id !== leaveIdToDelete)
        );
        enqueueSnackbar("Leave request deleted successfully", {variant: "success"});
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-3 md:mx-auto">
      <h1 className="text-center m-4 font-bold text-2xl text-[#1f1f1f]">
        Instructor Leave Request
      </h1>
      <div className="items-start w-full md:max-w-sm bg-white p-3 rounded-md shadow-lg">
        <p className="mt-4 mb-2 text-tremor-default flex items-center justify-between font-semibold text-[#1f1f1f] dark:text-dark-tremor-content">
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
      <div className="flex-wrap flex gap-4 py-3 justify-center">
        <div className="flex flex-col w-full shadow-md p-2 rounded-md gap-4 bg-white">
          <div className="table-auto md:mx-auto p-3 overflow-x-scroll scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
            <h3 className="mb-3 uppercase font-semibold">
              This month leave requests
            </h3>

            {currentUser.isAdmin && leavesByCurrentMonth.length > 0 ? (
              <>
                <Table hoverable className="shadow-md bg">
                  <Table.Head>
                    <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
                      Date of request
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
                      Username
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
                      Leave Type
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
                      Start Date
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
                      End date
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
                      reason
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
                      status
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
                      status update
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
                      Delete
                    </Table.HeadCell>
                  </Table.Head>
                  {leavesByCurrentMonth.map((leave) => (
                    <Table.Body className="divide-y" key={leave._id}>
                      <Table.Row className="bg-[white] dark:border-gray-700 dark:bg-gray-800 text-[#1f1f1f]">
                        <Table.Cell>
                          {new Date(leave.createdAt).toLocaleDateString()}
                        </Table.Cell>
                        <Table.Cell>{leave.empUsername}</Table.Cell>
                        <Table.Cell>{leave.leaveType}</Table.Cell>
                        <Table.Cell>
                          {new Date(leave.startDate).toLocaleDateString()}
                        </Table.Cell>
                        <Table.Cell>
                          {new Date(leave.endDate).toLocaleDateString()}
                        </Table.Cell>
                        <Table.Cell>{leave.reason}</Table.Cell>
                        <Table.Cell>{leave.status}</Table.Cell>
                        <Table.Cell className="text-green-600 cursor-pointer hover:underline">
                        <Link
                          to={`/view-instructor-request/${leave._id}/${leave.employeeId}`}
                        >
                            <button className="disabled:text-slate-400" disabled={leave.status === "Approve" || leave.status === "Reject"}>Update status</button>
                        </Link>
                          </Table.Cell>
                        <Table.Cell>
                          <span
                            onClick={() => {
                              setShowModal(true);
                              setLeaveIdToDelete(leave._id);
                            }}
                            className="font-medium text-red-500 hover:underline cursor-pointer"
                          >
                            Delete
                          </span>
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  ))}
                </Table>
              </>
            ) : loadingMonth ? (
              <p className="text-xl text-gray-500">Loading...</p>
            ) : (
              <p>You have no leave request for this month yet!</p>
            )}

            <Modal
              show={showModal}
              onClose={() => setShowModal(false)}
              popup
              size="md"
            >
              <Modal.Header />
              <Modal.Body>
                <div className="text-center">
                  <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
                  <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this user?
                  </h3>
                  <div className="flex justify-center gap-4">
                    <Button color="failure" onClick={handleDeleteLeave}>
                      Yes, I'm sure
                    </Button>
                    <Button color="gray" onClick={() => setShowModal(false)}>
                      No, cancel
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
      <div className="flex-wrap flex gap-4 py-3 mx-auto justify-center">
        <div className="flex flex-col w-full shadow-md p-2 rounded-md bg-white">
          <div className="overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
            <h3 className="mb-3 uppercase font-semibold">
              leave requests History
            </h3>
            {currentUser.isAdmin && leaves.length > 0 ? (
              <>
                <Table hoverable className="shadow-md bg">
                  <Table.Head>
                    <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
                      Date of request
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
                      Username
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
                      Leave Type
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
                      Start Date
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
                      End date
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
                      reason
                    </Table.HeadCell>
                    <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
                      status
                    </Table.HeadCell>
                  </Table.Head>
                  {leaves.map((leave) => (
                    <Table.Body className="divide-y" key={leave._id}>
                      <Table.Row className="bg-[white] dark:border-gray-700 dark:bg-gray-800 text-[#1f1f1f]">
                        <Table.Cell>
                          {new Date(leave.createdAt).toLocaleDateString()}
                        </Table.Cell>
                        <Table.Cell>{leave.empUsername}</Table.Cell>
                        <Table.Cell>{leave.leaveType}</Table.Cell>
                        <Table.Cell>
                          {new Date(leave.startDate).toLocaleDateString()}
                        </Table.Cell>
                        <Table.Cell>
                          {new Date(leave.endDate).toLocaleDateString()}
                        </Table.Cell>
                        <Table.Cell>{leave.reason}</Table.Cell>
                        <Table.Cell>{leave.status}</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  ))}
                </Table>
              </>
            ) : loading ? (
              <p className="text-xl text-gray-500">Loading...</p>
            ) : (
              <p>You have no leave request in history!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
