

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Home from './Home';
import gymImg from '../assets/cimg.jpg';

export default function Coaching() {
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

    return (
        <div style={{ backgroundImage: `url(${gymImg})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
            <Header />
            <div className="container mx-auto py-8 text-white">
                <h1 className="text-3xl font-bold text-center mb-8">Welcome to CJ GYM</h1>
                <div className="flex justify-center space-x-4 mb-8">
                    <Link to="/scheduleSession" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Book an Appointment</Link>
                    <Link to="/viewSessions" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">View Appointments</Link>
                </div>
                <div className="flex justify-center mb-8">
                    <input type="text" className="border border-gray-300 rounded-md px-4 py-2 mr-2 focus:outline-none focus:border-blue-500" placeholder="Search Coaches" />
                    <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">Search</button>
                </div>
                {/* Additional content can be added here */}
            </div>
            <div className="flex h-screen bg-primary justify-center items-center">
                <div className='w-1/2 bg-white rounded-lg p-3'>
                    
                </div>
            </div>
        </div>
    );
}

