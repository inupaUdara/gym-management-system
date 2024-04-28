import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const SubscriptionPackages = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [selectedTab, setSelectedTab] = useState(false);
  const [subPackages, setSubPackage] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`/api/subpackage/getSubPackage`)
      .then((response) => {
        setSubPackage(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [currentUser._id]);
  return (
    <>
      <div className="relative">
        <Header />
        <div className="min-h-screen bg-[linear-gradient(to_right_bottom,rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url('./src/assets/SubCover.jpg')] bg-center bg-cover">
          <h1 className="text-[#a80000] font-extrabold text-5xl text-center lg:text-5xl">
            <span className="text-white">Membership</span> Plans
          </h1>
          <p className="m-3 text-center text-white dark:text-white text-xl">
            Become a privileged Member of CJ Fitness today and join <br /> Sri
            Lanka’s most modern and exclusive fitness community!
          </p>

          <div className="w-80 mx-auto mt-5 h-20 bg-white border-2 border-gray-300 rounded-full flex items-center justify-between">
            <Link
              to="/SubscriptionPackages"
              className={`w-1/2 h-full flex items-center justify-center rounded-full ${selectedTab === false ? "bg-red-700 text-white" : "bg-white text-black"}`}
              onClick={() => setSelectedTab(false)}
            >
              <span className="text-xl font-bold">Stranded</span>
            </Link>
            <Link
              to="/PromoSubPackage"
              className={`w-1/2 h-full flex items-center justify-center rounded-full ${selectedTab === true ? "bg-red-700 text-white" : "bg-white text-black"}`}
              onClick={() => setSelectedTab(true)}
            >
              <span className="text-xl font-bold">Promotion</span>
            </Link>
          </div>

          <div className="container mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {subPackages.map((subPackage) => (
              <div
                key={subPackage._id}
                className="bg-white p-4 rounded-md shadow-md"
              >
                <h3 className="text-lg font-bold">
                  {subPackage.subPackageName}
                </h3>
                <p className="text-gray-500">
                  ${subPackage.price} / {subPackage.validTime} days
                </p>
                <p className="mt-2">{subPackage.description}</p>
                <ul className="mt-2">
                  <li>{subPackage.note1}</li>
                  <li>{subPackage.note2}</li>
                  <li>{subPackage.note3}</li>
                </ul>
                <div className="mt-4 flex justify-end">
                  <Link
                    to={`/subpackages/details/${subPackage._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Details
                  </Link>
                  <button>
                    <Link
                      to={`/Checkout/payment`}
                      className="text-blue-500 hover:underline"
                    >
                      Buy Now
                    </Link>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPackages;
