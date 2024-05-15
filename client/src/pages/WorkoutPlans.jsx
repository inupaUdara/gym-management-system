import React, { useState } from "react";
import axios from "axios";
import Wland from "../components/Wland";
import ClientInfo from "../components/ClientInfo";
import HealthInfo from "../components/HealthInfo";
import FitnessGoals from "../components/FitnessGoals";
import Lifestyle from "../components/Lifestyle";
import Aditional from "../components/Aditional";
import land1 from "../assets/land1.png";
import land2 from "../assets/land2.png";
import land3 from "../assets/land3.png";
import land4 from "../assets/land4.png";
import land5 from "../assets/land5.png";
import land6 from "../assets/land6.png";
import Header from "../components/Header";

const WorkoutPlans = () => {
  const [page, setPage] = useState(0);
  const [data, setData] = useState({
    name: "",
    age: "",
    gender: "",
    number: "",
    email: "",
    h1: "",
    h2: "",
    h3: "",
    h4: "",
    h5: "",
    f1: "",
    f2: "",
    f3: "",
    f4: "",
    f5: "",
    l1: "",
    l2: "",
    l3: "",
    l4: "",
    addi: "",
  });

  const updateData = (key, value) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const postWorkoutData = async () => {
    try {
      await axios.post(`/api/WorkoutPlans/create`, data);
      console.log("Form submitted successfully");
      alert("Successfully Submitted");
    } catch (error) {
      alert("Submission Failed. Please try again later.");
      console.log("Error submitting form:", error);
    }
  };

  const workoutDetails = (e) => {
    e.preventDefault();
    if (page === 5) {
      postWorkoutData();
    } else {
      setPage((prevPage) => Math.min(prevPage + 1, 5));
    }
  };
  const titles = [
    "Workout Plan Questionnaire",
    "Client Information",
    "Health History",
    "Fitness Goals",
    "Lifestyle",
    "Additional Comments or Concerns",
  ];
  const images = [land1, land2, land3, land4, land5, land6];

  console.log(data);

  const pageDisplay = () => {
    switch (page) {
      case 0:
        return <Wland data={data} setData={setData} />;
      case 1:
        return <ClientInfo data={data} setData={setData} />;
      case 2:
        return <HealthInfo data={data} setData={setData} />;
      case 3:
        return <FitnessGoals data={data} setData={setData} />;
      case 4:
        return <Lifestyle data={data} setData={setData} />;
      case 5:
        return <Aditional data={data} setData={setData} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="flex-1 flex">
        <div className="w-1/2 bg-black">
          <div className="p-10">
            <h1 className="text-white font-extrabold text-3xl lg:text-6xl">
              {titles[page]}
            </h1>
          </div>
          <div>{pageDisplay()}</div>
          <div className="flex flex-row gap-5 p-10 py-0 ">
            <button
              disabled={page === 0}
              onClick={() => setPage((prevPage) => Math.max(0, prevPage - 1))}
              className={`flex cursor-pointer rounded-lg border border-transparent py-2 px-5 text-3xl lg:text-3xl font-semibold text-white ${page === 0 && "opacity-50 cursor-not-allowed"}`}
              type="button"
            >
              Prev
            </button>
            {page === 5 ? (
              <button
                onClick={postWorkoutData}
                className="flex cursor-pointer rounded-lg border border-transparent py-2 px-5 text-3xl lg:text-3xl font-semibold bg-red-600 text-white"
                type="submit"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={workoutDetails}
                className="flex cursor-pointer rounded-lg border border-transparent py-2 px-5 text-3xl lg:text-3xl font-semibold text-white bg-red-600"
                type="button"
              >
                Next
              </button>
            )}
          </div>
        </div>
        <div className="w-2/3 relative">
          <img
            className="w-full h-screen bg-center bg-cover"
            src={images[page]}
            alt={`Background ${page}`}
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center"></div>
        </div>
      </div>
    </>
  );
};

export default WorkoutPlans;
