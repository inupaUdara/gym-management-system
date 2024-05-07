

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
                <div className="flex justify-center mb-8">
                    {/* Health quotes */}
                    {/* <div className="flex space-x-4">
                        <div className="border border-gray-300 rounded-md p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                            <p className="text-center">"Take care of your body. It's the only place you have to live."</p>
                        </div>
                        <div className="border border-gray-300 rounded-md p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                            <p className="text-center">"The groundwork for all happiness is good health."</p>
                        </div>
                        <div className="border border-gray-300 rounded-md p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                            <p className="text-center">"Your health is an investment, not an expense."</p>
                        </div>
                        <div className="border border-gray-300 rounded-md p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                            <p className="text-center">"Health is the greatest possession. Contentment is the greatest treasure."</p>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
    
}

// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import Header from '../components/Header';
// import gymImg from '../assets/cimg.jpg';

// export default function Coaching() {
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

//     return (
//         <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${gymImg})` }}>
//             <Header />
//             <div className="container mx-auto py-8 text-white">
//                 <h1 className="text-3xl font-bold text-center mb-8">Welcome to CJ GYM</h1>
//                 <div className="flex justify-center space-x-4 mb-8">
//                     <Link to="/scheduleSession" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Book an Appointment</Link>
//                     <Link to="/viewSessions" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">View Appointments</Link>
//                 </div>
//                 <div className="flex justify-center mb-8">
//                     <input type="text" className="border border-gray-300 rounded-md px-4 py-2 mr-2 focus:outline-none focus:border-blue-500" placeholder="Search Coaches" />
//                     <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">Search</button>
//                 </div>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                     {users.map((user, index) => (
//                         <div key={index} className="bg-gray-800 p-4 rounded-lg">
//                             <img src={user.imageUrl} alt={user.name} className="rounded-md mb-2" />
//                             <p className="text-center text-sm">{user.name}</p>
//                         </div>
                        
//                     ))}
//                 </div>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                     {users.map((user, index) => (
//                         <div key={index} className="bg-gray-800 p-4 rounded-lg">
//                             <img src={user.imageUrl} alt={user.name} className="rounded-md mb-2" />
//                             <p className="text-center text-sm">{user.name}</p>
//                         </div>
                        
//                     ))}
//                 </div>

//             </div>
//             <div className="flex h-screen bg-primary justify-center items-center">
//                 {/* Additional content can be added here */}
//             </div>
//         </div>
//     );
// }

