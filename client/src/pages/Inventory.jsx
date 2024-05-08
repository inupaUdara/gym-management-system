import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { useNavigate } from 'react-router-dom';

export default function InventoryViewItems() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [items, setItems] = useState([]);
  const [showDetails, setShowDetails] = useState({});
  const [searchTerm, setSearchTerm] = useState(""); 
  const itemsRef = useRef(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch('/api/inventory/getItems');
        const data = await res.json();
        if (res.ok) {
          const initialShowDetails = {};
          data.items.forEach(item => {
            initialShowDetails[item._id] = false;
          });
          setShowDetails(initialShowDetails);
          setItems(data.items);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
  fetchItems();

  }, [currentUser]);

  const toggleDetails = (itemId) => {
    setShowDetails(prevState => ({
      ...prevState,
      [itemId]: !prevState[itemId]
    }));
  };

  const filteredItems = items.filter(item =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <Header />
    <div className="relative w-full min-h-screen">
      <Header />
      <div className="absolute inset-0 overflow-y-auto bg-[url('./assets/inventory_bg.jpg')] bg-center bg-cover">
        <div className="flex flex-col gap-6 p-40 px-4 max-w-7xl mx-auto">
          <div className="w-full h-full text-center text-white text-6xl font-montserrat font-bold break-words">What We Have</div>
          {/* Search input field */}
          <input
            type="text"
            placeholder="Search by item name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 mt-4 mb-8 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" ref={itemsRef}>
            {filteredItems.map((item) => (
              <div key={item._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-3 aspect-h-4">
                  <img
                    src={item.itemPicture}
                    alt={item.itemName}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-4 bg-gray-100 dark:bg-gray-700">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-200">{item.itemName}</h3>
                  {showDetails[item._id] && (
                    <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                  )}
                  <button className="p-3 text-[#d4d4d4] font-semibold uppercase rounded-full bg-[#A80000] hover:bg-[#4c0000]" onClick={() => toggleDetails(item._id)}>
                    {showDetails[item._id] ? 'Hide Details' : 'View More'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
