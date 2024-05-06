import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function InstructorServiceRequest() {
  
  const { currentUser } = useSelector((state) => state.user);
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [itemIdToDelete, setItemToDelete] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch('/api/inventory/getItems');
        const data = await res.json();
        if (res.ok) {
          setItems(data.items);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin || currentUser.role === "Manager" || currentUser.role === "Instructor") {
      fetchItems();
    }
  }, [currentUser]);

  // Function to handle search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter items based on search term
  const filteredItems = items.filter((item) =>
    item.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );


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
      {filteredItems.length > 0 ? (
        <Table hoverable className="shadow-md bg">
          <Table.Head>
            <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
              Item Code
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
              Item Name
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
              Description
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
              Quantity
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
              Item Status
            </Table.HeadCell>            
            <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
              Request
            </Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {filteredItems.map((item) => (
              <>
              <Table.Row className="bg-[white] dark:border-gray-500 dark:bg-gray-800 text-[#1f1f1f]" key={item._id}>
                <Table.Cell>{item.itemCode}</Table.Cell>
                <Table.Cell>{item.itemName}</Table.Cell>
                <Table.Cell>{item.description}</Table.Cell>
                <Table.Cell>{item.quantity}</Table.Cell>
                <Table.Cell>{item.itemStatus}</Table.Cell>
                <Link to={`/add-service-request/${item._id}`}>
                  <Table.Cell>
                    <span className="font-medium text-green-500 hover:underline cursor-pointer">Make Request</span>
                  </Table.Cell>
                </Link>
              </Table.Row>
              </>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <p>No items found.</p>
      )}
    </div>
  );
}
