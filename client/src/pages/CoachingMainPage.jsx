import Header from "../components/Header";

export default function CoachingMainPage() {
  return (
    <div>
      <Header />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Welcome to Our Gym
        </h1>
        <div className="flex justify-center space-x-4 mb-8">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Book an Appointment
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            View Appointments
          </button>
        </div>
        <div className="flex justify-center mb-8">
          <input
            type="text"
            className="border border-gray-300 rounded-md px-4 py-2 mr-2 focus:outline-none focus:border-blue-500"
            placeholder="Search Coaches"
          />
          <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
            Search
          </button>
        </div>
        {/* Additional content can be added here */}
      </div>
    </div>
  );
}
