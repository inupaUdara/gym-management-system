import React, { useEffect, useState } from 'react';
import { Modal, Table, Button } from 'flowbite-react'
import { useSelector } from 'react-redux'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { Link,useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ManagerShowMassGainer = () => {
  const [supplements, setSupplements] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [supplemetIdToDelete, setSupplementToDelete] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSupplements = async () => {
      try {
        const res = await fetch('/api/supplements/getAllSupplements');
        const data = await res.json();
        if (res.ok) {
          setSupplements(data.supplements);
        }
      } catch (error) {
        console.log(error.message);
      }
    };


  const fetchSearchbyname = async() => {
    try{
        const res = await fetch(`/api/supplements/getAllSupplements?search=${searchQuery}`);
        const data = await res.json();
        if (res.ok){
            setSupplements(data.supplements);
        }

        }catch (error){
            console.log(error.message);
        }
    };
    
    fetchSupplements();
    fetchSearchbyname();
  }, [searchQuery]  );

  const handleSearch =(event) =>{
    setSearchQuery(event.target.value);
  };

  const handleDeleteSupplemet = async () => {
    try {
        const res = await fetch(`/api/supplements/deleteSupplement/${supplemetIdToDelete}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (res.ok) {
          setSupplements((prev) =>
            prev.filter((supplement) => supplement._id !== supplemetIdToDelete)
          );
          setShowModal(false);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
  }

const generatesuplementReport = () => {
    const doc = new jsPDF();
    const tableData = supplements.map((supplement) => [
      new Date(supplement.createdAt).toLocaleDateString(),
      supplement.productName,
     supplement.brandName,
     supplement.description,
     supplement.category,
     supplement.price,
     supplement.sellingPrice,
     
    ]);
    doc.autoTable({
      head: [['productName', 'brandName', 'description', 'category', 'price', 'sellingPrice']],
      body: tableData,
    });
    doc.save('supplement_report.pdf');
  };

  return (
    <div className="table-auto md:mx-auto p-3 overflow-x-scroll scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {/* Search Bar for search supplementes*/}
      <div className="p-3">
        <input
          type="text"
          placeholder="Search supplement"
          value={searchQuery}
          onChange={handleSearch}
          className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>

    {currentUser.role === "Manager" && supplements.length > 0 ? (
        <>
    <div className='p-3'>
      <Button onClick={generatesuplementReport}>Download Supplements as PDF</Button>
    </div>
        <div className='p-3 mt-4'>
          <Table hoverable className="shadow-md ">
            <Table.Head>
            <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
              Date of added
              </Table.HeadCell>
            <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
              image
              </Table.HeadCell>
              <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
              product Name
              </Table.HeadCell>
              <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
              brand Name
              </Table.HeadCell>
              <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
              description
              </Table.HeadCell>
              <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
              category
              </Table.HeadCell>
              <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
              price
              </Table.HeadCell>
              <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
              selling Price
              </Table.HeadCell>
              <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
               Edit
              </Table.HeadCell>
              <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
                Delete
              </Table.HeadCell>

            </Table.Head>
            {supplements.map((supplement) => (
              <>
              <Table.Body className="divide-y" key={supplement._id}>
                {supplement.category == "massGainers" && ( 
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 text-[#1f1f1f]">
                  <Table.Cell>
                    {new Date(supplement.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                        src={supplement.imageUrls[0]}
                        alt={supplement.username}
                        className="w-10 h-10 object-cover border border-gray-700 bg-gray-500 rounded"
                    />
                  </Table.Cell>
                  <Table.Cell>{supplement.productName}</Table.Cell>
                  <Table.Cell>{supplement.brandName}</Table.Cell>
                  <Table.Cell>{supplement.description}</Table.Cell>
                  <Table.Cell>{supplement.category}</Table.Cell>
                  <Table.Cell>{supplement.price}</Table.Cell>
                  <Table.Cell>{supplement.sellingPrice}</Table.Cell>
                  <Table.Cell> 
                  <button onClick={() => navigate(`/updateSupplements/${supplement._id}`)} className='font-medium text-green-500 hover:underline cursor-pointer'>
                   Update
                   </button>
                   
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setSupplementToDelete(supplement._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
                )}
              </Table.Body>
              </>
            ))}
          </Table>
        </div>  
        </>
      ) : (
        <p>You have no supplements yet!</p>
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
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteSupplemet}>
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
};

export default ManagerShowMassGainer;
