import React from "react";

const NutritionalGoals = ({ data, setData }) => {
  return (
    <div className="p-10">
      <label className="block text-md font-medium text-white mb-2">
        How would you describe your stress level on a daily basis?
      </label>
      <input
        onChange={(e) => setData({ ...data, mn1: e.target.value })}
        value={data.mn1}
        type="text"
        id="mn1"
        className="block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm"
      />

      <label className="block text-md font-medium text-white mb-2">
        How many hours of sleep do you typically get per night?
      </label>
      <input
        onChange={(e) => setData({ ...data, mn2: e.target.value })}
        value={data.mn2}
        type="text"
        id="mn2"
        className="block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm"
      />

      <label className="block text-md font-medium text-white mb-2">
        Do you smoke? If yes, how many cigarettes per day?
      </label>
      <input
        onChange={(e) => setData({ ...data, mn3: e.target.value })}
        value={data.mn3}
        type="text"
        id="mn3"
        className="block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm"
      />

      <label className="block text-md font-medium text-white mb-2">
        How would you describe your overall energy levels throughout the day?
      </label>
      <input
        onChange={(e) => setData({ ...data, mn4: e.target.value })}
        value={data.mn4}
        type="text"
        id="mn4"
        className="block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm"
      />
    </div>
  );
};

export default NutritionalGoals;
