import { Modal, Table, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function AdminDasInstructors() {
  const { currentUser } = useSelector((state) => state.user);
  const [leaves, setLeaves] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [leaveIdToDelete, setLeaveIdToDelete] = useState("");
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await fetch(`/api/leave/getleave`);
        const data = await res.json();
        if (res.ok) {
          setLeaves(data.leaves);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin || currentUser.role === "Manager") {
      fetchLeaves();
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
        setShowModal(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin || currentUser.role === "Manager" ? (
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
                  <Link to={`/view-instructor-request/${leave._id}/${leave.employeeId}`}>
                    <Table.Cell className="text-green-600 cursor-pointer hover:underline">
                      Update status
                    </Table.Cell>
                  </Link>
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
      ) : (
        <p>You have no leave request yet!</p>
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
  );
}
