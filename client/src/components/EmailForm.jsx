import { Alert } from "flowbite-react";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import Header from "./Header";
import AdminDashSideBar from "./AdminDashSideBar";

export default function EmailForm() {
  const { requestId } = useParams(); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '', // Renamed from serviceType to title
    message: '', // Renamed from serviceDescription to message
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`/api/serviceRequest/getRequestIns/${requestId}`);
        if (res.status !== 200) {
          throw new Error("Failed to fetch details");
        }
        const { serviceType, serviceDescription } = res.data; // Destructure serviceType and serviceDescription from fetched data
        setFormData({
          ...formData, // Keep the existing form data
          title: serviceType || '', // Set title to serviceType, fallback to empty string if undefined
          message: serviceDescription || '', // Set message to serviceDescription, fallback to empty string if undefined
        });
      } catch (error) {
        setError(error.message);
      }
    };

    fetchDetails();
  }, [requestId]); // Add requestId to the dependency array

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/api/email/send-email', formData);
      alert('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email');
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col md:flex-row bg-[#d4d4d4]">
        <div className="md:w-56">
          <AdminDashSideBar />
        </div>
        <div className="flex-grow w-full min-h-[60vh] bg-[#d4d4d4] p-10 md:p-20 justify-center">
          <div className="max-w-[600px] mx-auto rounded-md p-10 bg-white shadow-lg">
            <div className="flex flex-col mb-2">
              <h3 className="text-2xl font-semibold mb-4 text-[#03001C] text-center">
                Contact Service Center
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-[#1f1f1f] mt-3">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-md w-full"
                  placeholder="Your Name"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="text-[#1f1f1f] mt-3">
                  Service Centre Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-md w-full"
                  placeholder="Email"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="title" className="text-[#1f1f1f] mt-3">
                  Subject
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title} // Display serviceType in the title input field
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-md w-full"
                  placeholder="Subject"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="message" className="text-[#1f1f1f] mt-3">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message} // Display serviceDescription in the message input field
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-md w-full"
                  placeholder="Message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="block mx-auto bg-[#A80000] text-white px-4 py-2 rounded-md hover:bg-[#4c0000]"
              >
                Send Email
              </button>
            </form>
            {error && <Alert color="failure">{error}</Alert>}
          </div>
        </div>
      </div>
    </>
  );
};
