import { Alert, Spinner, Select, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdOutlinePendingActions } from "react-icons/md";

export default function AdminDasAddEmp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [LeavesIns, setLeavesIns] = useState([]);

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
        setSuccess("Leave request submitted successfully. Please refresh the page to see your request");
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="flex-grow w-full min-h-[60vh] bg-[#d4d4d4] p-5 md:p-10">
      <div className="max-w-[900px] mx-auto rounded-md p-5 flex flex-col lg:flex-row bg-white shadow-lg  justify-center">
        <div className="rounded-md p-5 mx-4 max-h-[800px] lg:w-3/4">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-2">
              <h3 className="text-2xl font-semibold mb-4 text-[#03001C] text-center">
                Request a Leave
              </h3>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-[#1f1f1f] mt-3">
                Leave Type
              </label>
              <select
                className="mt-3 rounded-md bg-[#707070] text-[#d4d4d4]"
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
                className="text-[#d4d4d4] text-sm py-2 my-2 rounded-md bg-[#707070] focus:outline-none placeholder:text-[#d4d4d4] focus:ring-[#03001C]"
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
              />

              <label htmlFor="" className="text-[#1f1f1f] mt-3">
                End date
              </label>
              <input
                type="date"
                className="text-[#d4d4d4] text-sm py-2 my-2 rounded-md bg-[#707070] focus:outline-none placeholder:text-[#d4d4d4] focus:ring-[#03001C]"
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
              />
              <label htmlFor="" className="text-[#1f1f1f] mt-3">
                Reason
              </label>
              <Textarea
                type="text"
                className="h-60 text-[#d4d4d4] text-sm py-2 my-2 rounded-md bg-[#707070] focus:outline-none placeholder:text-[#d4d4d4] focus:ring-[#03001C]"
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
        <div className="mx-2 p-5 border-[#707070] border-t-2  border-t-[#707070] lg:border-l-2 lg:border-t-white">
          {currentUser.isAdmin || currentUser.role === "Instructor" ? (
            <>
              <h3 className="text-xl font-semibold mb-4 text-[#03001C] text-center">
                Your Current Leave Request
              </h3>
              {LeavesIns.map((leave) => (
                <div
                  key={leave._id}
                  className="flex flex-row gap-4 mt-5 justify-between"
                >
                  <div className="flex flex-col">
                    <p className="text-[#1f1f1f]">
                      Leave Type: {leave.leaveType}
                    </p>
                    <p className="text-[#1f1f1f]">
                      Start Date:{" "}
                      {new Date(leave.startDate).toLocaleDateString()}
                    </p>
                    <div className="flex flex-row">
                      <p className="text-[#1f1f1f] mr-2">End Date:</p>
                      <p className="text-[#1f1f1f]">
                        {new Date(leave.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-[#1f1f1f]">Reason: {leave.reason}</p>
                    <div className="flex flex-row">
                      <p className="text-[#1f1f1f] mr-2">Status: </p>
                      <MdOutlinePendingActions className="mt-1" />
                      <p className="text-[#1f1f1f] font-semibold"> {leave.status}</p>
                    </div>
                  </div>
                  <p className="text-red-500">Delete</p>
                </div>
              ))}
            </>
          ) : (
            <p>You have no leave request yet!</p>
          )}
        </div>
      </div>
    </div>
  );
}
