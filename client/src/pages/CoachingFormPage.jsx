import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import gymImg from "../assets/cimg2.jpg";

export default function CoachingFormPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [cname, setCName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/books/bookAdd", {
        name,
        email,
        age,
        cname,
        date,
        time,
        msg,
      })
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  // Get current date in the format "YYYY-MM-DD"
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <Header />
      <div
        className="flex justify-center items-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${gymImg})` }}
      >
        <div className="bg-black bg-opacity-80 max-w-md mx-auto p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-center text-white">
            Book an Appointment
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-white">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="flex mb-4">
              <div className="w-1/2 mr-2">
                <label htmlFor="contactNumber" className="block text-white">
                  Contact Number
                </label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="w-1/2 ml-2">
                <label htmlFor="coachName" className="block text-white">
                  Coach Name
                </label>
                <select
                  id="coachName"
                  name="coachName"
                  value={cname}
                  onChange={(e) => setCName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="">Select Coach</option>
                  <option value="Coach 1">Coach 1</option>
                  <option value="Coach 2">Coach 2</option>
                  <option value="Coach 3">Coach 3</option>
                  <option value="Coach 4">Coach 4</option>
                  <option value="Coach 5">Coach 5</option>
                </select>
              </div>
            </div>
            <div className="flex mb-4">
              <div className="w-1/2 mr-2">
                <label htmlFor="date" className="block text-white">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={date}
                  min={getCurrentDate()} // Set minimum date to current date
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="w-1/2 ml-2">
                <label htmlFor="timeSlot" className="block text-white">
                  Time Slot
                </label>
                <select
                  id="timeSlot"
                  name="timeSlot"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="">Select Time Slot</option>
                  <option value="18:00">6:00 PM</option>
                  <option value="18:30">6:30 PM</option>
                  <option value="19:00">7:00 PM</option>
                  <option value="19:30">7:30 PM</option>
                  <option value="20:00">8:00 PM</option>
                  <option value="20:30">8:30 PM</option>
                  <option value="21:00">9:00 PM</option>
                  <option value="21:30">9:30 PM</option>
                  <option value="22:00">10:00 PM</option>
                  <option value="22:30">10:30 PM</option>
                  <option value="23:00">11:00 PM</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="specialMessage" className="block text-white">
                Special Messages
              </label>
              <textarea
                id="specialMessage"
                name="specialMessage"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
