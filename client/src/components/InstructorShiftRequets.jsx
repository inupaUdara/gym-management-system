import {
  Alert,
  Card,
  Label,
  Modal,
  Select,
  Spinner,
  Textarea,
  TextInput,
} from "flowbite-react";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function InstructorShiftRequets() {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shiftChange, setShiftChange] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  console.log(shiftChange);

  useEffect(() => {
    const fetchShiftChange = async () => {
      try {
        const res = await fetch(
          `/api/shiftchange/getShiftChangeReq/${currentUser._id}`
        );
        const data = await res.json();
        if (res.ok) {
          setShiftChange(data.shiftCahnge);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin || currentUser.role === "Instructor") {
      fetchShiftChange();
    }
  }, [currentUser._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.shiftName || !formData.reason) {
      return enqueueSnackbar("All fields are required", { variant: "error" });
    }
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/shiftchange/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        return enqueueSnackbar(data.message, { variant: "error" });
      }
      setLoading(false);
      if (res.ok) {
        enqueueSnackbar("Shift change request submitted successfully.", {
          variant: "success",
        });
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="p-3 md:mx-auto">
      <div className="flex flex-row  gap-4 py-3 mx-auto justify-center">
        <Card className="w-full max-w-sm">
          <div className="flex flex-col items-center pb-10">
            <img
              alt="Bonnie image"
              height="96"
              src={currentUser.profilePicture}
              width="96"
              className="mb-3 rounded-full shadow-lg"
            />
            <h5 className="mb-1 text-xl font-extrabold text-gray-900 dark:text-white">
              {currentUser.firstname} {currentUser.lastname}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {currentUser.role}
            </span>
            <span className="mt-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
              Current Shift: {currentUser.shift}
            </span>
            <div className="mt-4 flex space-x-3 lg:mt-6">
              <button
                onClick={() => setOpenModal(true)}
                className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
              >
                Request a Shift Swap
              </button>
            </div>
          </div>
        </Card>
        {shiftChange && shiftChange.length > 0 && (
          <Card className="w-full sm:max-w-sm">
            <div className="mb-4 flex items-center justify-between">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Your Current Requests
              </h5>
            </div>
            <div className="flow-root">
              {shiftChange.map((shift) => (
                <ul
                  className="divide-y divide-gray-200 dark:divide-gray-700 border-b-2"
                  key={shift._id}
                >
                  <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                      <div className="shrink-0"></div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                          {shift.shiftName}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {shift.reason}
                        </p>
                        <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                          {shift.status}
                        </p>
                      </div>
                      {/* <div className="inline-flex items-center text-sm font-normal text-gray-900 dark:text-white">
                    {instructor.username}
                    </div> */}
                    </div>
                  </li>
                </ul>
              ))}
            </div>
          </Card>
        )}
      </div>
      <Modal
        show={openModal}
        size="lg"
        popup
        onClose={() => {
          setOpenModal(false);
          window.location.reload();
        }}
      >
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <h3 className="text-xl font-extrabold text-[#1f1f1f] dark:text-white">
                Request a Leave Request
              </h3>
              <div className="mb-2 block">
                <Label htmlFor="" className="text-[#1f1f1f] mt-3">
                  Shift Name
                </Label>
                <Select
                  className="mt-3 rounded-md bg-[#d4d4d4] text-[#1f1f1f]"
                  onChange={(e) =>
                    setFormData({ ...formData, shiftName: e.target.value })
                  }
                >
                  <option value="none">Select a shift</option>
                  <option value="6am-11am">6.00 AM to 11.00 AM</option>
                  <option value="12pm-5pm">12.00 PM to 5.00 PM</option>
                  <option value="5pm-10pm">5.00 PM to 10.00 PM</option>
                </Select>
              </div>

              <div className="">
                <Label htmlFor="" className="text-[#1f1f1f] mt-3">
                  Reason
                </Label>
                <Textarea
                  type="text"
                  className="h-60"
                  placeholder="Enter reason for leave"
                  onChange={(e) =>
                    setFormData({ ...formData, reason: e.target.value })
                  }
                />
              </div>

              <div className="w-full">
                <button className="text-white text-sm my-2 bg-cyan-700 border border-white rounded-md p-3 text-center flex items-center justify-center cursor-pointer hover:bg-cyan-950">
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
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
