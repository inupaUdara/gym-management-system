import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useState } from 'react';

const PromoSubPackage = () => {
  const [selectedTab, setSelectedTab] = useState(false);
  return (
    <>
      <div className="relative">
        <Header />
        <div className="min-h-screen bg-[linear-gradient(to_right_bottom,rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url('./src/assets/SubCover.jpg')] bg-center bg-cover">
          <h1 class="text-[#a80000] font-extrabold text-5xl text-center lg:text-5xl"><span class="text-white">Promotions</span> Plans</h1>
          <p className="m-3 text-center text-white dark:text-white text-xl">Become a privileged Member of CJ Fitness today and join <br /> Sri Lanka’s most modern and exclusive fitness community!</p>

          <div className="w-80 mx-auto mt-5 h-20 bg-white border-2 border-gray-300 rounded-full flex items-center justify-between">
            <Link to="/SubscriptionPackages" className={`w-1/2 h-full flex items-center justify-center rounded-full ${selectedTab === false ? 'bg-red-700 text-white' : 'bg-white text-black'}`} onClick={() => setSelectedTab(false)} >
              <span className="text-xl font-bold">Stranded</span>
            </Link>
            <Link to="/PromoSubPackage" className={`w-1/2 h-full flex items-center justify-center rounded-full ${selectedTab === true ? 'bg-red-700 text-white' : 'bg-white text-black'}`} onClick={() => setSelectedTab(true)}>
              <span className="text-xl font-bold">Promotion</span>
            </Link>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default PromoSubPackage