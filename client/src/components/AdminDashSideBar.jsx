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
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
export default function AdminDashSideBar() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const [activeTab, setActiveTab] = useState("profile");

  const handleSignout = async () => {
    try {
      const res = await fetch("api/employee/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full w-full md:w-56 drop-shadow-2xl border-b-white">
      <div className="flex-col h-full overflow-x-hidden overflow-y-auto text-center bg-[#1f1f1f]">
        <Link to="/admin-dashboard?tab=profile">
          <div
            className={`p-2.5 my-2 mx-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#707070] text-white ${
              activeTab === "profile" ? "bg-[#707070]" : ""
            }`}
            onClick={() => handleTabClick("profile")}
          >
            <HiUser color="#D4D4D4" />

            <span className="text-[15px] ml-4 text-[#D4D4D4]">Profile</span>
          </div>
        </Link>

        {currentUser.isAdmin && (
          <div
            className={`p-2.5 my-2 mx-2  flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#707070] text-white ${
              activeTab === "emp" ? "bg-[#707070]" : ""
            }`}
            onClick={() => handleTabClick("emp") || toggleDropdown()}
          >
            <HiOutlineUserGroup color="#D4D4D4" />
            <div className="flex justify-between w-full items-center">
              <span className="text-[15px] ml-4 text-[#D4D4D4]">Employees</span>
              <span className="text-sm rotate-180" id="arrow">
                <IoIosArrowDown />
              </span>
            </div>
          </div>
        )}

        {isOpen && (
          <div
            className="text-left text-sm font-light mt-2 w-4/5 mx-auto text-[#D4D4D4]"
            id="submenu"
          >
            <Link
              to="/admin-dashboard?tab=addemployee"
            >
              <h1
                className={`cursor-pointer p-2 hover:bg-[#707070] rounded-md mt-1
              ${activeTab === "addemployee" ? "bg-[#707070]" : ""}`}
                onClick={() => handleTabClick("addemployee")}
              >
                Add Employees
              </h1>
            </Link>
            <Link
              to="/admin-dashboard?tab=admin-instructors"
            >
              <h1 className={`cursor-pointer p-2 hover:bg-[#707070] rounded-md mt-1
              ${activeTab === "admin-instructors" ? "bg-[#707070]" : ""}`}
                onClick={() => handleTabClick("admin-instructors")}>
                Instructors
              </h1>
            </Link>
            <Link
              to="/admin-dashboard?tab=admin-managers"
            >
              <h1 className={`cursor-pointer p-2 hover:bg-[#707070] rounded-md mt-1
              ${activeTab === "admin-managers" ? "bg-[#707070]" : ""}`}
                onClick={() => handleTabClick("admin-managers")}>
                Managers
              </h1>
            </Link>
          </div>
        )}

        <div
          className="p-2.5 my-2 mx-2  flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#707070] text-white"
          onClick={handleSignout}
        >
          <HiArrowSmRight color="#D4D4D4" />
          <span className="text-[15px] ml-4 text-gray-200">Sign Out</span>
        </div>
      </div>
    </div>
  );
}
