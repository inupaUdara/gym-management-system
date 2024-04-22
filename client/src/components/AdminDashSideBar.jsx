import {
  HiArrowSmRight,
  HiDocumentText,
  HiUser,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from "react-icons/hi";
<<<<<<< HEAD
import { MdSchedule, MdOutlineScheduleSend } from "react-icons/md";
=======
import { MdSchedule, MdOutlineScheduleSend, MdDashboard   } from "react-icons/md";
>>>>>>> b666f5d3068be821fa416e47f1099d7767f2c7f6
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



  // const handleSignout = async () => {
  //   try {
  //     const res = await fetch("api/employee/signout", {
  //       method: "POST",
  //     });
  //     const data = await res.json();
  //     if (!res.ok) {
  //       console.log(data.message);
  //     } else {
  //       dispatch(signoutSuccess());
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="w-full h-full md:w-56 drop-shadow-2xl border-b-white">
      <div className="flex-col h-full overflow-x-hidden overflow-y-auto text-center bg-[#1f1f1f]">
        {currentUser.role && (
          <Link to="/admin-dashboard?tab=profile">
            <div
              className={`p-2.5 my-2 mx-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#707070] text-white ${activeTab === "profile" ? "bg-[#707070]" : ""
                }`}

            >
              <HiUser color="#D4D4D4" />

              <span className="text-[15px] ml-4 text-[#D4D4D4]">Profile</span>
            </div>
          </Link>
        )}
        {!currentUser.role && (
          <Link to="/admin-dashboard?tab=member-profile">
            <div
              className={`p-2.5 my-2 mx-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#707070] text-white ${activeTab === "member-profile" ? "bg-[#707070]" : ""
                }`}

            >
              <HiUser color="#D4D4D4" />

              <span className="text-[15px] ml-4 text-[#D4D4D4]">Profile</span>
            </div>
          </Link>
        )}
        {currentUser.role === "Instructor" && (

          <div
            className={`p-2.5 my-1 mx-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#707070] text-white ${activeTab === "request" ? "bg-[#707070]" : ""
              }`} onClick={() => toggleDropdownReq()}

          >
            <MdSchedule color="#D4D4D4" />
            <div className="flex items-center justify-between w-full">
              <span className="text-[15px] ml-4 text-[#D4D4D4]">Requests</span>
              <span className="text-sm rotate-180" id="arrow">
                {isOpenReq ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </span>
            </div>
          </div>

        )}
        {isOpenReq && (
          <div
            className="text-left text-sm font-light w-4/5 mx-auto text-[#D4D4D4] p-2"
            id="submenu"
          >
            <Link to="/admin-dashboard?tab=request-shift-change">
              <h1
                className={`cursor-pointer p-2 hover:bg-[#707070] rounded-md mt-1
              ${activeTab === "request-shift-change" ? "bg-[#707070]" : ""}`}
                
              >
                Request Shift Swapping
              </h1>
            </Link>
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
        {currentUser.isAdmin && (
          <Link to="/admin-dashboard?tab=dashboard-comp">
          <div
            className={`p-2.5 my-2 mx-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#707070] text-white ${
              activeTab === "dashboard-comp" || !activeTab ? "bg-[#707070]" : ""
            }`}
           
          >
            <MdDashboard color="#D4D4D4" />

            <span className="text-[15px] ml-4 text-[#D4D4D4]">Dashboard</span>
          </div>
        </Link>
        )}
        {currentUser.isAdmin && (
          <Link to="/admin-dashboard?tab=view-request">
            <div
              className={`p-2.5 my-2 mx-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#707070] text-white ${activeTab === "view-request" ? "bg-[#707070]" : ""
                }`}

            >
              <MdSchedule color="#D4D4D4" />

              <span className="text-[15px] ml-4 text-[#D4D4D4]">View Requests</span>
            </div>
          </Link>
        )}



        {currentUser.isAdmin && (
          <Link to="/admin-dashboard?tab=instuctor-shift">
            <div
              className={`p-2.5 my-2 mx-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#707070] text-white ${activeTab === "instuctor-shift" ? "bg-[#707070]" : ""
                }`}

            >
              <MdOutlineScheduleSend color="#D4D4D4" />

              <span className="text-[15px] ml-4 text-[#D4D4D4]">Instructor Shifts</span>
            </div>
          </Link>)}

        {currentUser.role === "Manager" && (
          <Link to="/admin-dashboard?tab=add-supplements">
            <div
              className={`p-2.5 my-2 mx-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#707070] text-white ${activeTab === "add-supplements" ? "bg-[#707070]" : ""}`}>
              <MdSchedule color="#D4D4D4" />


              <span className="text-[15px] ml-4 text-[#D4D4D4]">Add Supplements</span>
            </div></Link>)}

        {currentUser.role === "Manager" && (
          <Link to="/admin-dashboard?tab=admin-subscripition-panel">
            <div
              className={`p-2.5 my-2 mx-2 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#707070] text-white ${activeTab === "admin-subscripition-panel" ? "bg-[#707070]" : ""
                }`}
            >
              <MdSchedule color="#D4D4D4" />
              <span className="text-[15px] ml-4 text-[#D4D4D4]">Subscription</span>
            </div>
          </Link>
        )}


        {currentUser.isAdmin && (
          <div
            className={`p-2.5 my-2 mx-2  flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#707070] text-white ${activeTab === "emp" ? "bg-[#707070]" : ""
              }`}
            onClick={() => toggleDropdownEmp()}
          >
            <HiOutlineUserGroup color="#D4D4D4" />
            <div className="flex items-center justify-between w-full">
              <span className="text-[15px] ml-4 text-[#D4D4D4]">Employees</span>
              <span className="text-sm rotate-180" id="arrow">
                {isOpenEmp ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </span>
            </div>
          </div>
        )}

        {isOpenEmp && (
          <div
            className="text-left text-sm font-light w-4/5 mx-auto text-[#D4D4D4] p-2"
            id="submenu"
          >
            <Link
              to="/admin-dashboard?tab=search-employee"
            >
              <h1
                className={`cursor-pointer p-2 hover:bg-[#707070] rounded-md
              ${activeTab === "search-employee" ? "bg-[#707070]" : ""}`}
                
              >
                Search Employees
              </h1>
            </Link>
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

        {/* <div
          className="p-2.5 my-2 mx-2  flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#707070] text-white"
          onClick={handleSignout}
        >
          <HiArrowSmRight color="#D4D4D4" />
          <span className="text-[15px] ml-4 text-gray-200">Sign Out</span>
        </div> */}
      </div>
    </div>
  );
}
