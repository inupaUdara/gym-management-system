import React from "react";

const FitnessGoals = ({ data, setData }) => {
  return (
    <div className="p-10">
      <label className="block text-md font-medium text-white mb-2">
        What are your primary fitness goals?{" "}
      </label>
      <input
        onChange={(e) => setData({ ...data, f1: e.target.value })}
        value={data.f1}
        type="text"
        id="f1"
        className="block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm"
      />

      <label className="block text-md font-medium text-white mb-2">
        Are there any specific areas of your body you would like to focus on?
      </label>
      <input
        onChange={(e) => setData({ ...data, f2: e.target.value })}
        value={data.f2}
        type="text"
        id="f2"
        className="block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm"
      />

      <label className="block text-md font-medium text-white mb-2">
        What is your current level of physical activity?{" "}
      </label>
      <input
        onChange={(e) => setData({ ...data, f3: e.target.value })}
        value={data.f3}
        type="text"
        id="f3"
        className="block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm"
      />

      <label className="block text-md font-medium text-white mb-2">
        How much time can you dedicate to each workout session?
      </label>
      <input
        onChange={(e) => setData({ ...data, f4: e.target.value })}
        value={data.f4}
        type="text"
        id="f4"
        className="block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm"
      />

      <label className="block text-md font-medium text-white mb-2">
        Have you previously followed a workout program?
      </label>
      <input
        onChange={(e) => setData({ ...data, f5: e.target.value })}
        value={data.f5}
        type="text"
        id="f5"
        className="block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm"
      />
    </div>
  );
};

export default FitnessGoals;
