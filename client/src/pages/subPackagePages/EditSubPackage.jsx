import { useState, useEffect } from "react";
import BackButton from "../../components/subpacComp/BackButton";
//import { Spinner } from "flowbite-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { set } from "mongoose";

const EditSubPackage = () => {
  const [subPackageName, setSubPackageName] = useState("");
  const [price, setPrice] = useState("");
  const [validTime, setValidTime] = useState("");
  const [description, setDescription] = useState("");
  const [note1, setNote1] = useState("");
  const [note2, setNote2] = useState("");
  const [note3, setNote3] = useState("");
  const [Pactype, setPactype] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/subpackage/getIdSubPackage/${id}`)
      .then((response) => {
        setSubPackageName(response.data.subPackageName);
        setPrice(response.data.price);
        setValidTime(response.data.validTime);
        setDescription(response.data.description);
        setNote1(response.data.note1);
        setNote2(response.data.note2);
        setNote3(response.data.note3);
        setPactype(response.data.Pactype);
        setEndDate(response.data.endDate);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happend. Please Check console");
        console.log(error);
      });
  }, [id]);

  const handleEditPackage = () => {
    const data = {
      subPackageName,
      price,
      validTime,
      description,
      note1,
      note2,
      note3,
      endDate,
    };
    setLoading(true);
    axios
      .put(`/api/subpackage/updateSubPackage/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar(
          "Package edit is Successfully!",
          { variant: "success" },
          { anchorOrigin: { vertical: "bottom", horizontal: "right" } }
        );
        
        navigate("/admin-dashboard?tab=admin-subscripition-panel");
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
      <BackButton />
      <h1 className="text-5xl my-10 text-center font-bold">
        Edit Subscription Package
      </h1>
      <div className="flex flex-col border-2 border-red-700 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Pakage Name</label>
          <input
            type="text"
            value={subPackageName}
            onChange={(e) => setSubPackageName(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Price</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Valid Time</label>
          <select
            className="border-2 border-gray-500 px-4 py-2 w-full"
            value={validTime}
            onChange={(e) => setValidTime(e.target.value)}
          >
            <option value=" ">select time</option>
            <option value="1 Month">1 Month</option>
            <option value="3 Month">3 Months</option>
            <option value="1 Year">1 Year</option>
          </select>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Note 1</label>
          <input
            type="text"
            value={note1}
            onChange={(e) => setNote1(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Note 2</label>
          <input
            type="text"
            value={note2}
            onChange={(e) => setNote2(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Note 3</label>
          <input
            type="text"
            value={note3}
            onChange={(e) => setNote3(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        {
          Pactype === "PromotionPackage" && (
            <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
          )
        }
        <button
          className="focus:outline-none font-bold text-white bg-red-700 hover:bg-red-800 rounded-lg text-sm px-5 py-3 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700"
          onClick={handleEditPackage}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditSubPackage;
