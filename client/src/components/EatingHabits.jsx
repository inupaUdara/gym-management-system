import React from "react";

const EatingHabits = ({ data, setData }) => {
  return (
    <div className="p-10">
      <label className="block text-md font-medium text-white mb-2">
        Number of meals per day:
      </label>
      <input
        onChange={(e) => setData({ ...data, me1: e.target.value })}
        value={data.me1}
        type="text"
        id="me1"
        className="block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm"
      />

      <label className="block text-md font-medium text-white mb-2">
        Eating schedule (regular or irregular):
      </label>
      <input
        onChange={(e) => setData({ ...data, me2: e.target.value })}
        value={data.me2}
        type="text"
        id="me2"
        className="block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm"
      />

      <label className="block text-md font-medium text-white mb-2">
        Frequency of eating out or ordering takeout:
      </label>
      <input
        onChange={(e) => setData({ ...data, me3: e.target.value })}
        value={data.me3}
        type="text"
        id="me3"
        className="block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm"
      />

      <label className="block text-md font-medium text-white mb-2">
        Consumption of processed foods:
      </label>
      <input
        onChange={(e) => setData({ ...data, me4: e.target.value })}
        value={data.me4}
        type="text"
        id="me4"
        className="block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm"
      />

      <label className="block text-md font-medium text-white mb-2">
        Servings of fruits and vegetables per day:
      </label>
      <input
        onChange={(e) => setData({ ...data, me5: e.target.value })}
        value={data.me5}
        type="text"
        id="me5"
        className="block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm"
      />
    </div>
  );
};

export default EatingHabits;
