import {
  HiArrowSmRight,
  HiDocumentText,
  HiUser,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from "react-icons/hi";
import { MdSchedule } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
export default function AdminDashSideBar() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isOpenEmp, setIsOpenEmp] = useState(false);
  const [isOpenReq, setIsOpenReq] = useState(false);
  const toggleDropdownEmp = () => {
    setIsOpenEmp(!isOpenEmp);
  };

  const toggleDropdownReq = () => {
    setIsOpenReq(!isOpenReq);
  };

  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const urlParama = new URLSearchParams(location.search);
    const tabFromUrl = urlParama.get("tab");
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [location.search]);

  

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
           
          >
            <HiUser color="#D4D4D4" />

            <span className="text-[15px] ml-4 text-[#D4D4D4]">Profile</span>
          </div>
        </Link>
        {currentUser.role === "Instructor" && (
          
          <div
            className={`p-2.5 my-2 mx-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#707070] text-white ${
              activeTab === "request" ? "bg-[#707070]" : ""
            }` } onClick={() =>  toggleDropdownReq()}
           
          >
            <MdSchedule color="#D4D4D4" />
            <div className="flex justify-between w-full items-center">
            <span className="text-[15px] ml-4 text-[#D4D4D4]">Requests</span>
            <span className="text-sm rotate-180" id="arrow">
                {isOpenReq ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </span>
            </div>
          </div>
        
        )}
        {isOpenReq && (
          <div
            className="text-left text-sm font-light mt-2 w-4/5 mx-auto text-[#D4D4D4]"
            id="submenu"
          >
            <Link to="/admin-dashboard?tab=instructor-request">
              <h1
                className={`cursor-pointer p-2 hover:bg-[#707070] rounded-md mt-1
              ${activeTab === "instructor-request" ? "bg-[#707070]" : ""}`}
                
              >
                Add Request
              </h1>
            </Link>
            <Link
              to="/admin-dashboard?tab=view-instructors-request"
            >
              <h1 className={`cursor-pointer p-2 hover:bg-[#707070] rounded-md mt-1
              ${activeTab === "view-instructors-request" ? "bg-[#707070]" : ""}`}
                
                >
                Your Requests
              </h1>
            </Link>
            
          </div>
        )}
        {currentUser.role === "Manager" && (
          <Link to="/admin-dashboard?tab=view-request">
          <div
            className={`p-2.5 my-2 mx-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#707070] text-white ${
              activeTab === "view-request" ? "bg-[#707070]" : ""
            }`}
           
          >
            <MdSchedule color="#D4D4D4" />

            <span className="text-[15px] ml-4 text-[#D4D4D4]">View Requests</span>
          </div>
        </Link>
        )}
        

        {currentUser.role === "Admin" && (
          <div
            className={`p-2.5 my-2 mx-2  flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#707070] text-white ${
              activeTab === "emp" ? "bg-[#707070]" : ""
            }`}
            onClick={() =>  toggleDropdownEmp()}
          >
            <HiOutlineUserGroup color="#D4D4D4" />
            <div className="flex justify-between w-full items-center">
              <span className="text-[15px] ml-4 text-[#D4D4D4]">Employees</span>
              <span className="text-sm rotate-180" id="arrow">
              {isOpenEmp ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </span>
            </div>
          </div>
        )}

        {isOpenEmp && (
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
                
              >
                Add Employees
              </h1>
            </Link>
            <Link
              to="/admin-dashboard?tab=admin-instructors"
            >
              <h1 className={`cursor-pointer p-2 hover:bg-[#707070] rounded-md mt-1
              ${activeTab === "admin-instructors" ? "bg-[#707070]" : ""}`}
                
                >
                Instructors
              </h1>
            </Link>
            <Link
              to="/admin-dashboard?tab=admin-managers"
            >
              <h1 className={`cursor-pointer p-2 hover:bg-[#707070] rounded-md mt-1
              ${activeTab === "admin-managers" ? "bg-[#707070]" : ""}`}
                
                >
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
