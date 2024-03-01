import {
  HiArrowSmRight,
  HiDocumentText,
  HiUser,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from "react-icons/hi";
import { BsAppIndicator } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { useState } from "react";
export default function AdminDashSideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="h-full w-full md:w-56 drop-shadow-2xl border-b-white">
      <div className="flex-grow h-full overflow-x-hidden overflow-y-auto text-center bg-[#03001C]">
        <div className="text-[#5B8FB9] text-xl">
          <div className="p-2.5 mt-1 flex items-center">
            <BsAppIndicator className="py-1 px-1 bg-[#301E67] rounded-md h-6 w-6" />
            <h1 className="font-bold text-[#5B8FB9] text-[15px] ml-3">
              CJ Gym
            </h1>
          </div>
          <hr className="w-auto h-0.5 mx-auto my-4 bg-[#301E67] border-0" />
        </div>

        <div className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#301E67] text-white">
          <HiUser color="#5B8FB9" />
          <span className="text-[15px] ml-4 text-gray-200">Profile</span>
        </div>

        <div
          className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#301E67] text-white"
          onClick={toggleDropdown}
        >
          <HiOutlineUserGroup color="#5B8FB9" />
          <div className="flex justify-between w-full items-center">
            <span className="text-[15px] ml-4 text-gray-200">Employees</span>
            <span className="text-sm rotate-180" id="arrow">
              <IoIosArrowDown />
            </span>
          </div>
        </div>

        {isOpen && (
          <div
            className="text-left text-sm font-extralight mt-2 w-4/5 mx-auto text-gray-200"
            id="submenu"
          >
            <Link to="/admin-dashboard?tab=addemployee" className="active:{tab==='addemployee'}">
              <h1 className="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1">
                Add Employees
              </h1>
            </Link>
            <h1 className="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1">
              Instructors
            </h1>
            <h1 className="cursor-pointer p-2 hover:bg-gray-700 rounded-md mt-1">
              Managers
            </h1>
          </div>
        )}

        <div className="p-2.5 mt-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#301E67] text-white">
          <HiArrowSmRight color="#5B8FB9" />
          <span className="text-[15px] ml-4 text-gray-200">Sign Out</span>
        </div>
      </div>
    </div>
  );
}
