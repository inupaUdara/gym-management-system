import React from "react";

const HealthInfo = ({ data, setData }) => {
  return (
    <div className="p-10">
      <label className="block text-md font-medium text-white mb-2">
        Do you have any existing medical conditions?{" "}
      </label>
      <input
        onChange={(e) => setData({ ...data, h1: e.target.value })}
        value={data.h1}
        type="text"
        id="h1"
        className="block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm"
      />

      <label className="block text-md font-medium text-white mb-2">
        Are you currently taking any medications?
      </label>
      <input
        onChange={(e) => setData({ ...data, h2: e.target.value })}
        value={data.h2}
        type="text"
        id="h2"
        className="block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm"
      />

      <label className="block text-md font-medium text-white mb-2">
        Have you ever had any surgeries or serious injuries?
      </label>
      <input
        onChange={(e) => setData({ ...data, h3: e.target.value })}
        value={data.h3}
        type="text"
        id="h3"
        className="block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm"
      />

      <label className="block text-md font-medium text-white mb-2">
        Do you have any allergies (food, medication,environmental, etc.)?{" "}
      </label>
      <input
        onChange={(e) => setData({ ...data, h4: e.target.value })}
        value={data.h4}
        type="text"
        id="h4"
        className="block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm"
      />

      <label className="block text-md font-medium text-white mb-2">
        Are you pregnant or planning to become pregnant in the near future? (For
        female clients)
      </label>
      <input
        onChange={(e) => setData({ ...data, h5: e.target.value })}
        value={data.h5}
        type="text"
        id="h5"
        className="block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm"
      />
    </div>
  );
};

export default HealthInfo;
