import {
  Alert,
  Spinner,
  Select,
  Textarea,
  Modal,
  Button,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdOutlinePendingActions } from "react-icons/md";
import { HiOutlineExclamationCircle } from "react-icons/hi";
export default function InstructorMealPlan() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [LeavesIns, setLeavesIns] = useState([]);
  const [leaveIdToDelete, setLeaveIdToDelete] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchLeavesIns = async () => {
      try {
        const res = await fetch(`/api/leave/getleavein/${currentUser.empId}`);
        const data = await res.json();
        if (res.ok) {
          setLeavesIns(data.leaves);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin || currentUser.role === "Instructor") {
      fetchLeavesIns();
    }
  }, [currentUser._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/leave/createleave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        return setError(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/admin-dashboard?tab=instructor-request");
        setSuccess(
          "Leave request submitted successfully. Please refresh the page to see your request"
        );
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDeleteLeave = async () => {
    try {
      const res = await fetch(`/api/leave/deleteleave/${leaveIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setLeavesIns((prev) =>
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
    <div className="flex-grow w-full min-h-[60vh] bg-[#d4d4d4] p-5 md:p-10">
      <div className="max-w-[900px] mx-auto rounded-md p-5 flex flex-col lg:flex-row bg-white shadow-lg  justify-center">
        <div className="rounded-md p-5 mx-4 max-h-[800px] lg:w-3/4">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-2">
              <h3 className="text-2xl font-semibold mb-4 text-[#03001C] text-center">
                Create Meal Plan
              </h3>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-[#1f1f1f] mt-3">
                Client Name
              </label>
              <input
                type="text"
                className="text-[#d4d4d4] text-sm py-2 my-2 rounded-md bg-[#707070] focus:outline-none placeholder:text-[#d4d4d4] focus:ring-[#03001C]"
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
              />
              <label htmlFor="" className="text-[#1f1f1f] mt-3">
                Date
              </label>
              <input
                type="date"
                className="text-[#d4d4d4] text-sm py-2 my-2 rounded-md bg-[#707070] focus:outline-none placeholder:text-[#d4d4d4] focus:ring-[#03001C]"
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
              />

              <label htmlFor="" className="text-[#1f1f1f] mt-3">
                Plan
              </label>
              <Textarea
                type="text"
                className="h-60 text-[#d4d4d4] text-sm py-2 my-2 rounded-md bg-[#707070] focus:outline-none placeholder:text-[#d4d4d4] focus:ring-[#03001C]"
                placeholder="Create a Plan"
                onChange={(e) =>
                  setFormData({ ...formData, reason: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col my-4">
              <button
                type="submit"
                className=" text-white text-sm my-2 bg-[#4c0000] border border-white rounded-md p-3 text-center flex items-center justify-center cursor-pointer hover:bg-[#7e1010]"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Submit Request"
                )}
              </button>
            </div>
          </form>
          {error && (
            <Alert className="mt-5 p-2" color="failure">
              {error}
            </Alert>
          )}
          {success && (
            <Alert className="mt-5 p-2" color="success">
              {success}
            </Alert>
          )}
        </div>
        <div className="mx-2 p-5 border-[#707070] border-t-2  border-t-[#707070] lg:border-l-2 lg:border-t-white">
          {currentUser.isAdmin || currentUser.role === "Instructor" ? (
            <>
              <h3 className="text-xl font-semibold mb-4 text-[#03001C] text-center">
                Finished Plans
              </h3>
              {LeavesIns.map((leave) => (
                <div
                  key={leave._id}
                  className="flex flex-row gap-4 mt-5 justify-between"
                >
                  <div className="flex flex-col">
                    <p className="text-[#1f1f1f]">
                      Client Name: {leave.leaveType}
                    </p>
                    <p className="text-[#1f1f1f]">
                      Date: {new Date(leave.startDate).toLocaleDateString()}
                    </p>

                    <p className="text-[#1f1f1f]">Reason: {leave.reason}</p>
                    <div className="flex flex-row">
                      <p className="text-[#1f1f1f] mr-2">Status: </p>
                      <MdOutlinePendingActions className="mt-1" />
                      <p className="text-[#1f1f1f] font-semibold">
                        {" "}
                        {leave.status}
                      </p>
                    </div>
                  </div>
                  {leave.status === "Pending" ? (
                    <p
                      className="text-red-500"
                      onClick={() => {
                        setShowModal(true);
                        setLeaveIdToDelete(leave._id);
                      }}
                    >
                      Delete
                    </p>
                  ) : leave.status === "Approve" ? (
                    <p className="text-green-500">Leave request is approved</p>
                  ) : (
                    <p className="text-red-500">Leave request is rejected</p>
                  )}
                </div>
              ))}
            </>
          ) : (
            <p>You Do not Created a Plan yet!</p>
          )}
        </div>
      </div>
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
              Are you sure you want to delete this Plan?
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
