import { useEffect, useState } from "react";
import { Spinner, Modal, Button } from "flowbite-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSnackbar } from 'notistack';
//import { response } from "express";

const AdminSubscriptionPanel = () => {
  const [subPackages, setSubPackage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subPackageDelete, setSubPackageDelete] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/subpackage/getSubPackage`)
      .then((response) => {
        setSubPackage(response.data.data)
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })
  }, []);

  const handledeletePackage = () => {
    setLoading(true);
    axios
      .delete(`/api/subpackage/deleteSubPackage/${subPackageDelete}`)
      .then(() => {
        setSubPackage(subPackages.filter((subPackage) => subPackage._id !== subPackageDelete));
        enqueueSnackbar("Package Deleted Successfully", {variant: 'success'});
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        //alert("An error happend, Please Check Console");
        enqueueSnackbar("Error", {variant: 'error'});
        console.log(error);
      });
  }

  return (
    <div className="p-4">
      <div className="p-2 m-2">
        <Link to={"/subpackages/create"}>
            <button className="focus:outline-none font-bold text-white bg-red-700 hover:bg-red-800 focus:ring-4 rounded-lg text-sm px-5 py-3 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"> 
              Create New Package
            </button>
        </Link>
      </div>
      {loading ? (
          <Spinner size="md" color="red-800" />
      ):(
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">Package Name</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">Price</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">Valid Time</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">Description</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">Specific</th>
              <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {subPackages.map((subPackage, index) => (
              <tr key={subPackage._id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {subPackage.subPackageName}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {subPackage.price}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {subPackage.validTime}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {subPackage.description}
                </td>
                <td className="border border-slate-700 rounded-md max-md:hidden">
                  <ul className="max-w-md space-y-1 list-disc list-inside">
                    <li>{subPackage.note1}</li>
                    <li>{subPackage.note2}</li>
                    <li>{subPackage.note3}</li>
                  </ul>
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/subpackages/details/${subPackage._id}`}>
                      <BsInfoCircle className="text-2xl text-green-800"/>
                    </Link>
                    <Link to={`/subpackages/edit/${subPackage._id}`}>
                      <AiOutlineEdit className="text-2xl text-yellow-600"/>
                    </Link>
                    <Link >
                      <MdOutlineDelete onClick={() => {
                        setLoading(true);
                        setSubPackageDelete(subPackage._id);
                      }}
                       className="text-2xl text-red-600"/>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Modal
        show={loading}
        onClose={() => setLoading(false)}
        popup
        size="md"
      >
        <Modal.Header/>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this package?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handledeletePackage}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setLoading(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
export default AdminSubscriptionPanel
