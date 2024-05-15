import React from "react";

const ClientInfo = ({ data, setData }) => {
  return (
    <div className="p-10">
      <label className="block text-md font-medium text-white mb-2">Name:</label>
      <input
        onChange={(e) => setData({ ...data, name: e.target.value })}
        value={data.name}
        type="text"
        id="name"
        className="block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm"
      />

      <label className="block text-md font-medium text-white mb-2">Age:</label>
      <input
        onChange={(e) => setData({ ...data, age: e.target.value })}
        value={data.age}
        type="text"
        id="age"
        className="block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm"
      />

      <label className="block text-md font-medium text-white mb-2">
        Gender:
      </label>
      <input
        onChange={(e) => setData({ ...data, gender: e.target.value })}
        value={data.gender}
        type="text"
        id="gender"
        className="block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm"
      />

      <label className="block text-md font-medium text-white mb-2">
        Contact Number:
      </label>
      <input
        onChange={(e) => setData({ ...data, number: e.target.value })}
        value={data.number}
        type="text"
        id="number"
        className="block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm"
      />

      <label className="block text-md font-medium text-white mb-2">
        Email:
      </label>
      <input
        onChange={(e) => setData({ ...data, email: e.target.value })}
        value={data.email}
        type="email"
        id="email"
        className="block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm"
      />
    </div>
  );
};

export default ClientInfo;
