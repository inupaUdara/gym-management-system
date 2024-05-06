import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

export default function CoachingUpdate() {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [cname, setCName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/getUser/${id}`)
            .then(result => {
                const userData = result.data;
                setName(userData.name);
                setEmail(userData.email);
                setAge(userData.age);
                setCName(userData.cname);
                setDate(userData.date);
                setTime(userData.time);
                setMsg(userData.msg);
            })
            .catch(err => console.log(err));
    }, [id]);

    const updateAppointment = (e) => {
        e.preventDefault();
        const updatedUser = { name, email, age, cname, date, time, msg };
        axios.put(`http://localhost:3001/updateUser/${id}`, updatedUser)
            .then(result => {
                console.log(result);
                navigate('/');
            })
            .catch(err => console.log(err));
    };

    return (
        
            
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Reschedule</h2>
            <form onSubmit={updateAppointment}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
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
                {/* Other input fields */}
                <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
            </form>
        
        </div>
    );
}
