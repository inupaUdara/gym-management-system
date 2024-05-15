import React from "react";

const MealplanclientInfo = ({ data, setData }) => {
  return (
    <div className="p-10">
      <label className="block text-md font-medium text-white mb-2">Name:</label>
      <input
        onChange={(e) => setData({ ...data, mname: e.target.value })}
        value={data.mname}
        type="text"
        id="mname"
        className="block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm"
      />

      <label className="block text-md font-medium text-white mb-2">Age:</label>
      <input
        onChange={(e) => setData({ ...data, mage: e.target.value })}
        value={data.mage}
        type="text"
        id="mage"
        className="block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm"
      />

      <label className="block text-md font-medium text-white mb-2">
        Gender:
      </label>
      <input
        onChange={(e) => setData({ ...data, mgender: e.target.value })}
        value={data.mgender}
        type="text"
        id="mgender"
        className="block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm"
      />

      <label className="block text-md font-medium text-white mb-2">
        Contact Number:
      </label>
      <input
        onChange={(e) => setData({ ...data, mnumber: e.target.value })}
        value={data.mnumber}
        type="text"
        id="mnumber"
        className="block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm"
      />

      <label className="block text-md font-medium text-white mb-2">
        Email:
      </label>
      <input
        onChange={(e) => setData({ ...data, memail: e.target.value })}
        value={data.memail}
        type="email"
        id="memail"
        className="block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm"
      />
    </div>
  );
};

export default MealplanclientInfo;
