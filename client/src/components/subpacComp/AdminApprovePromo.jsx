import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Button } from "flowbite-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FcApproval } from "react-icons/fc";
import { MdOutlineDelete } from "react-icons/md";
import { HiOutlineExclamationCircle } from "react-icons/hi";
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
    <div className="p-4">
      {currentUser.isAdmin || currentUser.role === "Manager" ? (
        <>
          <table className="w-full border-separate border-spacing-2">
            <thead>
              <tr>
                <th className="border border-slate-600 rounded-md">No</th>
                <th className="border border-slate-600 rounded-md">Package Name</th>
                <th className="border border-slate-600 rounded-md max-md:hidden">Price</th>
                <th className="border border-slate-600 rounded-md max-md:hidden">Valid Time</th>
                <th className="border border-slate-600 rounded-md max-md:hidden">Description</th>
                <th className="border border-slate-600 rounded-md max-md:hidden">Specific</th>
                <th className="border border-slate-600 rounded-md max-md:hidden">Start Date</th>
                <th className="border border-slate-600 rounded-md max-md:hidden">End Date</th>
                <th className="border border-slate-600 rounded-md">Operations</th>
              </tr>
            </thead>
            <tbody>
              {subPackages.map((subPackage, index) => (
                <>
                  {subPackage.Pactype === "PromotionPackage" && (
                <tr key={subPackage._id} className="h-8">
                    <td className="border border-slate-700 rounded-md text-center">{index + 1}</td>
                    <td className="border border-slate-700 rounded-md text-center">{subPackage.subPackageName}</td>
                    <td className="border border-slate-700 rounded-md text-center max-md:hidden">LKR {subPackage.price}</td>
                    <td className="border border-slate-700 rounded-md text-center max-md:hidden">{subPackage.validTime}</td>
                    <td className="border border-slate-700 rounded-md text-center max-md:hidden">{subPackage.description}</td>
                    <td className="border border-slate-700 rounded-md max-md:hidden">
                      <ul className="max-w-md space-y-1 list-disc list-inside">
                        <li>{subPackage.note1}</li>
                        <li>{subPackage.note2}</li>
                        <li>{subPackage.note3}</li>
                      </ul>
                    </td>
                    <td className="border border-slate-700 rounded-md max-md:hidden">
                      {new Date(subPackage.startDate).toLocaleDateString("en-CA")}
                    </td>
                    <td className="border border-slate-700 rounded-md max-md:hidden">
                      {new Date(subPackage.endDate).toLocaleDateString("en-CA")}
                    </td>
                    <td className="border border-slate-700 rounded-md text-center">
                      <div className="flex justify-center gap-x-4">
                        <FcApproval className="text-2xl text-green-600" />
                        <MdOutlineDelete
                          onClick={() => setSubPackageDelete(subPackage._id)}
                          className="text-2xl text-red-600 cursor-pointer"
                        />
                      </div>
                    </td>
                  </tr>
                )}
                </>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>No packages yet!</p>
      )}
      <Modal show={!!subPackageDelete} onClose={() => setSubPackageDelete("")} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this package?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => handleDeletePackage(subPackageDelete)}>
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

export default AdminApprovePromo;
