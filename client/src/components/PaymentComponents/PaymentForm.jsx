"use client";
import PaymentReview from "./PaymentReview";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function PayForm() {
  const [formData, setFormData] = useState({
    paymentId: "",
    email: "",
    phone: "",
    country: "",
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    addressCont: "",
    city: "",
    postalCode: "",
    agreeTerms: false,
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const generatePaymentId = () => {
    const randomNumber = Math.floor(Math.random() * 900) + 100; // Generate a random 3-digit number
    return `PAY${randomNumber}`;
  };

  const handleChange = (event) => {
    const { id, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const paymentId = generatePaymentId();
    console.log("Generated Payment ID:", paymentId);
    setFormData((prevData) => ({
      ...prevData,
      paymentId,
    }));
    console.log(formData);
    console.log("Form Data after setting paymentId:", formData);
    navigate("/Checkout/payment/shipping", { state: formData });
  };
  return (
    <div className="flex flex-col md:flex-row justify-between px-10 py-4 bg-[#1F1F1F]">
      <div className="w-full md:w-1/2 px-20 py-4 rounded-lg shadow-md ">
        <form onSubmit={handleSubmit}>
          <p className="text-md font-semibold text-white my-2">Contact</p>
          <div className="mb-6">
            <input
              type="email"
              id="email"
              className="bg-[#1F1F1F] border border-white text-white text-sm rounded-lg focus:ring-[#A80000] focus:border-[#A80000] block w-full p-2.5 dark:bg-[#1F1F1F] dark:border-[#A80000] dark:placeholder-[#1F1F1F] dark:text-white dark:focus:ring-[#A80000] dark:focus:border-[#A80000]"
              placeholder="Email"
              required="/^\S+@\S+\.\S+$/"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="tel"
              id="phone"
              className="bg-[#1F1F1F] border border-white text-white text-sm rounded-lg focus:ring-[#A80000] focus:border-[#A80000] block w-full p-2.5 dark:bg-[#1F1F1F] dark:border-[#A80000] dark:placeholder-white dark:text-white dark:focus:ring-[#A80000] dark:focus:border-[#A80000]"
              placeholder="Phone Number"
              pattern="[0-9]{10}"
              required
              onChange={handleChange}
            />
          </div>
          <p className="text-md font-semibold text-white my-2">
            Shipping address
          </p>
          <div className="mb-6 relative">
            <select
              id="country"
              className="bg-[#1F1F1F] text-white peer p-4 pe-9 block w-full border-[#A80000] rounded-lg text-sm focus:border-[#A80000] focus:ring-[#A80000] disabled:opacity-50 disabled:pointer-events-none dark:bg-[#1F1F1F] dark:border-[#A80000] dark:text-white dark:focus:ring-[#A80000]
  focus:pt-6
  focus:pb-2
  [&:not(:placeholder-shown)]:pt-6
  [&:not(:placeholder-shown)]:pb-2
  autofill:pt-6
  autofill:pb-2"
              defaultValue={"DEFAULT"}
              onChange={handleChange}
            >
              <option value="DEFAULT" disabled>
                Choose a Country
              </option>
              <option value="SL">Sri Lanka</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
            <label
              className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
    peer-focus:text-xs
    peer-focus:-translate-y-1.5
    peer-focus:text-white
    peer-[:not(:placeholder-shown)]:text-xs
    peer-[:not(:placeholder-shown)]:-translate-y-1.5
    peer-[:not(:placeholder-shown)]:text-white"
            >
              Country/Region
            </label>
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <input
                type="text"
                id="firstName"
                className="bg-[#1F1F1F] border border-white text-white text-sm rounded-lg focus:ring-[#A80000] focus:border-[#A80000] block w-full p-2.5 dark:bg-[#1F1F1F] dark:border-[#A80000] dark:placeholder-white dark:text-white dark:focus:ring-[#A80000] dark:focus:border-[#A80000]"
                placeholder="First Name"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="text"
                id="lastName"
                className="bg-[#1F1F1F] border border-white text-white text-sm rounded-lg focus:ring-[#A80000] focus:border-[#A80000] block w-full p-2.5 dark:bg-[#1F1F1F] dark:border-[#A80000] dark:placeholder-white dark:text-white dark:focus:ring-[#A80000] dark:focus:border-[#A80000]"
                placeholder="Last Name"
                required
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-6">
            <input
              type="text"
              id="company"
              className="bg-[#1F1F1F] border border-white text-white text-sm rounded-lg focus:ring-[#A80000] focus:border-[#A80000] block w-full p-2.5 dark:bg-[#1F1F1F] dark:border-[#A80000] dark:placeholder-white dark:text-white dark:focus:ring-[#A80000] dark:focus:border-[#A80000]"
              placeholder="Company (optional)"
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <input
              type="test"
              id="address"
              className="bg-[#1F1F1F] border border-white text-white text-sm rounded-lg focus:ring-[#A80000] focus:border-[#A80000] block w-full p-2.5 dark:bg-[#1F1F1F] dark:border-[#A80000] dark:placeholder-white dark:text-white dark:focus:ring-[#A80000] dark:focus:border-[#A80000]"
              placeholder="Address"
              required
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              id="addressCont"
              className="bg-[#1F1F1F] border border-white text-white text-sm rounded-lg focus:ring-[#A80000] focus:border-[#A80000] block w-full p-2.5 dark:bg-[#1F1F1F] dark:border-[#A80000] dark:placeholder-white dark:text-white dark:focus:ring-[#A80000] dark:focus:border-[#A80000]"
              placeholder="Apartment,suite,etc. (optional)"
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <input
                type="text"
                id="city"
                className="bg-[#1F1F1F] border border-white text-white text-sm rounded-lg focus:ring-[#A80000] focus:border-[#A80000] block w-full p-2.5 dark:bg-[#1F1F1F] dark:border-[#A80000] dark:placeholder-white dark:text-white dark:focus:ring-[#A80000] dark:focus:border-[#A80000]"
                placeholder="City"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                type="text"
                id="postalCode"
                className="bg-[#1F1F1F] border border-white text-white text-sm rounded-lg focus:ring-[#A80000] focus:border-[#A80000] block w-full p-2.5 dark:bg-[#1F1F1F] dark:border-[#A80000] dark:placeholder-white dark:text-white dark:focus:ring-[#A80000] dark:focus:border-[#A80000]"
                placeholder="Postal Code"
                required
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-[#A80000] rounded bg-[#A80000] focus:ring-3 focus:ring-[#A80000] dark:bg-[#A80000] dark:border-[#A80000] dark:focus:ring-[#A80000] dark:ring-offset-[#A80000]"
                required
              />
            </div>
            <label
              htmlFor="remember"
              className="ms-2 text-sm font-medium text-white"
              onChange={handleChange}
            >
              I agree with the{" "}
              <a href="#" className="text-[#A80000] hover:underline ">
                terms and conditions
              </a>
              .
            </label>
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="text-white bg-[#A80000] hover:bg-[#A80000] focus:ring-4 focus:ring-[#A80000] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Continue to Shipping
          </button>
        </form>
      </div>
      <div className="w-full md:w-1/2 px-4 py-4">
        {/* PaymentReview Component */}
        <PaymentReview />
      </div>
    </div>
  );
}
