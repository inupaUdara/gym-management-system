import { Alert, Spinner, Select } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function AdminDasAddEmp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstname || !formData.lastname || !formData.address || !formData.phone  || !formData.email || !formData.nic) {
      return setError("All fiel are required");
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
        return setError("User already exists");
      }
      setLoading(false);
      if (res.ok) {
        navigate("/admin-dashboard");
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="flex-grow w-full min-h-[60vh] bg-[#d4d4d4] p-10 md:p-20 justify-center">
      <div className=" max-w-[600px] mx-auto rounded-md p-10">
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
                  className="text-[#d4d4d4] text-sm py-2 my-2 rounded-md bg-[#707070] focus:outline-none placeholder:text-[#d4d4d4] focus:ring-[#03001C]"
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
                  className="text-[#d4d4d4] text-sm py-2 my-2 rounded-md bg-[#707070] focus:outline-none placeholder:text-[#d4d4d4] focus:ring-[#03001C]"
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
              className="text-[#d4d4d4] text-sm py-2 my-2 rounded-md bg-[#707070] focus:outline-none placeholder:text-[#d4d4d4] focus:ring-[#03001C]"
              id="address"
              onChange={handleChange}
            />
            <label htmlFor="" className="text-[#1f1f1f] mt-3">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className=" text-[#d4d4d4] text-sm py-2 my-2 rounded-md bg-[#707070] focus:outline-none placeholder:text-[#d4d4d4] focus:ring-[#03001C]"
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
                  className="text-[#d4d4d4] text-sm py-2 my-2 rounded-md bg-[#707070] focus:outline-none placeholder:text-[#d4d4d4] focus:ring-[#03001C]"
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
                  className="text-[#d4d4d4] text-sm py-2 my-2 rounded-md bg-[#707070] focus:outline-none placeholder:text-[#d4d4d4] focus:ring-[#03001C]"
                  id="phone"
                  onChange={handleChange}
                />
              </div>

            </div>
            <label htmlFor="" className="text-[#1f1f1f] mt-3">Role</label>
            <select className="mt-3 rounded-md bg-[#707070] text-[#d4d4d4]" id="role"
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option id="none">Select a role</option>
            <option id="manager">Manager</option>
            <option id="instructor">Instructor</option>
          </select>
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
      </div>
    </div>
  );
}
