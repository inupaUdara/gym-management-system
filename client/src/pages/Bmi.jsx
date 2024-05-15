import React, { useState } from "react";
import Header from "../components/Header";

const Bmi = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBMI] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const weightKg = parseFloat(weight);
    const heightCm = parseFloat(height);
    const heightM = heightCm / 100;
    const bmiResult = weightKg / (heightM * heightM);
    setBMI(bmiResult.toFixed(2));
  };

  const handleReset = () => {
    setWeight("");
    setHeight("");
    setBMI(null);
  };

  const bmiCategories = [
    {
      category: "Underweight",
      limit: 18.5,
      description: "You are underweight.",
    },
    {
      category: "Normal weight",
      limit: 24.9,
      description: "You have a normal weight.",
    },
    { category: "Overweight", limit: 29.9, description: "You are overweight." },
    { category: "Obesity", limit: 100, description: "You are obese." },
  ];

  const getBmiCategory = (bmi) => {
    for (const category of bmiCategories) {
      if (bmi <= category.limit) {
        return category;
      }
    }
    return null;
  };

  const bmiCategory = bmi !== null ? getBmiCategory(bmi) : null;

  return (
    <>
    <Header/>
    <div className="flex-grow w-full min-h-[60vh] bg-[#d4d4d4] p-5 md:p-10">
      <div className="max-w-[800px] mx-auto rounded-md p-5 bg-white shadow-lg">
        <div className="text-black font-extrabold text-3xl lg:text-6xl text-center mb-5">
          <h1>
            <strong>BMI Calculator</strong>
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="mb-5">
          <div className="flex justify-center mb-3">
            <label htmlFor="weight" className="mr-3">
              Weight (kg):
            </label>
            <input
              id="weight"
              type="number"
              placeholder="kg.."
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          <div className="flex justify-center mb-3">
            <label htmlFor="height" className="mr-3">
              Height (cm):
            </label>
            <input
              id="height"
              type="number"
              placeholder="cm.."
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>

          <div className="flex justify-center">
            <button
              className="bg-red-600 text-white px-5 py-2 rounded-lg font-semibold mr-3"
              type="button"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              className="bg-red-600 text-white px-5 py-2 rounded-lg font-semibold"
              type="submit"
            >
              Calculate
            </button>
          </div>
        </form>

        {bmi !== null && (
          <div className="text-center">
            <h2 className="text-xl lg:text-2xl font-semibold mb-3">
              Your BMI is: {bmi}
            </h2>
            {bmiCategory && (
              <div className="bg-gray-200 p-4 rounded-lg">
                <h3 className="text-lg font-semibold">
                  BMI Category: {bmiCategory.category}
                </h3>
                <p>{bmiCategory.description}</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-3">
            BMI Categories and Descriptions
          </h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 p-2">BMI Range</th>
                <th className="border border-gray-300 p-2">Category</th>
                <th className="border border-gray-300 p-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {bmiCategories.map((category, index) => (
                <tr
                  key={index}
                  className={
                    bmiCategory && bmiCategory.category === category.category
                      ? "bg-yellow-200"
                      : ""
                  }
                >
                  <td className="border border-gray-300 p-2">
                    {index === 0
                      ? `< ${category.limit}`
                      : `${bmiCategories[index - 1].limit} - ${index === bmiCategories.length - 1 ? ">" : category.limit}`}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {category.category}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {category.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
};

export default Bmi;
