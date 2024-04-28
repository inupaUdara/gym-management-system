import { useState, useEffect } from "react";
import { Spinner } from "flowbite-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditShipping = () => {
  const [shippingMethodName, setShippingMethodName] = useState("");
  const [shippingCost, setShippingCost] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/shipping/getShippingID/${id}`)
      .then((response) => {
        setShippingMethodName(response.data.shippingMethodName);
        setShippingCost(response.data.shippingCost);

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happend. Please Check console");
        console.log(error);
      });
  }, [id]);

  const handleEditShipping = () => {
    const data = {
      shippingMethodName,
      shippingCost,
    };
    setLoading(true);
    axios
      .put(`/api/shipping/updateShipping/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Shipping Method edit is Successfully!", {
          variant: "success",
        });
        navigate("/admin-dashboard?tab=manage-shipping");
      })
      .catch((error) => {
        setLoading(false);
        //alert('An error happend. Please Check console');
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-5xl my-10 text-center font-bold">
        Edit Shipping Method
      </h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-red-700 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Pakage Name</label>
          <input
            type="text"
            value={shippingMethodName}
            onChange={(e) => setShippingMethodName(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Price</label>
          <input
            type="text"
            value={shippingCost}
            onChange={(e) => setShippingCost(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button
          className="focus:outline-none font-bold text-white bg-red-700 hover:bg-red-800 rounded-lg text-sm px-5 py-3 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700"
          onClick={handleEditShipping}
        >
          Save Edit
        </button>
      </div>
    </div>
  );
};

export default EditShipping;
