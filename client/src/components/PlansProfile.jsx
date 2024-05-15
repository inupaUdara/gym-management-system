import React, { useState, useEffect } from "react";
import { MdOutlinePendingActions } from "react-icons/md";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";

const PlansProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [weightData, setWeightData] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [graphPoints, setGraphPoints] = useState([]);
  const [yAxisLabels, setYAxisLabels] = useState([]);
  const [goalWeight, setGoalWeight] = useState(null);
  const [goalReached, setGoalReached] = useState(false);
  const [workouts, setWorkouts] = useState([]);

  console.log(workouts);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await fetch(
          `/api/createworkoutplans/getWorkout?userId=${currentUser._id}`
        );
        const data = await res.json();
        if (res.ok) {
          setWorkouts(data.workouts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchWorkouts();
  }, [currentUser._id]);

  const downloadFinishedPlans = () => {
    const doc = new jsPDF();

    const totalHeight = workouts.reduce((acc, workout) => {
      const planLines = doc.splitTextToSize(workout.plan, 180);
      const planHeight = planLines.length * 10;

      return acc + 40 + planHeight;
    }, 0);

    let y = 10;

    doc.text("Finished Plans", 10, y);

    workouts.forEach((workout) => {
      const planLines = doc.splitTextToSize(workout.plan, 180);
      const planHeight = planLines.length * 10;

      doc.text(`Client Name: ${workout.memberId}`, 10, y + 10);
      doc.text(
        `Date: ${new Date(workout.validDate).toLocaleDateString()}`,
        10,
        y + 20
      );
      doc.text(`Plan Type: ${workout.planType}`, 10, y + 30);
      planLines.forEach((line, i) => {
        doc.text(line, 10, y + 40 + i * 10);
      });

      y += 40 + planHeight;

      doc.line(10, y, 200, y);
    });

    doc.save("finished_plans.pdf");
  };

  const handleAddWeight = (event) => {
    event.preventDefault();
    const newWeight = parseFloat(event.target.weight.value);
    const monthIndex = new Date().getMonth();
    if (!isNaN(newWeight) && newWeight > 0) {
      setWeightData([...weightData, { weight: newWeight, month: monthIndex }]);
      setSuccessMessage("Weight added successfully!");

      if (goalWeight && newWeight >= goalWeight) {
        setGoalReached(true);
      }
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
    } else {
      setSuccessMessage("Please enter a valid positive weight!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
    }
    event.target.reset();
  };

  const handleSetGoalWeight = (event) => {
    event.preventDefault();
    const newGoalWeight = parseFloat(event.target.goalWeight.value);
    if (!isNaN(newGoalWeight) && newGoalWeight > 0) {
      setGoalWeight(newGoalWeight);
    } else {
      setGoalWeight(null);
    }
    event.target.reset();
  };

  useEffect(() => {
    const maxY = Math.max(
      ...weightData.map((data) => data.weight),
      goalWeight || 1
    );
    const scale = 120 / maxY;
    const points = weightData.map((data, index) => ({
      x: data.month * 90 + 50,
      y: 150 - data.weight * scale,
    }));
    setGraphPoints(points);

    const labelCount = 6;
    const labelInterval = maxY / (labelCount - 1);
    const weightLabels = Array.from({ length: labelCount }, (_, i) =>
      (maxY - i * labelInterval).toFixed(1)
    );
    setYAxisLabels(weightLabels);
  }, [weightData, goalWeight]);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className="">
      <div
        style={{
          maxHeight: "700px",
          maxWidth: "100%",
          margin: "10px",
          padding: "40px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          backgroundColor: "#f9f9f9",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          overflowX: "auto",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#333",
            fontSize: "48px",
          }}
        >
          Weight Tracker
        </h1>
        <form
          onSubmit={handleAddWeight}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <label
            htmlFor="weight"
            style={{ marginRight: "10px", fontSize: "16px", color: "#555" }}
          >
            Enter Your Weight (kg):{" "}
          </label>
          <input
            type="text"
            id="weight"
            name="weight"
            step="0.1"
            required
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginRight: "10px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "8px 15px",
              borderRadius: "5px",
              backgroundColor: "red",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Add Weight
          </button>
        </form>
        <form
          onSubmit={handleSetGoalWeight}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <label
            htmlFor="goalWeight"
            style={{ marginRight: "10px", fontSize: "16px", color: "#555" }}
          >
            Set Goal Weight (kg):{" "}
          </label>
          <input
            type="text"
            id="goalWeight"
            name="goalWeight"
            step="0.1"
            required
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginRight: "10px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "8px 15px",
              borderRadius: "5px",
              backgroundColor: "blue",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Set Goal
          </button>
        </form>
        {successMessage && (
          <p style={{ textAlign: "center", color: "green" }}>
            {successMessage}
          </p>
        )}

        {goalReached && (
          <p style={{ textAlign: "center", color: "green" }}>
            Congratulations! You reached your goal weight!
          </p>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            overflowX: "auto",
          }}
        >
          <div
            style={{
              width: "90%",
              overflowX: "auto",
              border: "1px solid #ddd",
            }}
          >
            <svg
              viewBox="0 0 700 300"
              style={{ width: "500px", height: "auto" }}
            >
              <line
                x1="50"
                y1="250"
                x2="950"
                y2="250"
                stroke="#ddd"
                strokeWidth="2"
              />
              <line
                x1="50"
                y1="20"
                x2="50"
                y2="250"
                stroke="#ddd"
                strokeWidth="2"
              />
              <polyline
                points={graphPoints
                  .map((point) => `${point.x},${point.y}`)
                  .join(" ")}
                fill="none"
                stroke="red"
                strokeWidth="2"
              />
              {goalWeight && (
                <line
                  x1="50"
                  y1={
                    150 -
                    goalWeight *
                      (120 /
                        Math.max(
                          ...weightData.map((data) => data.weight),
                          goalWeight
                        ))
                  }
                  x2="950"
                  y2={
                    150 -
                    goalWeight *
                      (120 /
                        Math.max(
                          ...weightData.map((data) => data.weight),
                          goalWeight
                        ))
                  }
                  stroke="blue"
                  strokeWidth="2"
                />
              )}
              {graphPoints.map((point, index) => (
                <circle
                  key={index}
                  cx={point.x}
                  cy={point.y}
                  r="3"
                  fill="red"
                />
              ))}
              {months.map((month, index) => (
                <text
                  key={index}
                  x={index * 90 + 50}
                  y="270"
                  fontSize="12"
                  fill="#333"
                  style={{ textAnchor: "middle" }}
                >
                  {month}
                </text>
              ))}
              {yAxisLabels.map((weight, index) => (
                <text
                  key={index}
                  x="40"
                  y={20 + index * 45}
                  fontSize="10"
                  fill="#333"
                  style={{ textAnchor: "end" }}
                >
                  {weight}kg
                </text>
              ))}
            </svg>
          </div>
        </div>
      </div>
      <div
        style={{
          maxHeight: "400px",
          maxWidth: "100%",
          margin: "10px",
          padding: "40px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          backgroundColor: "#f9f9f9",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          overflowX: "auto",
        }}
      >
      <div className="mx-2 p-5 border-[#707070] border-t-2  border-t-[#707070]">
        {workouts.length > 0 ? (
          <>
            <h3 className="text-xl font-semibold mb-4 text-[#03001C] text-center">
              Finished Plans
            </h3>
            {workouts.map((workout) => (
              <div
                key={workout._id}
                className="flex flex-row gap-4 mt-5 justify-between"
              >
                <div className="flex flex-col">
                  <p className="text-[#1f1f1f]">
                    Client Name: {workout.memberId}
                  </p>
                  <p className="text-[#1f1f1f]">
                    Date: {new Date(workout.validDate).toLocaleDateString()}
                  </p>

                  <p className="text-[#1f1f1f]">Plan: {workout.planType}</p>
                  <div className="flex flex-row">
                    <p className="text-[#1f1f1f] mr-2">Plan: </p>
                    <MdOutlinePendingActions className="mt-1" />
                    <p className="text-[#1f1f1f] font-semibold">
                      {workout.plan}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p>You Do not Created a Plan yet!</p>
        )}
      </div>
      <button
        onClick={downloadFinishedPlans}
        style={{
          padding: "8px 15px",
          margin: "25px",
          borderRadius: "5px",
          backgroundColor: "red",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Download Finished Plans
      </button>
    </div>
    </div> 
  );
};

export default PlansProfile;
