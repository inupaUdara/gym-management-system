

// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import Header from '../components/Header';
// import Home from './Home';
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';
// import gymImg from '../assets/cimg3.jpg';

// export default function CoachingBookingsVIewPage() {
//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//         axios.get('http://localhost:3001')
//             .then(result => setUsers(result.data))
//             .catch(err => console.log(err));
//     }, []);

//     const handleDelete = (id) => {
//         axios.delete(`http://localhost:3001/deleteUser/${id}`)
//             .then(res => {
//                 console.log(res);
//                 window.location.reload();
//             })
//             .catch(err => console.log(err));
//     };

//     const downloadPDF = () => {
//         const doc = new jsPDF();
//         doc.autoTable({
//             head: [['Name', 'Email', 'Number', 'Coach Name', 'Date', 'Time', 'Message']],
//             body: users.map(user => [user.name, user.email, user.age, user.cname, user.date, user.time, user.msg]),
//         });
//         doc.save('coaching_bookings_report.pdf');
//     };

//     return (
//         <div style={{ backgroundImage: `url(${gymImg})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh'}}>
//             <Header />
            
//             <div className="flex h-screen bg-primary justify-center items-center">
//                 <div className='w-1/2 bg-white rounded-lg p-3'>
//                     <Link to="/scheduleSession" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Add+</Link>
//                     <table className='table-auto w-full'>
//                         <thead>
//                             <tr className="bg-gray-200">
//                                 <th className="px-4 py-2">Name</th>
//                                 <th className="px-4 py-2">Email</th>
//                                 <th className="px-4 py-2">Number</th>
//                                 <th className="px-4 py-2">Coach Name</th>
//                                 <th className="px-4 py-2">Date</th>
//                                 <th className="px-4 py-2">Time</th>
//                                 <th className="px-4 py-2">Message</th>
//                                 <th className="px-4 py-2">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {users.map((user) => (
//                                 <tr key={user._id}>
//                                     <td className="border px-4 py-2">{user.name}</td>
//                                     <td className="border px-4 py-2">{user.email}</td>
//                                     <td className="border px-4 py-2">{user.age}</td>
//                                     <td className="border px-4 py-2">{user.cname}</td>
//                                     <td className="border px-4 py-2">{user.date}</td>
//                                     <td className="border px-4 py-2">{user.time}</td>
//                                     <td className="border px-4 py-2">{user.msg}</td>
//                                     <td className="border px-4 py-2 flex justify-center items-center">
//                                         <Link to={`/updateUser/${user._id}`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Update</Link>
//                                         <button onClick={(e) => handleDelete(user._id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-2">Delete</button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//             <div className="flex justify-center mt-4">
//                 <button onClick={downloadPDF} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Download PDF</button>
//             </div>
//         </div>
//     );
// }
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import gymImg from '../assets/cimg3.jpg';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export default function CoachingBookingsViewPage() {
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
        <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${gymImg})` }}>
            <Header />
            <div className="container mx-auto py-8 text-white">
                <div className="flex justify-center mt-4">
                    <Link to="/scheduleSession" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Add Appointment</Link>
                </div>
                <h1 className="text-3xl font-bold text-center mb-8">Your Appointments</h1>
                <div className="w-full bg-gray-200 bg-opacity-75 rounded-lg p-6">
                    <table className="w-full table-fixed">
                        <thead>
                            <tr className="text-gray-800">
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
                                <tr key={user._id} className="text-gray-800">
                                    <td className="border px-4 py-2">{user.name}</td>
                                    <td className="border px-4 py-2">{user.email}</td>
                                    <td className="border px-4 py-2">{user.age}</td>
                                    <td className="border px-4 py-2">{user.cname}</td>
                                    <td className="border px-4 py-2">{user.date}</td>
                                    <td className="border px-4 py-2">{user.time}</td>
                                    <td className="border px-4 py-2">{user.msg}</td>
                                    <td className="border px-4 py-2 flex justify-center items-center">
                                        <Link to={`/updateUser/${user._id}`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Update</Link>
                                        <button onClick={(e) => handleDelete(user._id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-2">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center items-center mt-4">
                    <button onClick={downloadPDF} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Download Report</button>
                    <p className="ml-2 text-sm text-gray-400">Download a report of all your appointments</p>
                </div>
            </div>
        </div>
    );
}
