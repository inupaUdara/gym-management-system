import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import gymImg from "../assets/cimg3.jpg";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export default function CoachingBookingsViewPage() {
  const [users, setUsers] = useState([]);
  const [searchDate, setSearchDate] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/books/getAllBooks")
      .then((result) => setUsers(result.data.bookArray[0]))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/api/books/deleteBook/${id}`)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [
        ["Name", "Email", "Number", "Coach Name", "Date", "Time", "Message"],
      ],
      body: users.map((user) => [
        user.name,
        user.email,
        user.age,
        user.cname,
        user.date,
        user.time,
        user.msg,
      ]),
    });
    doc.save("coaching_bookings_report.pdf");
  };

  const filteredUsers = users.filter((user) => {
    return user.date.includes(searchDate); // Search formt set to Year-month-date
  });

  return (
    <div className="flex min-h-screen bg-cover bg-center">
      <div className="container mx-auto py-8 text-white">
        <h1 className="text-3xl font-bold text-center mb-8">
          Your Appointments
        </h1>
        <div className="w-full bg-gray-800 bg-opacity-75 rounded-lg p-6">
          <div className="flex justify-end mb-4">
            <input
              type="text"
              placeholder="Search by Date (YYYY-MM-DD)"
              className="bg-gray-700 text-white px-4 py-2 rounded-md"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-gray-300">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Number</th>
                <th className="px-4 py-2">Coach Name</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Message</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => {
                return (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-600" : "bg-gray-700"}
                  >
                    <td className="border px-4 py-2">{user.name}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">{user.age}</td>
                    <td className="border px-4 py-2">{user.cname}</td>
                    <td className="border px-4 py-2">{user.date}</td>
                    <td className="border px-4 py-2">{user.time}</td>
                    <td className="border px-4 py-2">{user.msg}</td>
                    <td className="border px-6 py-2 flex justify-center items-center">
                      <Link
                        to={`/updateUser/${user._id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                      >
                        Reschedule
                      </Link>
                      <button
                        onClick={(e) => handleDelete(user._id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-2"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={downloadPDF}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Download Report
          </button>
          <p className="ml-2 text-sm text-gray-400">
            Download a report of all your appointments
          </p>
        </div>
      </div>
    </div>
  );
}
