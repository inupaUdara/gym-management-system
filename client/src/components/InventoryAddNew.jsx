import { Alert, Spinner, Select, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdOutlinePendingActions } from "react-icons/md";

export default function InventoryAddNew() {
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
        !formData.itemName ||
        !formData.itemCode  ||   
        !formData.description ||
        !formData.quantity ||
        !formData.itemStatus
    ) {
      return setError("All field are required");
    }
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/inventory/addItems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        return setError("Item already exists");
      }
      setLoading(false);
      if (res.ok) {
        navigate("/admin-dashboard");
        setSuccess("Item added successfully");
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="flex-grow w-full min-h-[60vh] bg-[#d4d4d4] p-10 md:p-20 justify-center">
      <div className=" max-w-[600px] mx-auto rounded-md p-10 bg-white shadow-lg">
        <div className="flex flex-col mb-2">
          <h3 className="text-2xl font-semibold mb-4 text-[#03001C] text-center">
            Inventory Add Item
          </h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex flex-col">
                <label htmlFor="" className="text-[#1f1f1f] mt-3">
                  Item Code
                </label>
                <input
                  type="text"
                  placeholder="Enter item code"
                  className="text-[#d4d4d4] text-sm py-2 my-2 rounded-md bg-[#707070] focus:outline-none placeholder:text-[#d4d4d4] focus:ring-[#03001C]"
                  id="itemCode"
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="" className="text-[#1f1f1f] mt-3">
                  Item Name
                </label>
                <input
                  type="text"
                  placeholder="Enter item name"
                  className="text-[#d4d4d4] text-sm py-2 my-2 rounded-md bg-[#707070] focus:outline-none placeholder:text-[#d4d4d4] focus:ring-[#03001C]"
                  id="itemName"
                  onChange={handleChange}
                />
              </div>
            </div>

            <label htmlFor="" className="text-[#1f1f1f] mt-3">
              About Item
            </label>
            <input
              type="text"
              placeholder="Enter details about this item"
              className="text-[#d4d4d4] text-sm py-2 my-2 rounded-md bg-[#707070] focus:outline-none placeholder:text-[#d4d4d4] focus:ring-[#03001C]"
              id="description"
              onChange={handleChange}
            />
            <label htmlFor="" className="text-[#1f1f1f] mt-3">
              Quantity
            </label>
            <input
              type="number"
              placeholder="Enter item "
              className=" text-[#d4d4d4] text-sm py-2 my-2 rounded-md bg-[#707070] focus:outline-none placeholder:text-[#d4d4d4] focus:ring-[#03001C]"
              id="quantity"
              onChange={handleChange}
            />
            <label htmlFor="" className="text-[#1f1f1f] mt-3">
              Status
            </label>
            { <select
              className="mt-3 rounded-md bg-[#707070] text-[#d4d4d4]"
              id="itemStatus"
              onChange={(e) =>
                setFormData({ ...formData, itemStatus: e.target.value })
              }
            >
              <option id="in_use">In Use</option>
              <option id="in_service">In Service</option>
              <option id="not_good_for_use">Not Good for Use</option>
            </select> }

          </div>
          <div className="flex flex-col my-4">
            <button
              type="submit"
              className=" text-white text-sm my-2 bg-[#4c0000] border border-white rounded-md p-3 text-center flex items-center justify-center cursor-pointer hover:bg-[#7e1010]"
              disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Add Item to Inventory"
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
