import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom"; 
import AdminDashSideBar from "../components/AdminDashSideBar";
import AdminDasAddEmp from "../components/AdminDasAddEmp";
import Header from "../components/Header";
export default function AdminDashboard() {
  const location = useLocation();
  const [tab,setTab] = useState('');
  useEffect(() => {
    const urlParama = new URLSearchParams(location.search);
    const tabFromUrl = urlParama.get('tab');
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  }, [location.search])
  return (
    <>
    {/* <Header/> */}
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <AdminDashSideBar/>
      </div>
      
      {tab === 'addemployee' && <AdminDasAddEmp/>}
      
      
    </div>
    </>
    
  )
}
