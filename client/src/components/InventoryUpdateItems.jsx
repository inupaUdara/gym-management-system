import { Alert, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function getItemIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('itemId');
  }
  

export default function InventoryViewItems() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const itemId = getItemIdFromURL();
  console.log(itemId);
  const [formData, setFormData] = useState({
    itemName: "",
    itemCode: "",
    description: "",
    quantity: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
        try {
            console.log(`/api/inventory/getItemIns/${itemId}`);

          const res = await fetch(`/api/inventory/getItemIns?itemCode=${itemId}`);
          if (!res.ok) {
            throw new Error("Failed to fetch item");
          }
          const data = await res.json();
          setFormData({
            itemName: data.itemName,
            itemCode: data.itemCode,
            description: data.description,
            quantity: data.quantity,
          });
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
      const res = await fetch(`/api/inventory/updateItem/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok || data.success === false) {
        throw new Error("Failed to update item");
      }
      setLoading(false);
      navigate("/admin-dashboard");
      setSuccess("Item updated successfully");
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (!itemId) {
    return <div>No itemId found!</div>; // Handle case when itemId is not available
  }
  return (
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
                  value={formData.itemCode || ""}
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
          </div>
          <div className="flex flex-col my-4">
            <button
              type="submit"
              className="text-white text-sm my-2 bg-[#4c0000] border border-white rounded-md p-3 text-center flex items-center justify-center cursor-pointer hover:bg-[#7e1010]"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Update Item"
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
