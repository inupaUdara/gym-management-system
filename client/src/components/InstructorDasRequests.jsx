import { Alert, Spinner, Select, Textarea, Modal, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdOutlinePendingActions } from "react-icons/md";
import { HiOutlineExclamationCircle } from "react-icons/hi";
export default function AdminDasAddEmp() {
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
        const res = await fetch(`/api/leave/getleavein/${currentUser._id}`);
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
        setSuccess("Leave request submitted successfully.");
        navigate("/admin-dashboard?tab=view-instructors-request");
        
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
    <div className="flex-grow w-full min-h-[60vh] bg-[#d4d4d4] p-5 md:p-8">
      <div className="max-w-[600px] mx-auto rounded-md p-2 flex flex-col lg:flex-row bg-white shadow-lg  justify-center">
        <div className="rounded-md p-1 mx-4 max-h-[800px] lg:w-3/4">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-2">
              <h3 className="text-2xl font-bold mb-4 mt-4 text-[#03001C] text-center">
                Request a Leave
              </h3>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-[#1f1f1f] mt-3">
                Leave Type
              </label>
              <select
                className="mt-3 rounded-md bg-[#d4d4d4] text-[#1f1f1f]"
                onChange={(e) =>
                  setFormData({ ...formData, leaveType: e.target.value })
                }
              >
                <option value="none">Select a leave type</option>
                <option value="vacation">Vacation Leave</option>
                <option value="sick">Sick Leave</option>
                <option value="personal ">Personal Leave</option>
                <option value="professionalDevelopment ">
                  Professional Development Leave
                </option>
              </select>

              <label htmlFor="" className="text-[#1f1f1f] mt-3">
                Start Date
              </label>
              <input
                type="date"
                className="text-[#1f1f1f] text-sm py-2 my-2 rounded-md bg-[#d4d4d4] focus:outline-none placeholder:text-[#1f1f1f] focus:ring-[#03001C]"
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
              />

              <label htmlFor="" className="text-[#1f1f1f] mt-3">
                End date
              </label>
              <input
                type="date"
                className="text-[#1f1f1f] text-sm py-2 my-2 rounded-md bg-[#d4d4d4] focus:outline-none placeholder:text-[#1f1f1f] focus:ring-[#03001C]"
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
              />
              <label htmlFor="" className="text-[#1f1f1f] mt-3">
                Reason
              </label>
              <textarea
                type="text"
                className="h-60 text-[#1f1f1f] text-sm py-2 my-2 rounded-md bg-[#d4d4d4] focus:outline-none placeholder:text-[#1f1f1f] focus:ring-[#03001C]"
                placeholder="Enter reason for leave"
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
