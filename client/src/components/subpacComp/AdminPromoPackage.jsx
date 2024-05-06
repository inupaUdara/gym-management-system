import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Button, Table } from "flowbite-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit, AiOutlineFileDone } from "react-icons/ai";
import { MdOutlineDelete, MdPendingActions } from "react-icons/md";
import { RiFileCloseLine } from "react-icons/ri";
import { HiOutlineExclamationCircle, HiArrowNarrowUp } from "react-icons/hi";
import { useSnackbar } from "notistack";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function AdminPromoPackage() {
  const [subPackages, setSubPackages] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [subPackageDelete, setSubPackageDelete] = useState("");
  const [totalApproved, setTotalApproved] = useState(0);
  const [totalRejected, setTotalRejected] = useState(0);
  const [totalPending, setTotalPending] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    if (currentUser.isAdmin || currentUser.role === "Manager") {
      axios
        .get(`/api/subpackage/getSubPackage`)
        .then((response) => {
          setSubPackages(response.data.data);
          setTotalApproved(response.data.totalApproved);
          setTotalRejected(response.data.totalRejected);
          setTotalPending(response.data.totalPending);
        })
        .catch((error) => {
          console.log(error);
          enqueueSnackbar(
            "Error",
            { variant: "error" },
            { anchorOrigin: { vertical: "bottom", horizontal: "right" } }
          );
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [currentUser._id, enqueueSnackbar]);

  const handleDeletePackage = (subPackageId) => {
    setLoading(true);
    axios
      .delete(`/api/subpackage/deleteSubPackage/${subPackageId}`)
      .then(() => {
        setSubPackages(
          subPackages.filter((subPackage) => subPackage._id !== subPackageId)
        );
        enqueueSnackbar(
          "Package Deleted Successfully",
          { variant: "success" },
          { anchorOrigin: { vertical: "bottom", horizontal: "right" } }
        );
        setSubPackageDelete("");
      })
      .catch((error) => {
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Promotion Packages Report", 14, 10);
    const promotionPackages = subPackages.filter((subPackage) => subPackage.Pactype === "PromotionPackage");
    doc.autoTable({
      head: [
        [
          "No",
          "Package Name",
          "Price (LKR)",
          "Valid Time",
          "Description",
          "Specific",
          "Start Date",
          "End Date",
          "Status",
        ],
      ],
      body: promotionPackages.map((subPackage, index) => [
        
        index + 1,
        subPackage.subPackageName,
        subPackage.price,
        `per ${subPackage.validTime}`,
        subPackage.description,
        `${subPackage.note1}\n${subPackage.note2}\n${subPackage.note3}`,
        new Date(subPackage.startDate).toLocaleDateString(),
        new Date(subPackage.endDate).toLocaleDateString(),
        subPackage.status,
      ]),
    });
    doc.text(
      `Total Approved: ${totalApproved}`,
      14,
      doc.autoTable.previous.finalY + 10
    );
    doc.text(
      `Total Rejected: ${totalRejected}`,
      14,
      doc.autoTable.previous.finalY + 20
    );
    doc.text(
      `Total Pending: ${totalPending}`,
      14,
      doc.autoTable.previous.finalY + 30
    );
    doc.save("promotion_packages_report.pdf");
  };

  return (
    <div className="p-4">
      {currentUser.isAdmin || currentUser.role === "Manager" ? (
        <>
          <div className="flex-wrap flex gap-4 justify-center">
            <div className="flex flex-col p-3 justify-between gap-4 md:w-72 w-full rounded-md shadow-md bg-white">
              <div className="flex justify-between">
                <div className="">
                  <h3 className="text-[#1f1f1f] text-md uppercase">
                    Total Approved
                  </h3>
                  <p className="text-2xl font-semibold">{totalApproved}</p>
                </div>
                <AiOutlineFileDone className="bg-green-600 text-white rounded-full text-5xl p-3 shadow-lg" />
              </div>
              <div className="flex gap-2 text-sm">
                <span className="text-green-500 flex items-center">
                  <HiArrowNarrowUp />
                  <p>{totalApproved}</p>
                </span>
                <div className="text-[#707070]">Last month</div>
              </div>
            </div>
            <div className="flex flex-col p-3 justify-between gap-4 md:w-72 w-full rounded-md shadow-md bg-white">
              <div className="flex justify-between">
                <div className="">
                  <h3 className="text-[#1f1f1f] text-md uppercase">
                    Total Rejected
                  </h3>
                  <p className="text-2xl font-semibold">{totalRejected}</p>
                </div>
                <RiFileCloseLine className="bg-red-600 text-white rounded-full text-5xl p-3 shadow-lg" />
              </div>
              <div className="flex gap-2 text-sm">
                <span className="text-green-500 flex items-center">
                  <HiArrowNarrowUp />
                  <p>{totalRejected}</p>
                </span>
                <div className="text-[#707070]">Last month</div>
              </div>
            </div>
            <div className="flex flex-col p-3 justify-between gap-4 md:w-72 w-full rounded-md shadow-md bg-white">
              <div className="flex justify-between">
                <div className="">
                  <h3 className="text-[#1f1f1f] text-md uppercase">
                    Total Pending
                  </h3>
                  <p className="text-2xl font-semibold">{totalPending}</p>
                </div>
                <MdPendingActions className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
              </div>
              <div className="flex gap-2 text-sm">
                <span className="text-green-500 flex items-center">
                  <HiArrowNarrowUp />
                  <p>{totalPending}</p>
                </span>
                <div className="text-[#707070]">Last month</div>
              </div>
            </div>
          </div>
          <div className="p-3">
            <button className="focus:outline-none font-bold text-white bg-red-700 hover:bg-red-800 focus:ring-4 rounded-lg text-sm px-4 py-3 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={generatePDF}>
              Generate Report
            </button>
          </div>
          <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
            <Table hoverable className="shadow-md">
              <Table.Head>
                <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
                  No
                </Table.HeadCell>
                <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
                  Package Name
                </Table.HeadCell>
                <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
                  Price (LKR)
                </Table.HeadCell>
                <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
                  Valid Time
                </Table.HeadCell>
                <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
                  Description
                </Table.HeadCell>
                <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
                  Specific
                </Table.HeadCell>
                <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
                  Start Date
                </Table.HeadCell>
                <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
                  End Date
                </Table.HeadCell>
                <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
                  Status
                </Table.HeadCell>
                <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
                  Operations
                </Table.HeadCell>
              </Table.Head>
              {subPackages.map((subPackage, index) => (
                <>
                  <Table.Body className="divide-y" key={subPackage._id}>
                    {subPackage.Pactype === "PromotionPackage" && (
                      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 text-[#1f1f1f]">
                        <Table.Cell>{index + 1}</Table.Cell>
                        <Table.Cell>{subPackage.subPackageName}</Table.Cell>
                        <Table.Cell>{subPackage.price}</Table.Cell>
                        <Table.Cell>per {subPackage.validTime}</Table.Cell>
                        <Table.Cell>{subPackage.description}</Table.Cell>
                        <Table.Cell>
                          <ul className="max-w-md space-y-1 list-disc list-inside">
                            <li>{subPackage.note1}</li>
                            <li>{subPackage.note2}</li>
                            <li>{subPackage.note3}</li>
                          </ul>
                        </Table.Cell>
                        <Table.Cell>
                          {new Date(subPackage.startDate).toLocaleDateString()}
                        </Table.Cell>
                        <Table.Cell>
                          {new Date(subPackage.endDate).toLocaleDateString()}
                        </Table.Cell>
                        <Table.Cell>{subPackage.status}</Table.Cell>
                        <Table.Cell>
                          <div className="flex justify-center gap-x-4">
                            <Link to={`/subpackages/details/${subPackage._id}`}>
                              <BsInfoCircle className="text-2xl text-green-800" />
                            </Link>
                            <Link to={`/subpackages/edit/${subPackage._id}`}>
                              <AiOutlineEdit className="text-2xl text-yellow-600" />
                            </Link>
                            <MdOutlineDelete
                              onClick={() => {
                                setSubPackageDelete(subPackage._id);
                              }}
                              className="text-2xl text-red-600 cursor-pointer"
                            />
                          </div>
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
        <p>No packages yet!</p>
      )}
      <Modal
        show={!!subPackageDelete}
        onClose={() => setSubPackageDelete("")}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this package?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => handleDeletePackage(subPackageDelete)}
              >
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setSubPackageDelete("")}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
