import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Button, Table } from "flowbite-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSnackbar } from "notistack";
import { BarChart } from "@tremor/react";
//import { response } from "express";

const AdminSubscriptionPanel = () => {
  const [subPackages, setSubPackages] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [totalMonthly, setTotalMonthly] = useState(0);
  const [totalQuarterly, setTotalQuarterly] = useState(0);
  const [totalYearly, setTotalYearly] = useState(0);
  const [totalWeek, setTotalWeek] = useState(0);
  const [subPackageDelete, setSubPackageDelete] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const chartdata = [
    { name: "Monthly", "Number of Packages": totalMonthly },
    { name: "Quarterly", "Number of Packages": totalQuarterly },
    { name: "Yearly", "Number of Packages": totalYearly },
    { name: "Weekly", "Number of Packages": totalWeek },
  ];
  const dataFormatter = (number) =>
    Intl.NumberFormat("us").format(number).toString();

  useEffect(() => {
    setLoading(true);
    if (currentUser.isAdmin || currentUser.role === "Manager") {
      axios
        .get(`/api/subpackage/getSubPackage`)
        .then((response) => {
          setSubPackages(response.data.data);
          setTotalMonthly(response.data.totalMonthly);
          setTotalQuarterly(response.data.totalQuarterly);
          setTotalYearly(response.data.totalYearly);
          setTotalWeek(response.data.totalWeek);
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

  console.log(totalMonthly);
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

  return (
    <div className="p-4">
      {currentUser.isAdmin || currentUser.role === "Manager" ? (
        <>
          <h1 className="text-center m-5 font-bold text-2xl uppercase">
            All Package Valid Time Chart
          </h1>
          <div className="p-3 bg-white rounded-md shadow-lg w-full md:max-w-md">
            <div className="w-full">
              <h3 className="text-lg font-medium text-center text-tremor-content-strong dark:text-dark-tremor-content-strong">
                Number of All Packages by Valid Time
              </h3>
              <div className="mt-6">
                <BarChart
                  data={chartdata}
                  index="name"
                  categories={["Number of Packages"]}
                  colors={["red"]}
                  valueFormatter={dataFormatter}
                  yAxisWidth={50}
                />
              </div>
            </div>
          </div>
          <div className="p-2 m-2">
            <Link to={"/subpackages/create"}>
              <button className="focus:outline-none font-bold text-white bg-red-700 hover:bg-red-800 focus:ring-4 rounded-lg text-sm px-5 py-3 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                Create New Package
              </button>
            </Link>
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
                  Operations
                </Table.HeadCell>
              </Table.Head>
              {subPackages.map((subPackage, index) => (
                <>
                  <Table.Body className="divide-y" key={subPackage._id}>
                    {subPackage.Pactype === "SubscriptionPackage" && (
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
};

export default AdminSubscriptionPanel;
