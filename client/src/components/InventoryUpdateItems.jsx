import { Alert, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Header";
import AdminDashSideBar from "./AdminDashSideBar";



function getItemIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('itemId');
  }
  
export default function InventoryUpdateItems() {
  const { inventoryId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const itemId = getItemIdFromURL();
  console.log(itemId);
  const [formData, setFormData] = useState({ });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
        try {
          const res = await fetch(`/api/inventory/getItems?itemId=${inventoryId}`);
          if (!res.ok) {
            throw new Error("Failed to fetch item");
          }
          const data = await res.json();
          setFormData(data.items[0]);
        } catch (error) {
          setError(error.message);
        }
      };
      
    if (currentUser.isAdmin || currentUser.role === "Manager") {
      fetchItems();
    }
  }, [currentUser, itemId]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.itemName ||
      !formData.itemCode ||
      !formData.description ||
      !formData.quantity
    ) {
      setError("All fields are required");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/inventory/updateItem/${formData._id}`, {   
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        return setError("Item cannot update");
      }
      setLoading(false);
      if (res.ok) {
        setSuccess("Item update successfully");
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  console.log(formData)
  return (
    <>
    <Header/>
    <div className="min-h-screen flex flex-col md:flex-row bg-[#d4d4d4]">
      <div className="md:w-56">
        <AdminDashSideBar/>
      </div>
    <div className="flex-grow w-full min-h-[60vh] bg-[#d4d4d4] p-10 md:p-20 justify-center">
      <div className="max-w-[600px] mx-auto rounded-md p-10 bg-white shadow-lg">
        
        <div className="flex flex-col mb-2">
          <h3 className="text-2xl font-semibold mb-4 text-[#03001C] text-center">
            Update Inventory Item
          </h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex flex-col">
                <label htmlFor="itemCode" className="text-[#1f1f1f] mt-3">
                  Item Code
                </label>
                <input
                  type="text"
                  placeholder="Enter item code"
                  className="text-[#d4d4d4] text-sm py-2 my-2 rounded-md bg-[#707070] focus:outline-none placeholder:text-[#d4d4d4] focus:ring-[#03001C]"
                  id="itemCode"
                  defaultValue={formData.itemCode || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="itemName" className="text-[#1f1f1f] mt-3">
                  Item Name
                </label>
                <input
                  type="text"
                  placeholder="Enter item name"
                  className="text-[#d4d4d4] text-sm py-2 my-2 rounded-md bg-[#707070] focus:outline-none placeholder:text-[#d4d4d4] focus:ring-[#03001C]"
                  id="itemName"
                  value={formData.itemName || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <label htmlFor="description" className="text-[#1f1f1f] mt-3">
              About Item
            </label>
            <input
              type="text"
              placeholder="Enter details about this item"
              className="text-[#d4d4d4] text-sm py-2 my-2 rounded-md bg-[#707070] focus:outline-none placeholder:text-[#d4d4d4] focus:ring-[#03001C]"
              id="description"
              value={formData.description || ""}
              onChange={handleChange}
            />
            <label htmlFor="quantity" className="text-[#1f1f1f] mt-3">
              Quantity
            </label>
            <input
              type="number"
              placeholder="Enter quantity"
              className="text-[#d4d4d4] text-sm py-2 my-2 rounded-md bg-[#707070] focus:outline-none placeholder:text-[#d4d4d4] focus:ring-[#03001C]"
              id="quantity"
              value={formData.quantity || ""}
              onChange={handleChange}
            />
           <label htmlFor="itemStatus" className="text-[#1f1f1f] mt-3">
              Status
            </label>
            <select
              className="mt-3 rounded-md bg-[#707070] text-[#d4d4d4]"
              id="itemStatus"
              value={formData.itemStatus} // Set the value attribute to the itemStatus from formData
              onChange={(e) =>
                setFormData({ ...formData, itemStatus: e.target.value })
              }
            >
              <option value="">Select Status</option>
              <option value="in_use">In Use</option>
              <option value="in_service">In Service</option>
              <option value="unusable">Unusable</option>
            </select>

          </div>
          <div className="flex flex-col my-4">
          <button
              type="submit"
              className={`text-white text-sm my-2 bg-[#4c0000] border border-white rounded-md p-3 text-center flex items-center justify-center cursor-pointer hover:bg-[#7e1010] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Update "
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
    </div>
    </>
  );
}