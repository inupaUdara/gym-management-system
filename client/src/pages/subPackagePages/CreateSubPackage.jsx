import React, { useState } from "react";
import BackButton from "../../components/subpacComp/BackButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateSubPackage = () => {
  const [subPackageName, setSubPackageName] = useState("");
  const [price, setPrice] = useState("");
  const [validTime, setValidTime] = useState("");
  const [description, setDescription] = useState("");
  const [note1, setNote1] = useState("");
  const [note2, setNote2] = useState("");
  const [note3, setNote3] = useState("");
  const [Pactype, setPactype] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value > 0 && value <= 40000) {
      setPrice(value);
      setErrorMessage("");
    } else {
      setErrorMessage("Price must be a number between 1 and 40000");
    }
  };
  const handleSavePackage = () => {
    const data = {
      subPackageName,
      price,
      validTime,
      description,
      note1,
      note2,
      note3,
      Pactype,
      startDate: Pactype === "PromotionPackage" ? startDate : null,
      endDate: Pactype === "PromotionPackage" ? endDate : null,
      type: Pactype === "PromotionPackage" ? "Promotion Package" : "Subscription Package",
    };
    setLoading(true);
    axios
      .post("/api/subpackage/addSubPackage", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Package Created Successfully", { variant: "success" }, { anchorOrigin: { vertical: "bottom", horizontal: "right" }});
        navigate("/admin-dashboard?tab=admin-subscripition-panel");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-5xl my-10 text-center font-bold">
        Create Subscription Package
      </h1>

      <div className="flex flex-col border-2 border-red-700 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Package Name</label>
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
            type="number"
            value={price}
            onChange={handlePriceChange}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
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
              <option value="3 Month">3 Month</option>
              <option value="1 Year">1 Year</option>
              <option value="Week">Week</option>
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
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Package Type</label>
          <select
            className="border-2 border-gray-500 px-4 py-2 w-full"
            value={Pactype}
            onChange={(e) => setPactype(e.target.value)}
          >
            <option value="">select type</option>
            <option value="SubscriptionPackage">Subscription Package</option>
            <option value="PromotionPackage">Promotion Package</option>
          </select>
        </div>
        {Pactype === "PromotionPackage" && (
          <>
            <div className="my-4">
              <label className="text-xl mr-4 text-gray-500">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border-2 border-gray-500 px-4 py-2 w-full"
              />
            </div>
            <div className="my-4">
              <label className="text-xl mr-4 text-gray-500">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border-2 border-gray-500 px-4 py-2 w-full"
              />
            </div>
          </>
        )}
        <button
          className="focus:outline-none font-bold text-white bg-red-700 hover:bg-red-800 rounded-lg text-sm px-5 py-3 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700"
          onClick={handleSavePackage}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateSubPackage;
