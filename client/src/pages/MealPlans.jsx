import React, { useState } from "react";
import Mland from "../components/Mland";
import MealplanclientInfo from "../components/MealplanclientInfo";
import Dietary from "../components/Dietary";
import EatingHabits from "../components/EatingHabits";
import NutritionalGoals from "../components/NutritionalGoals";
import MealPreferences from "../components/MealPreferences";
import LifestyleFactors from "../components/LifestyleFactors";
import MealAditional from "../components/MealAditional";

import m1 from "../assets/m1.png";
import m2 from "../assets/m2.png";
import m3 from "../assets/m3.png";
import m4 from "../assets/m4.png";
import m5 from "../assets/m5.png";
import m6 from "../assets/m6.png";
import m7 from "../assets/m7.png";
import m8 from "../assets/m8.png";
import Header from "../components/Header";

const MealPlans = () => {
  const [page, setPage] = useState(0);
  const [data, setData] = useState({
    mname: "",
    mage: "",
    mgender: "",
    mnumber: "",
    memail: "",
    md1: "",
    md2: "",
    md3: "",
    me1: "",
    me2: "",
    me3: "",
    me4: "",
    me5: "",
    mn1: "",
    mn2: "",
    mn3: "",
    mn4: "",
    mp1: "",
    mp2: "",
    mp3: "",
    mp4: "",
    ml1: "",
    ml2: "",
    ml3: "",
    maddi: "",
  });

  const titles = [
    "Meal Plan Questionnaire",
    "Client Information",
    "Dietary Preferences",
    "Current Eating Habits",
    "Nutritional Goals",
    "Meal Preferences",
    "Lifestyle Factors",
    "Additional Comments or Concerns",
  ];
  const images = [m1, m2, m3, m4, m5, m6, m7, m8];

  const pageDisplay = () => {
    switch (page) {
      case 0:
        return <Mland data={data} setData={setData} />;
      case 1:
        return <MealplanclientInfo data={data} setData={setData} />;
      case 2:
        return <Dietary data={data} setData={setData} />;
      case 3:
        return <EatingHabits data={data} setData={setData} />;
      case 4:
        return <NutritionalGoals data={data} setData={setData} />;
      case 5:
        return <MealPreferences data={data} setData={setData} />;
      case 6:
        return <LifestyleFactors data={data} setData={setData} />;
      case 7:
        return <MealAditional data={data} setData={setData} />;
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
              className="flex cursor-pointer rounded-lg border border-transparent bg-red-600 py-2 px-5 text-3xl lg:text-3xl font-semibold text-white"
              type="button"
            >
              Prev
            </button>
            <button
              onClick={() => {
                if (page === titles.length - 1) {
                  alert("Form Submitted");
                } else {
                  setPage((prevPage) =>
                    Math.min(titles.length - 1, prevPage + 1)
                  );
                }
              }}
              className="flex cursor-pointer rounded-lg border border-transparent bg-red-600 py-2 px-5 text-3xl lg:text-3xl font-semibold text-white"
              type="button"
            >
              {page === titles.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        </div>
        <div className="w-2/3 relative">
          <img
            className="w-full h-screen bg-center bg-cover"
            src={images[page]}
            alt="background"
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center"></div>
        </div>
      </div>
    </>
  );
};

export default MealPlans;
