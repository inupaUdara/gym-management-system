import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Table } from "flowbite-react";
import { useSnackbar } from "notistack";

const AdminApprovePromo = () => {
  const [subPackages, setSubPackages] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [subPackageDelete, setSubPackageDelete] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    if (currentUser.isAdmin || currentUser.role === "Manager") {
      axios
        .get(`/api/subpackage/getSubPackage`)
        .then((response) => {
          setSubPackages(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [currentUser._id]);

  const handleDeletePackage = (subPackageId) => {
    setLoading(true);
    axios
      .delete(`/api/subpackage/deleteSubPackage/${subPackageId}`)
      .then(() => {
        setSubPackages(subPackages.filter((subPackage) => subPackage._id !== subPackageId));
        enqueueSnackbar("Package Deleted Successfully", { variant: "success" });
      })
      .catch((error) => {
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
        setSubPackageDelete(""); // Reset the subPackageDelete state after deleting
      });
  };

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      { currentUser.isAdmin || currentUser.role === "Manager" ? ( 
        <>
          <Table hoverable className='shadow-md'>
          <Table.Head>
            <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
              No
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
              Package Name
            </Table.HeadCell>
            <Table.HeadCell className="bg-[#1f1f1f] text-[#d4d4d4]">
              Price
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
          </Table.Head>
          {subPackages.map((subPackage, index) => (
            <>
              <Table.Body className='divide-y' key={subPackage._id}>
              {subPackage.Pactype === "PromotionPackage" && (
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800 text-[#1f1f1f]'>
                  <Table.Cell>
                    {index + 1}
                  </Table.Cell>
                  <Table.Cell>
                    {subPackage.subPackageName}
                  </Table.Cell>
                  <Table.Cell>
                    {subPackage.price}
                  </Table.Cell>
                  <Table.Cell>
                    {subPackage.validTime}
                  </Table.Cell>
                  <Table.Cell>
                    {subPackage.description}
                  </Table.Cell>
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
                  <Table.Cell>
                    <select>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </Table.Cell>
                </Table.Row> 
              )}
            </Table.Body>
            </>
          ))}
          </Table>
        </>
      ) : (
        <p> No packages yet!</p>
      )}
    </div>
  );
};

export default AdminApprovePromo;
