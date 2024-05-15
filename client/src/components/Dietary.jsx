import React from "react";

const Dietary = ({ data, setData }) => {
  return (
    <div className="p-10">
      <label className="block text-md font-medium text-white mb-2">
        Any dietary restrictions or allergies?
      </label>
      <input
        onChange={(e) => setData({ ...data, md1: e.target.value })}
        value={data.md1}
        type="text"
        id="md1"
        className="block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm"
      />

      <label className="block text-md font-medium text-white mb-2">
        Specific diet plan or lifestyle ?
      </label>
      <input
        onChange={(e) => setData({ ...data, md2: e.target.value })}
        value={data.md1}
        type="text"
        id="md2"
        className="block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm"
      />

      <label className="block text-md font-medium text-white mb-2">
        Disliked foods or food preferences?
      </label>
      <input
        onChange={(e) => setData({ ...data, md3: e.target.value })}
        value={data.md1}
        type="text"
        id="md3"
        className="block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm"
      />
    </div>
  );
};

export default Dietary;
