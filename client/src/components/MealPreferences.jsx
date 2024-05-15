import React from "react";

const MealPreferences = ({ data, setData }) => {
  return (
    <div className="p-10">
      <label className="block text-md font-medium text-white mb-2">
        Cooking preferences (home-cooked or quick options):
      </label>
      <input
        onChange={(e) => setData({ ...data, mp1: e.target.value })}
        value={data.mp1}
        type="text"
        id="mp1"
        className="block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm"
      />

      <label className="block text-md font-medium text-white mb-2">
        Favorite cuisines or food types:
      </label>
      <input
        onChange={(e) => setData({ ...data, mp2: e.target.value })}
        value={data.mp2}
        type="text"
        id="mp2"
        className="block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm"
      />

      <label className="block text-md font-medium text-white mb-2">
        Time available for meal preparation:
      </label>
      <input
        onChange={(e) => setData({ ...data, mp3: e.target.value })}
        value={data.mp3}
        type="text"
        id="mp3"
        className="block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm"
      />

      <label className="block text-md font-medium text-white mb-2">
        Favorite recipes or go-to meals:
      </label>
      <input
        onChange={(e) => setData({ ...data, mp4: e.target.value })}
        value={data.mp4}
        type="text"
        id="mp4"
        className="block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm"
      />
    </div>
  );
};

export default MealPreferences;
