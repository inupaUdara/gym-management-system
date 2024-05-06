

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Home from './Home';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export default function CoachingBookingsVIewPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001')
            .then(result => setUsers(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/deleteUser/${id}`)
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err => console.log(err));
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['Name', 'Email', 'Number', 'Coach Name', 'Date', 'Time', 'Message']],
            body: users.map(user => [user.name, user.email, user.age, user.cname, user.date, user.time, user.msg]),
        });
        doc.save('coaching_bookings_report.pdf');
    };

    return (
        <div>
            <Header />
            
            <div className="flex h-screen bg-primary justify-center items-center">
                <div className='w-1/2 bg-white rounded-lg p-3'>
                    <Link to="/scheduleSession" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Add+</Link>
                    <table className='table-auto w-full'>
                        <thead>
                            <tr className="bg-gray-200">
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
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td className="border px-4 py-2">{user.name}</td>
                                    <td className="border px-4 py-2">{user.email}</td>
                                    <td className="border px-4 py-2">{user.age}</td>
                                    <td className="border px-4 py-2">{user.cname}</td>
                                    <td className="border px-4 py-2">{user.date}</td>
                                    <td className="border px-4 py-2">{user.time}</td>
                                    <td className="border px-4 py-2">{user.msg}</td>
                                    <td className="border px-4 py-2 flex justify-center items-center">
                                        <Link to={`/update/${user._id}`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Update</Link>
                                        <button onClick={(e) => handleDelete(user._id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-2">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <button onClick={downloadPDF} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Download PDF</button>
            </div>
        </div>
    );
}
