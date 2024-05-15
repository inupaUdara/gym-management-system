import React from "react";

const MealAditional = ({ data, setData }) => {
  return (
    <div className="p-10">
      <label className="block text-md font-medium text-white mb-2">
        Is there anything else you would like to share that you feel is
        important for us to consider when creating your meal plan?
      </label>
      <input
        onChange={(e) => setData({ ...data, maddi: e.target.value })}
        value={data.maddi}
        type="textarea "
        id="maddi"
        className="block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm"
      />
    </div>
  );
};

export default MealAditional;
