import { Alert, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function InstructorShiftRequets() {
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
        return setError(data.message);
      }
      setLoading(false);
      if (res.ok) {
        setSuccess("Shift swapping request submitted successfully.");
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="flex-grow w-full min-h-[60vh] bg-[#d4d4d4] p-5 md:p-8">
      {shiftChange && shiftChange.length > 0 && (
        <div className="flex justify-between mt-4 mb-5 mx-auto max-w-[550px] bg-white p-3 rounded-md shadow-lg">
        <div className="">
          <h3 className="font-semibold underline underline-offset-4 mb-2">Your current Request</h3>
          {shiftChange.map((shift) => (
            <>
              <p>
                <span className="font-semibold">Requested Shift: </span>
                {shift.shiftName}
              </p>
              <p className="capitalize"><span className="font-semibold">Reason: </span>{shift.reason}</p>
              <p><span className="font-semibold">Status: </span>{shift.status}</p>
            </>
          ))}
        </div>

        <p className="text-sm">
          <span className="font-semibold text-sm">Your current shift: </span>
          {currentUser.shift}
        </p>
      </div>
      )}
      <div className="max-w-[550px] mx-auto rounded-md p-3 flex flex-col  bg-white shadow-lg  justify-center">
        
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-2">
              <h3 className="text-xl font-bold text-[#03001C] text-center">
                Request a Shift Swap
              </h3>
            </div>
            <div className="flex flex-col">
              <label htmlFor="" className="text-[#1f1f1f] mt-3">
                Your desired shift
              </label>
              <select
                className="mt-3 rounded-md bg-[#d4d4d4] text-[#1f1f1f]"
                onChange={(e) =>
                  setFormData({ ...formData, shiftName: e.target.value })
                }
              >
                <option value="none">Select a shift</option>
                <option value="6am-11am">6.00 AM to 11.00 AM</option>
                <option value="12pm-5pm">12.00 PM to 5.00 PM</option>
                <option value="5pm-10pm">5.00 PM to 10.00 PM</option>
              </select>

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
  );
}
