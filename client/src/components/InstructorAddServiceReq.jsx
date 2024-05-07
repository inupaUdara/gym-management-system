import { Alert, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Header";
import AdminDashSideBar from "./AdminDashSideBar";

export default function InstructorAddServiceReq() {
  const { inventoryId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
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

    if (currentUser.isAdmin || currentUser.role === "Instructor") {
      fetchItems();
    }
  }, [currentUser, inventoryId]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

const inventory_id = formData._id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.serviceType || !formData.serviceDescription || !formData.itemCode || !formData._id) {
      return setError("All fields are required");
    }
    try {
      setLoading(true);
      setError(null);
  
      // Step 1: Add service request
      const serviceRequestRes = await fetch("/api/serviceRequest/addServiceRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const serviceRequestData = await serviceRequestRes.json();
  
      if (!serviceRequestRes.ok) {
        throw new Error(serviceRequestData.message || "Failed to add service request");
      }
  
      // Step 2: Update item status
      const updateItemRes = await fetch(`/api/inventory/updateItemStatus/${inventory_id}`, {
        method: "PUT", // Assuming you use PATCH method to update item status
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemStatus: "in_service" }), // Assuming formData includes itemStatus
      });
      const updateItemData = await updateItemRes.json();
  
      if (!updateItemRes.ok) {
        throw new Error(updateItemData.message || "Failed to update item status");
      }
  
      // Both actions succeeded
      setLoading(false);
      setSuccess("Service request added successfully");
  
    } catch (error) {
      setError(error.message || "Failed to add service request");
      setLoading(false);
    }
  };
  

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!formData.serviceType || !formData.serviceDescription || !formData.itemCode) {
  //     return setError("All fields are required");
  //   }
  //   try {
  //     setLoading(true);
  //     setError(null);
  //     const res = await fetch("/api/serviceRequest/addServiceRequest",{
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });
  //     const data = await res.json();
  //     setLoading(false);
  //     if (res.ok) {
  //       setSuccess("Service request added successfully");
  //     } else {
  //       setError(data.message || "Failed to add service request");
  //     }
  //   } catch (error) {
  //     setError(error.message || "Failed to add service request");
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col md:flex-row bg-[#d4d4d4]">
        <div className="md:w-56">
          <AdminDashSideBar />
        </div>
        <div className="flex-grow w-full min-h-[60vh] bg-[#d4d4d4] p-10 md:p-20 justify-center">
          <div className="max-w-[600px] mx-auto rounded-md p-10 bg-white shadow-lg">
            <div className="flex flex-col mb-2">
              <h3 className="text-2xl font-semibold mb-4 text-[#03001C] text-center">
                Add Service Request
              </h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col">
              <label htmlFor="itemCode" className="text-[#1f1f1f] mt-3">
                  Item Code
                </label>
                <input
                  type="text"
                  placeholder="Enter Item Code"
                  className="text-[#d4d4d4] text-sm py-2 my-2 rounded-md bg-[#707070] focus:outline-none placeholder:text-[#d4d4d4] focus:ring-[#03001C]"
                  id="itemCode"
                  value={formData.itemCode || ""}
                  onChange={handleChange}
                />
                <label htmlFor="serviceType" className="text-[#1f1f1f] mt-3">
                  Service Type
                </label>
                <input
                  type="text"
                  placeholder="Enter service type"
                  className="text-[#d4d4d4] text-sm py-2 my-2 rounded-md bg-[#707070] focus:outline-none placeholder:text-[#d4d4d4] focus:ring-[#03001C]"
                  id="serviceType"
                  value={formData.serviceType || ""}
                  onChange={handleChange}
                />
               <input
                  type="text"
                  placeholder="Enter service type"
                  className="text-[#d4d4d4] text-sm py-2 my-2 rounded-md bg-[#707070] focus:outline-none placeholder:text-[#d4d4d4] focus:ring-[#03001C]"
                  id="item_ID"
                  value={formData._id || ""}
                  onChange={handleChange} hidden={true}
                />
                <input
                  type="text"
                  placeholder="Enter service type"
                  className="text-[#d4d4d4] text-sm py-2 my-2 rounded-md bg-[#707070] focus:outline-none placeholder:text-[#d4d4d4] focus:ring-[#03001C]"
                  id="itemName"
                  value={formData.itemName || ""}
                  onChange={handleChange} hidden={true}
                />

                <label htmlFor="serviceDescription" className="text-[#1f1f1f] mt-3">
                  Service Description
                </label>
                <textarea
                  placeholder="Enter service description"
                  className="text-[#d4d4d4] text-sm py-2 my-2 rounded-md bg-[#707070] focus:outline-none placeholder:text-[#d4d4d4] focus:ring-[#03001C]"
                  id="serviceDescription"
                  value={formData.serviceDescription || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col my-4">
                <button
                  type="submit"
                  className={`text-white text-sm my-2 bg-[#4c0000] border border-white rounded-md p-3 text-center flex items-center justify-center cursor-pointer hover:bg-[#7e1010] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loading}
                >
                  {/* {loading ? <Spinner size="sm" className="mr-2" /> : null} */}
                  Submit
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
