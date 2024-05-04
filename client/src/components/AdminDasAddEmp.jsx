import { Alert, Spinner, Select } from "flowbite-react";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function AdminDasAddEmp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.firstname ||
      !formData.lastname ||
      !formData.address ||
      !formData.phone ||
      !formData.email ||
      !formData.nic
    ) {
      return enqueueSnackbar("All fields are required", { variant: "error" });
    }
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/authemployee/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setSuccess(null);
        return enqueueSnackbar(data.message, { variant: "error" });
        
      }
      setLoading(false);
      if (res.ok) {
        navigate("/admin-dashboard");
        enqueueSnackbar("Employee added successfully", { variant: "success" });
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
      setSuccess(null);
    }
  };

  console.log(formData);
  return (
    <div className="flex-grow w-full min-h-[60vh] bg-[#d4d4d4] p-10 md:p-20 justify-center">
      <div className=" max-w-[600px] mx-auto rounded-md p-10 bg-white shadow-lg">
        <div className="flex flex-col mb-2">
          <h3 className="text-2xl font-semibold mb-4 text-[#03001C] text-center">
            Employee Registration
          </h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex flex-col">
                <label htmlFor="" className="text-[#1f1f1f] mt-3">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  className="text-[#1f1f1f] text-sm py-2 my-2 rounded-md bg-[#d4d4d4] focus:outline-none placeholder:text-[#1f1f1f] focus:ring-[#03001C]"
                  id="firstname"
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="" className="text-[#1f1f1f] mt-3">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  className="text-[#1f1f1f] text-sm py-2 my-2 rounded-md bg-[#d4d4d4] focus:outline-none placeholder:text-[#1f1f1f] focus:ring-[#03001C]"
                  id="lastname"
                  onChange={handleChange}
                />
              </div>
            </div>

            <label htmlFor="" className="text-[#1f1f1f] mt-3">
              Address
            </label>
            <input
              type="text"
              placeholder="Enter address"
              className="text-[#1f1f1f] text-sm py-2 my-2 rounded-md bg-[#d4d4d4] focus:outline-none placeholder:text-[#1f1f1f] focus:ring-[#03001C]"
              id="address"
              onChange={handleChange}
            />
            <label htmlFor="" className="text-[#1f1f1f] mt-3">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className=" text-[#1f1f1f] text-sm py-2 my-2 rounded-md bg-[#d4d4d4] focus:outline-none placeholder:text-[#1f1f1f] focus:ring-[#03001C]"
              id="email"
              onChange={handleChange}
            />

            <div className="flex flex-col sm:flex-row justify-between">
              <div className="flex flex-col">
                <label htmlFor="" className="text-[#1f1f1f] mt-3">
                  NIC
                </label>
                <input
                  type="text"
                  placeholder="Enter NIC"
                  className="text-[#1f1f1f] text-sm py-2 my-2 rounded-md bg-[#d4d4d4] focus:outline-none placeholder:text-[#1f1f1f] focus:ring-[#03001C]"
                  id="nic"
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="" className="text-[#1f1f1f] mt-3">
                  Phone number
                </label>
                <input
                  type="text"
                  placeholder="Enter phone number"
                  className="text-[#1f1f1f] text-sm py-2 my-2 rounded-md bg-[#d4d4d4] focus:outline-none placeholder:text-[#1f1f1f] focus:ring-[#03001C]"
                  id="phone"
                  onChange={handleChange}
                />
              </div>
            </div>
            <label htmlFor="" className="text-[#1f1f1f] mt-3">
              Role
            </label>
            <select
              className="mt-3 rounded-md bg-[#d4d4d4] text-[#1f1f1f]"
              id="role"
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            >
              <option>Select the role</option>
              <option value="Manager">Manager</option>
              <option value="Instructor">Instructor</option>
            </select>
            {formData.role === "Instructor" && (
              <>
            <label htmlFor="" className="text-[#1f1f1f] mt-3">Shift</label>
            <select
              className="mt-3 rounded-md bg-[#d4d4d4] text-[#1f1f1f]"
              id="shift"
              onChange={(e) =>
                setFormData({ ...formData, shift: e.target.value })
              }
            >
              <option>Select the shift</option>
              <option value="6am-11am">6.00 AM to 11.00 AM</option>
              <option value="12pm-5pm">12.00 PM to 5.00 PM</option>
              <option value="5pm-10pm">5.00 PM to 10.00 PM</option>
            </select>
            </>)}
            
          </div>
          <div className="flex flex-col my-4">
            <button
              type="submit"
              className=" text-white text-sm my-2 bg-cyan-600 border border-white rounded-md p-3 text-center flex items-center justify-center cursor-pointer hover:bg-cyan-900"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Add Employee"
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
