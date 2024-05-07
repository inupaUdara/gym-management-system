import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Button } from "flowbite-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSnackbar } from "notistack";

const ManageShippingMethods = () => {
  const [shippingMethod, setShippingMethod] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [shippingMethodDelete, setShippingMethodDelete] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    if (currentUser.isAdmin || currentUser.role === "Manager") {
      axios
        .get(`/api/shipping/getShippingMethods`)
        .then((response) => {
          setShippingMethod(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [currentUser._id]);

  const handledeleteShipping = () => {
    setLoading(true);
    axios
      .delete(`/api/shipping/deleteShipping/${shippingMethodDelete}`)
      .then(() => {
        setShippingMethod(
          shippingMethod.filter(
            (shippingMethod) => shippingMethod._id !== shippingMethodDelete
          )
        );
        enqueueSnackbar("Package Deleted Successfully", { variant: "success" });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        //alert("An error happend, Please Check Console");
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      {currentUser.isAdmin || currentUser.role === "Manager" ? (
        <>
          <div className="p-2 m-2">
            <Link to={"/shipping/create"}>
              <button className="focus:outline-none font-bold text-white bg-red-700 hover:bg-red-800 focus:ring-4 rounded-lg text-sm px-5 py-3 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                Create New Shipping Method
              </button>
            </Link>
          </div>
          <table className="w-full border-separate border-spacing-2">
            <thead>
              <tr>
                <th className="border border-slate-600 rounded-md">No</th>
                <th className="border border-slate-600 rounded-md">
                  Package Name
                </th>
                <th className="border border-slate-600 rounded-md max-md:hidden">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {shippingMethod.map((shippingMethod, index) => (
                <tr key={shippingMethod._id} className="h-8">
                  <td className="border border-slate-700 rounded-md text-center">
                    {index + 1}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    {shippingMethod.shippingMethodName}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                    {shippingMethod.shippingCost}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    <div className="flex justify-center gap-x-4">
                      <Link to={`/shipping/edit/${shippingMethod._id}`}>
                        <AiOutlineEdit className="text-2xl text-yellow-600" />
                      </Link>
                      <Link>
                        <MdOutlineDelete
                          onClick={() => {
                            setLoading(true);
                            setShippingMethodDelete(shippingMethod._id);
                          }}
                          className="text-2xl text-red-600"
                        />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>No packages yet!</p>
      )}
      <Modal show={loading} onClose={() => setLoading(false)} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this package?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handledeleteShipping}>
                Yes, Im sure
              </Button>
              <Button color="gray" onClick={() => setLoading(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default ManageShippingMethods;
