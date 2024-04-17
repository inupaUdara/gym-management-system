import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function InventoryViewItems() {
  const { currentUser } = useSelector((state) => state.user);
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [itemIdToDelete, setItemToDelete] = useState("");

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
    if (currentUser.isAdmin || currentUser.role === "Manager") {
      fetchItems();
    }
  }, [currentUser]);

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
      {items.length > 0 ? (
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
            {items.map((item) => (
              <Table.Row className="bg-[white] dark:border-gray-700 dark:bg-gray-800 text-[#1f1f1f]" key={item._id}>
                <Table.Cell>{item.itemCode}</Table.Cell>
                <Table.Cell>{item.itemName}</Table.Cell>
                <Table.Cell>{item.description}</Table.Cell>
                <Table.Cell>{item.quantity}</Table.Cell>
                <Table.Cell>{item.itemStatus}</Table.Cell>
                <Link to={`/admin-dashboard?tab=update-inventory&itemId=${item.itemCode}`}>
                  <Table.Cell className="text-green-400 cursor-pointer hover:underline">
                    Update
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
        <p>You have no items in inventory yet!</p>
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
    </div>
  );
}
