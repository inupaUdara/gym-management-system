import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Select, TextInput } from "flowbite-react";
import { AiOutlineSearch } from "react-icons/ai";
import EmployeeCard from "./EmployeeCard";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function SearchEmployee() {
  const [totalManagers, setTotalManagers] = useState(0);
  const [totalPendingReq, setTotalPendingReq] = useState(0);
  const [lastMonthManagers, setLastMonthManagers] = useState(0);
  const [totalInstructors, setTotalInstructors] = useState(0);
  const [lastMonthInstructors, setLastMonthInstructors] = useState(0);
  const [totalMorningShiftIns, setMorningShiftIns] = useState(0);
  const [totalAfternoonShiftIns, setAfternoonShiftIns] = useState(0);
  const [totalNightShiftIns, setNightShiftIns] = useState(0);
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sideBarData, setSideBarData] = useState({
    searchTerm: "",
    sort: "desc",
    role: "",
  });
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  console.log(sideBarData);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const roleFromUrl = urlParams.get("role");
    const startIndexFromUrl = parseInt(urlParams.get("startIndex")) || 0;
    if (searchTermFromUrl || sortFromUrl || roleFromUrl) {
      setSearchTerm(searchTermFromUrl);
      setSideBarData({
        ...sideBarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        role: roleFromUrl,
      });
    }
    setStartIndex(startIndexFromUrl);

    const fetchInstructors = async () => {
        const res = await fetch(
          `/api/employee/getemployee?role=Instructor&limit=5`
        );
        const data = await res.json();
        if (res.ok) {
          setTotalInstructors(data.totalEmployees);
          setLastMonthInstructors(data.lastMonthEmployees);
        }
      };

      const fetchManagers = async () => {
        const res = await fetch(`/api/employee/getemployee?role=Manager&limit=5`);
        const data = await res.json();
        if (res.ok) {
          setTotalManagers(data.totalEmployees);
          setLastMonthManagers(data.lastMonthEmployees);
        }
      };

    
    const fetchEmployee = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/employee/getemployee?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setEmployee(data.employees);
        // setTotalInstructors(data.totalEmployees);
        // setLastMonthInstructors(data.lastMonthEmployees);
        // setTotalManagers(data.totalEmployees);
        // setLastMonthManagers(data.lastMonthEmployees);
        setLoading(false);
        if (data.employees.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchEmployee();
    fetchInstructors();
    fetchManagers();
  }, [location.search]);

  console.log(totalInstructors);
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    urlParams.set("sort", sideBarData.sort);
    urlParams.set("role", sideBarData.role);
    urlParams.set("startIndex", 0);
    const searchQuery = urlParams.toString();
    navigate(`${path}?${searchQuery}`);
  };

  const handleChange = (e) => {
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSideBarData({ ...sideBarData, sort: order });
    }

    if (e.target.id === "role") {
      const role = e.target.value || "";
      setSideBarData({ ...sideBarData, role: role });
    }
  };

  const handleShowMore = async () => {
    const numberOfEmp = employee.length;
    const startIndex = numberOfEmp;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/employee/getemployee?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setEmployee([...employee, ...data.employees]);
      if (data.employees.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  const generateUserReport = () => {
    const doc = new jsPDF();

    // Set left margin
    const leftMargin = 80;
    const leftMargin1 = 50;

    // Print the title
    doc.text('CJ GYM & Fitness Center Employee Report', leftMargin1, 20);

    // Print total user count
    doc.text(`Total Employees: ${totalManagers + totalInstructors}`, leftMargin, 30);
    doc.text(`Total Manager: ${totalManagers}`, leftMargin, 40);
    doc.text(`Total Instructors: ${totalInstructors}`, leftMargin, 50);
    const tableData = employee.map((employee) => [
      new Date(employee.createdAt).toLocaleDateString(),
      employee.firstname + " " + employee.lastname,
      employee.username,
      employee.address,
      employee.email,
      employee.nic,
      employee.phone,
      employee.role,
      employee.shift,
      // user.isAdmin ? 'Yes' : 'No',
    ]);
    doc.autoTable({
      head: [
        [
          "Registered Date",
          "Name",
          "username",
          "Address",
          "email",
          "nic",
          "phone",
          "role",
          "shift",
        ],
      ],
      body: tableData,
      startY:60 
    });
    doc.save("employee_report.pdf");
  };

  return (
    <div className="flex flex-col md:flex-row w-full">
      <div className="p-5 border-b md:border-r md:min-h-screen border-gray-500 md:w-1/3">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
          <div className="flex items-center gap-2">
            <label htmlFor="" className="whitespace-nowrap font-semibold">
              Search:
            </label>
            <TextInput
              type="text"
              placeholder="Search..."
              rightIcon={AiOutlineSearch}
              className="w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="" className="font-semibold">
              Sort:
            </label>
            <Select
              onChange={handleChange}
              defaultValue={sideBarData.sort}
              id="sort"
              className="w-full"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="" className="font-semibold">
              Role:
            </label>
            <Select
              onChange={handleChange}
              defaultValue={sideBarData.role}
              id="role"
              className="w-full"
            >
              <option value="">Select Role</option>
              <option value="Instructor">Intructors</option>
              <option value="Manager">Managers</option>
            </Select>
          </div>
          <button
            type="submit"
            className="border-2 border-[#a80000] rounded-md p-2 hover:bg-[#a80000] hover:text-white"
          >
            Search
          </button>
          <button
            onClick={generateUserReport}
            className="border-2 border-[#1f1f1f] rounded-md p-2 hover:bg-[#1f1f1f] hover:text-white"
          >
            Download Employee List
          </button>
        </form>
      </div>
      <p className="mb-4 text-center text-gray-700 text-m dark:text-gray-800 hidden">
        Total Employees: {totalManagers} + {totalInstructors}
    
      </p>
      <p className="mb-4 text-center text-gray-700 text-m dark:text-gray-800 hidden">
        Total Manager: {totalManagers}
    
      </p>
      <p className="mb-4 text-center text-gray-700 text-m dark:text-gray-800 hidden">
        Total Instructors: {totalInstructors}
    
      </p>
      <div className="w-full">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5">
          Employee results
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && employee.length === 0 && (
            <p className="text-xl text-gray-500">No employee found.</p>
          )}
          {loading && <p className="text-xl text-gray-500">Loading...</p>}
          {!loading &&
            employee &&
            employee.map((emp) => (
              <EmployeeCard key={emp._id} employee={emp} />
            ))}
          {showMore && (
            <button
              onClick={handleShowMore}
              className="text-teal-500 text-lg hover:underline p-7 w-full"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
