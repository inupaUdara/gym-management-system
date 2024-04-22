import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ShopHeader from '../components/ShopHeader';

const Supplements = () => {
  const [supplements, setSupplements] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [supplementIdToDelete, setSupplementToDelete] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); 

  useEffect(() => {
    const fetchSupplements = async () => {
      try {
        const res = await fetch('/api/supplements/getAllSupplements');
        if (res.ok) {
          const data = await res.json();
          setSupplements(data.supplements);
        }
      } catch (error) {
        console.error("Error fetching supplements:", error);
      }
    };

    fetchSupplements();
  }, []);

  useEffect(() => {
    const fetchSupplementsByName = async () => {
      try {
        const res = await fetch(`/api/supplements/getAllSupplements?search=${searchQuery}`);
        if (res.ok) {
          const data = await res.json();
          setSupplements(data.supplements);
        }
      } catch (error) {
        console.error("Error fetching supplements by name:", error);
      }
    };
    
    fetchSupplementsByName();
  }, [searchQuery]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <Header />
      <ShopHeader />

      <h1>Supplements</h1>

      {/* <div className="mt-12 mx-auto max-w-7xl px-4">
  <h1 className="text-4xl font-extrabold italic mb-8 text-center text-gray-800 dark:text-gray-200">Explore Our Supplements Catalog</h1>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {supplements.map((supplement) => (
      <div key={supplement._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <Link to={`/view-employee-details/${supplement._id}`} className="block">
          <div className="aspect-w-3 aspect-h-4">
            <img
              src={supplement.imageUrls[0]}
              alt={supplement.username}
              className="w-full h-full object-cover rounded-t-lg"
            />
          </div>
        /</Link>
        <div className="p-4 bg-gray-100 dark:bg-gray-700">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-200">{supplement.productName}</h3>
          <div className="flex flex-col">
            <p className="text-gray-900 dark:text-gray-300 mb-1">
              <span className="line-through">Rs {supplement.price}</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400">Rs {supplement.sellingPrice}</p>
            <div className="flex mt-4">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 mr-2 rounded">
                Add to Cart
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded">
                Buy Now
              </button>
            </div>
          </div>
          {supplement.productName.split(' ').length === 1 && <hr className="mt-2 border-t border-white" />}
        </div>
      </div>
    ))}
  </div>
</div> */}


    </>
  );
};

export default Supplements;
