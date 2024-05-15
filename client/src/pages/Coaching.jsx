import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import gymImg from "../assets/cimg.jpg";

export default function Coaching() {
  const [users, setUsers] = useState([]);
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [idealWeight, setIdealWeight] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3001")
      .then((result) => setUsers(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/deleteUser/${id}`)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const calculateIdealWeight = () => {
    let idealWeight;
    if (gender === "male") {
      idealWeight = (parseFloat(height) - 100 + parseFloat(age) / 10) * 0.9;
    } else if (gender === "female") {
      idealWeight = (parseFloat(height) - 100 + parseFloat(age) / 10) * 0.85;
    } else {
      return "Invalid gender";
    }
    setIdealWeight(idealWeight.toFixed(2));
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${gymImg})` }}
    >
      <Header />
      <div className="container mx-auto py-8 text-white">
        <h1 className="text-3xl font-bold text-center mb-8">
          Let's Book an Appointment
        </h1>
        <div className="flex justify-center space-x-4 mb-8">
          <Link
            to="/scheduleSession"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Book an Appointment
          </Link>
        </div>
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-center mb-4">
            Ideal Weight Calculator
          </h2>
          <p className="text-center text-gray-300 mb-6">
            The Ideal Weight Calculator computes ideal body weight (IBW) ranges
            based on height, gender, and age. The idea of finding the IBW using
            a formula has been sought after by many experts for a long time.
            Currently, there persist several popular formulas, and our Ideal
            Weight Calculator provides their results for side-to-side
            comparisons.
          </p>
          <div className="flex justify-center mb-4">
            <input
              type="number"
              className="border border-gray-300 text-black rounded-md px-4 py-2 mr-2 focus:outline-none focus:border-blue-500"
              placeholder="Height (cm)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            <input
              type="number"
              className="border border-gray-300 text-black rounded-md px-4 py-2 mr-2 focus:outline-none focus:border-blue-500"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <select
              className="border border-gray-300 text-black rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="flex justify-center">
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              onClick={calculateIdealWeight}
            >
              Calculate
            </button>
          </div>
          {idealWeight > 0 && (
            <div className="text-center mt-4">
              <p className="text-lg font-bold">
                Your Ideal Weight: {idealWeight} kg
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex h-screen bg-primary justify-center items-center"></div>
    </div>
  );
}
