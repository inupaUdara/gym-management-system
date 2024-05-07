import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";

export default function InstructorServiceRequestView() {

  const { currentUser } = useSelector((state) => state.user);
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [requestIdToDelete, setRequestIdToDelete] = useState("");

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
   
    fetchRequests();

  }, [currentUser]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRequest = requests.filter((request) =>
    request.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.serviceDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteRequest = async () => {
    try {
      const res = await fetch(`/api/serviceRequest/deleteRequest/${requestIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setRequests((prevItems) =>
          prevItems.filter((request) => request._id !== requestIdToDelete)
        );
        setShowModal(false);
      } else {
        console.log(data.message);
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
          placeholder="Search by Service Type or Description"
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
              Service Type
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
              Service Description
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
              Request Status
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
              Remove Request
            </Table.HeadCell>

          </Table.Head>
          <Table.Body>
            {filteredRequest.map((request) => (
              <Table.Row className="bg-[white] dark:border-gray-500 dark:bg-gray-800 text-[#1f1f1f]" key={request._id}>
                <Table.Cell>{new Date(request.createdAt).toLocaleDateString()}</Table.Cell>
                <Table.Cell>{request.itemCode}</Table.Cell>
                <Table.Cell>{request.serviceType}</Table.Cell>
                <Table.Cell>{request.serviceDescription}</Table.Cell>
                <Table.Cell>{request.serviceStatus}</Table.Cell>
                <Table.Cell>
                  <span 
                    onClick={() => {
                      setShowModal(true);
                      setRequestIdToDelete(request._id);
                    }}
                    className="font-medium text-red-500 hover:underline cursor-pointer"
                  >
                    Delete
                  </span>
                </Table.Cell>              
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <p>No items found.</p>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this Request?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteRequest}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
