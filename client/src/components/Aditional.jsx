import React from "react";

const Aditional = ({ data, setData }) => {
  return (
    <div className="p-10">
      <label className="block text-md font-medium text-white mb-2">
        Is there anything else you would like to share that you feel is
        important for us to know in designing your workout plan?
      </label>
      <input
        onChange={(e) => setData({ ...data, addi: e.target.value })}
        value={data.addi}
        type="textarea "
        id="addi"
        className="block h-14 w-full mb-2 appearance-none rounded-lg border border-gray-300 px-3 py-2 placeholder-gray-500 shadow-sm focus:border-red-900 text-sm"
      />
    </div>
  );
};

export default Aditional;
