import { useEffect } from 'react';
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Select, TextInput } from 'flowbite-react';
import { AiOutlineSearch } from "react-icons/ai";
import EmployeeCard from './EmployeeCard';

export default function SearchEmployee() {
    
    const path = useLocation().pathname;
    const location = useLocation();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [sideBarData, setSideBarData] = useState({
        searchTerm: '',
        sort: 'desc',
        role: '',
    });
    const [employee, setEmployee] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);

    console.log(sideBarData)

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const sortFromUrl = urlParams.get('sort');
        const roleFromUrl = urlParams.get('role');
        if (searchTermFromUrl || sortFromUrl || roleFromUrl) {
            setSearchTerm(searchTermFromUrl)
            setSideBarData({
                ...sideBarData,
                searchTerm: searchTermFromUrl,
                sort: sortFromUrl,
                role: roleFromUrl,
            
            })
        }

        const fetchEmployee = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/employee/getemployee?${searchQuery}`);
            if(!res.ok) {
                setLoading(false);
                return;
            }
            if(res.ok) {
                const data = await res.json();
                setEmployee(data.employees);
                setLoading(false);
                if(data.employees.length === 9) {
                    setShowMore(true);
                }
                else {
                    setShowMore(false);
                }
            }


        }
        fetchEmployee();
    }, [location.search])

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm);
        urlParams.set('sort', sideBarData.sort);
        urlParams.set('role', sideBarData.role);
        const searchQuery = urlParams.toString();
        navigate(`${path}?${searchQuery}`);
        

    }

    const handleChange = (e) => {
        
        if(e.target.id === 'sort') {
            const order = e.target.value || 'desc';
            setSideBarData({ ...sideBarData, sort: order });
        }

        if(e.target.id === 'role') {
            const role = e.target.value || 'Instructor';
            setSideBarData({ ...sideBarData, role: role });
        }

    }

    const handleShowMore = async () => {
        const numberOfEmp = employee.length;
        const startIndex = numberOfEmp;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
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

  return (
    <div className="flex flex-col md:flex-row w-full">
        <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500 '>
            <form onSubmit={handleSubmit} className='flex flex-col gap-8 w-full'>
                <div className="flex items-center gap-2">
                    <label htmlFor="" className='whitespace-nowrap font-semibold'>Search:</label>
                    <TextInput
                    type='text'
                    placeholder='Search...'
                    rightIcon={AiOutlineSearch}
                    className=''
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}/>

                </div>
                <div className="flex items-center gap-2">
                    <label htmlFor="" className='font-semibold'>Sort:</label>
                    <Select onChange={handleChange} defaultValue={sideBarData.sort} id='sort'>
                        <option value="desc">Descending</option>
                        <option value="asc">Ascending</option>
                    </Select>
                </div>
                <div className="flex items-center gap-2">
                    <label htmlFor="" className='font-semibold'>Role:</label>
                    <Select onChange={handleChange} defaultValue={sideBarData.role} id='role'>
                        <option value="">Select Role</option>
                        <option value="Instructor">Intructors</option>
                        <option value="Manager">Managers</option>
                    </Select>
                </div>
                <button type="submit" className="border-2 border-[#a80000] rounded-md p-2 hover:bg-[#a80000] hover:text-white">
                    Search
                </button>
            </form>
        </div>
        <div className="w-full">
            <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5'>Employee results</h1>
            <div className="p-7 flex flex-wrap gap-4">
                {
                    !loading && employee.length === 0 && (<p className='text-xl text-gray-500'>
                        No employee found.
                    </p>)

                }
                {
                    loading && (
                        <p className='text-xl text-gray-500'>Loading...</p>
                    )
                }
                {
                    !loading && employee && employee.map((emp) => <EmployeeCard key={emp._id} employee={emp} />)
                }
                {showMore && (
            <button
              onClick={handleShowMore}
              className='text-teal-500 text-lg hover:underline p-7 w-full'
            >
              Show More
            </button>
          )}
            </div>
        </div>
    </div>
  )
}
