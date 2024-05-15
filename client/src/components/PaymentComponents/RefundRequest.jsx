import { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Importing UUID
import axios from "axios";
import { useSelector } from "react-redux";

const RefundForm = () => {
  const [refundReason, setRefundReason] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [refundDescription, setRefundDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const currentUser = useSelector((state) => state.user.currentUser);

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Generate a unique ID for the refund request
    const refundId = `refund-${uuidv4().substr(0, 4)}`;
    // Handle the form submission logic here
    try {
      const response = await axios.post("/api/refunds/addRefunds", {
        refundId,
        refundReason,
        paymentId,
        refundDescription,
        photo: photo ? photo.name : null, // Send the photo file name or null if no photo is selected
        userEmail: currentUser.email,
        status: "Pending",
      });
      console.log("Response:", response.data);
      console.log({
        refundId,
        refundReason,
        paymentId,
        refundDescription,
        photo,
        userEmail: currentUser.email,
        status: "Pending",
      });
      // Handle any success actions (e.g., show a success message)
    } catch (error) {
      console.error("Error:", error.response.data);
      // Handle any error actions (e.g., show an error message)
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{ backgroundColor: "#1F1F1F" }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-[#1F1F1F] p-8 rounded-lg shadow-lg w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Request Refund
        </h2>

        <div className="mb-4">
          <label
            className="block text-gray-300 text-sm font-bold mb-2"
            htmlFor="refundReason"
          >
            Refund Reason
          </label>
          <input
            type="text"
            id="refundReason"
            value={refundReason}
            onChange={(e) => setRefundReason(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A80000] focus:border-transparent bg-[#1F1F1F] text-white border-gray-600"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-300 text-sm font-bold mb-2"
            htmlFor="paymentId"
          >
            Payment ID
          </label>
          <input
            type="text"
            id="paymentId"
            value={paymentId}
            onChange={(e) => setPaymentId(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A80000] focus:border-transparent bg-[#1F1F1F] text-white border-gray-600"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-300 text-sm font-bold mb-2"
            htmlFor="refundDescription"
          >
            Refund Description
          </label>
          <textarea
            id="refundDescription"
            value={refundDescription}
            onChange={(e) => setRefundDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A80000] focus:border-transparent bg-[#1F1F1F] text-white border-gray-600"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-300 text-sm font-bold mb-2"
            htmlFor="photo"
          >
            Choose Photo
          </label>
          <input
            type="file"
            id="photo"
            onChange={handlePhotoChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#A80000] focus:border-transparent bg-[#1F1F1F] text-white border-gray-600"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-[#A80000] hover:bg-[#A80000] text-white font-bold py-2 px-4 rounded-lg shadow-lg"
          >
            Request Refund
          </button>
        </div>
      </form>
    </div>
  );
};

export default RefundForm;
