import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiOutlineCheckCircle } from "react-icons/hi";


export default function ServiceRequestView() {
  const { currentUser } = useSelector((state) => state.user);
  const [requests, setRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [itemIdToUpdate, setItemToUpdate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch('/api/serviceRequest/getRequests');
        const data = await res.json();
        if (res.ok) {
          setRequests(data.requests);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser && (currentUser.isAdmin || currentUser.role === "Manager")) {
      fetchRequests();
    }
  }, [currentUser]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRequest = requests.filter((request) =>
    request.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.serviceDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );



  const handleUpdateStatus = async (requestId, inventoryId) => {
    try {
      const res = await fetch(`/api/serviceRequest/updateRequest/${requestId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: selectedStatus }),
      });
      const data = await res.json();
      
      if (res.ok) {
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request._id === requestId ? { ...request, serviceStatus: selectedStatus } : request
          )
        );
        
        const updateItemRes = await fetch(`/api/inventory/updateItemStatus/${inventoryId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ itemStatus: selectedStatus }),
        });
        const updateItemData = await updateItemRes.json();

        if (!updateItemRes.ok) {
          throw new Error(updateItemData.message || "Failed to update item status");
        }
        
        alert("Updated item status successfully");
      } else {
        throw new Error(data.message || "Failed to update request status");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      <div className="relative mb-3">
        <input
          type="text"
          placeholder="Search by Item Code or Item Name"
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 pl-10 border border-gray-300 rounded-md w-full mt-2"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 17l-2.5-2.5m0 0l-2.5-2.5m2.5 2.5l2.5-2.5m-2.5 2.5l2.5 2.5"
          />
        </svg>
      </div>
      {filteredRequest.length > 0 ? (
        <Table hoverable className="shadow-md bg">
          <Table.Head>
          <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
            Request Add Date
          </Table.HeadCell>
            <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
              Item Code
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
              Item Name
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
              Service Type
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
              Service Description
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
              Request Status
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
            </Table.HeadCell>            
            <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
              Update Status
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
              Contact Service Center 
            </Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {filteredRequest.map((request) => (
              <Table.Row className="bg-[white] dark:border-gray-500 dark:bg-gray-800 text-[#1f1f1f]" key={request._id}>
                <Table.Cell>{new Date(request.createdAt).toLocaleDateString()}</Table.Cell>
                <Table.Cell>{request.itemCode}</Table.Cell>
                <Table.Cell>{request.itemName}</Table.Cell>
                <Table.Cell>{request.serviceType}</Table.Cell>
                <Table.Cell>{request.serviceDescription}</Table.Cell>
                <Table.Cell>
                  {request.serviceStatus === 'in_use' ? (
                    <>
                      <HiOutlineCheckCircle className="text-green-500 inline-block mr-1 text-xl" />
                      <span className="inline-block">{request.serviceStatus}</span>
                    </>
                  ) : (
                    request.serviceStatus
                  )}
                </Table.Cell>
                <Table.Cell>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="">Select Status</option>
                    <option value="in_service">In Service</option>
                    <option value="unusable">Unusable</option>
                    <option value="in_use">In Use</option>
                  </select>
                </Table.Cell>
                <Table.Cell>
                <button
                    className="p-4 text-[#d4d4d4] font-semibold uppercase rounded-full bg-[#A80000] hover:bg-[#4c0000]"
                    onClick={() => handleUpdateStatus(request._id, request.itemID)}
                  >
                    Update
                  </button>

                </Table.Cell>
                <Table.Cell>
                  <Link to={`/email-form/${request._id}`}>
                    <span  className="p-4 text-[#ffffff] font-semibold uppercase rounded-full bg-[rgb(66,158,54)] hover:bg-[#244425]">Contact</span>
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <p>No items found.</p>
      )}
    </div>
  );
}
