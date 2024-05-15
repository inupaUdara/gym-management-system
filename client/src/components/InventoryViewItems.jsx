import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";

export default function InventoryViewItems() {
  const { currentUser } = useSelector((state) => state.user);
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [itemIdToDelete, setItemToDelete] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [inUseCount, setInUseCount] = useState(0);
  const [inServiceCount, setInServiceCount] = useState(0);
  const [notForUseCount, setNotForUseCount] = useState(0);

  const rowHeight = 7; // Adjust as needed
  const categorySpacing = 20; // Adjust as needed
  const columnWidth = 40; // Adjust as needed
  const tableWidth = 190; // Adjust as needed
  let y = 20;

  const prepareDownloadReport = () => {
    const reportData = {
      inUse: inUseCount,
      inService: inServiceCount,
      notForUse: notForUseCount,
      items: {
        inUse: items.filter((item) => item.itemStatus === "in_use"),
        inService: items.filter((item) => item.itemStatus === "in_service"),
        notForUse: items.filter((item) => item.itemStatus === "unusable"),
      },
    };
    return reportData;
  };

  // Function to handle download report
  const handleDownloadReport = () => {
    const reportData = prepareDownloadReport();

    // Create a new PDF document
    const doc = new jsPDF();

    // Define table headers and columns
    const tableHeaders = [
      "Item Code",
      "Item Name",
      "Description",
      "Quantity",
      "Status",
    ];

    // Set initial y position for the table
    let y = 20;

    // Add content to the PDF document for each category
    Object.keys(reportData.items).forEach((category) => {
      // Add category heading
      doc.setFontSize(16).setTextColor(0, 0, 0).setFont("bold");
      doc.text(category, 10, y + 10);

      // Add table headers
      doc.setFillColor(200, 200, 200);
      doc.setFontSize(12).setTextColor(0, 0, 0).setFont("bold");
      doc.rect(10, y + 15, tableWidth, rowHeight, "F");
      tableHeaders.forEach((header, index) => {
        doc.text(header, 15 + index * columnWidth, y + 22);
      });

      // Add table rows
      reportData.items[category].forEach((item, rowIndex) => {
        const fillColor =
          rowIndex % 2 === 0 ? [255, 255, 255] : [230, 230, 230];
        doc.setFillColor.apply(undefined, fillColor);
        doc.setFontSize(10).setTextColor(0, 0, 0).setFont("normal");
        doc.rect(10, y + 25 + rowIndex * rowHeight, tableWidth, rowHeight, "F");
        Object.values(item).forEach((value, columnIndex) => {
          doc.text(
            value.toString(),
            15 + columnIndex * columnWidth,
            y + 30 + rowIndex * rowHeight
          );
        });
      });

      // Increment y position for the next category
      y += 30 + reportData.items[category].length * rowHeight + categorySpacing;
    });
    // Save PDF document as file
    doc.save("inventory_report.pdf");
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("/api/inventory/getItems");
        const data = await res.json();
        if (res.ok) {
          setItems(data.items);
          const inUse = data.items.filter(
            (item) => item.itemStatus === "in_use"
          ).length;
          const inService = data.items.filter(
            (item) => item.itemStatus === "in_service"
          ).length;
          const notForUse = data.items.filter(
            (item) => item.itemStatus === "unusable"
          ).length;
          setInUseCount(inUse);
          setInServiceCount(inService);
          setNotForUseCount(notForUse);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin || currentUser.role === "Manager") {
      fetchItems();
    }
  }, [currentUser]);

  // Function to handle search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter items based on search term
  const filteredItems = items.filter(
    (item) =>
      item.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteItem = async () => {
    try {
      const res = await fetch(`/api/inventory/deleteItem/${itemIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setItems((prevItems) =>
          prevItems.filter((item) => item._id !== itemIdToDelete)
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
      {/* Dashboard section */}
      <div className="flex justify-around p-4 bg-gray-100 rounded-lg shadow-md">
        <div className="text-center">
          <p className="font-semibold text-lg">In Use</p>
          <p className="text-2xl text-blue-500">{inUseCount}</p>
        </div>
        <div className="text-center">
          <p className="font-semibold text-lg">In Service</p>
          <p className="text-2xl text-green-500">{inServiceCount}</p>
        </div>
        <div className="text-center">
          <p className="font-semibold text-lg">Not for Use</p>
          <p className="text-2xl text-red-500">{notForUseCount}</p>
        </div>
      </div>

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
              Update
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
              Delete
            </Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {filteredItems.map((item) => (
              <Table.Row
                className="bg-[white] dark:border-gray-500 dark:bg-gray-800 text-[#1f1f1f]"
                key={item._id}
              >
                <Table.Cell>{item.itemCode}</Table.Cell>
                <Table.Cell>{item.itemName}</Table.Cell>
                <Table.Cell>{item.description}</Table.Cell>
                <Table.Cell>{item.quantity}</Table.Cell>
                <Table.Cell>{item.itemStatus}</Table.Cell>
                <Link to={`/update-inventory/${item._id}`}>
                  <Table.Cell>
                    <span className="font-medium text-green-500 hover:underline cursor-pointer">
                      Update
                    </span>
                  </Table.Cell>
                </Link>
                <Table.Cell>
                  <span
                    onClick={() => {
                      setShowModal(true);
                      setItemToDelete(item._id);
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
              Are you sure you want to delete this item?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteItem}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div className="flex justify-center mt-4">
        <Button
          onClick={handleDownloadReport}
          style={{ backgroundColor: "#A80000", color: "#ffffff" }}
        >
          Download Report
        </Button>
      </div>
    </div>
  );
}
