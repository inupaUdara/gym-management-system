import React, { useEffect, useState } from "react";
import { Modal, Button } from "flowbite-react";
import { useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useParams } from "react-router-dom";

const Shop = () => {
  const [supplements, setSupplements] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [supplementIdToDelete, setSupplementToDelete] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { supplementId } = useParams();
  // useEffect(() => {
  //   const fetchSupplements = async () => {
  //     try {
  //       const res = await fetch('/api/supplements/getAllSupplements');
  //       if (res.ok) {
  //         const data = await res.json();
  //         setSupplements(data.supplements);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching supplements:", error);
  //     }
  //   };

  //   fetchSupplements();
  // }, []);

  useEffect(() => {
    const fetchSupplement = async () => {
      try {
        // const res = await fetch(`/api/supplements/${supplementId}`);
        const res = await fetch(`/api/supplements/getAllSupplements`);

        const data = await res.json();
        if (res.ok) {
          setSupplement(data.supplements[0]);
        }
      } catch (error) {
        console.error("Error fetching supplement:", error);
      }
    };

    fetchSupplement();
  }, [supplementId]);

  // useEffect(() => {
  //   const fetchSupplement = async () => {
  //     try {
  //       const res = await fetch(`/api/supplements/getAllSupplements?SupplementProuductId=${supplementId}`);
  //       const data = await res.json();
  //       if (res.ok && data.supplements.length > 0) {
  //         // Find the supplement with matching ID
  //         const selectedSupplement = data.supplements.find(supplement => supplement._id === supplementId);
  //         if (selectedSupplement) {
  //           setSupplement(selectedSupplement);
  //         } else {
  //           console.error("Supplement not found.");
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error fetching supplement:", error);
  //     }
  //   };

  //   fetchSupplement();
  // }, [supplementId]);
  const currentCartList =
    JSON.parse(localStorage.getItem("cart") || "[]") || [];
  const cartCount = currentCartList.length;

  useEffect(() => {
    const fetchSupplementsByName = async () => {
      try {
        const res = await fetch(
          `/api/supplements/getAllSupplements?search=${searchQuery}`
        );
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

  const filterSupplements = (status) => {
    switch (status) {
      case "all":
        setSupplements(supplements);
        break;
      case "protein":
      case "massGainers":
      case "creatine":
      case "preWorkout":
      case "fatBurners":
      case "vitaminsAndFishOils":
        setSupplements(
          supplements.filter((supplement) => supplement.category === status)
        );
        break;
      default:
        setSupplements([]);
    }
  };

  return (
    <>
      <Header />

      <div className="bg-gray-800 p-4 flex items-center justify-between">
        {/* Buttons */}
        <div className="flex justify-center">
          <button
            className="px-4 py-2 mr-3 text-white"
            onClick={() => filterSupplements("all")}
          >
            All Supplement
          </button>
          <button
            className="px-4 py-2 mr-3 text-white"
            onClick={() => filterSupplements("protein")}
          >
            Proteins
          </button>
          <button
            className="px-4 py-2 mr-3 text-white"
            onClick={() => filterSupplements("massGainers")}
          >
            Mass Gainers
          </button>
          <button
            className="px-4 py-2 mr-3 text-white"
            onClick={() => filterSupplements("creatine")}
          >
            Creatine
          </button>
          <button
            className="px-4 py-2 mr-3 text-white"
            onClick={() => filterSupplements("preWorkout")}
          >
            Pre Workout
          </button>
          <button
            className="px-4 py-2 mr-3 text-white"
            onClick={() => filterSupplements("fatBurners")}
          >
            Fat Burners
          </button>
          <button
            className="px-4 py-2 text-white"
            onClick={() => filterSupplements("vitaminsAndFishOils")}
          >
            Vitamins And Fish Oils
          </button>
        </div>

        {/* Search input */}
        {/* <input
    type="text"
    placeholder="Search supplement by Name"
    value={searchQuery}
    onChange={handleSearch}
    className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  /> */}

        <form className="max-w-md mx-auto">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              value={searchQuery}
              onChange={handleSearch}
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search our store"
              required
            />
          </div>
        </form>

        {/* Cart icon */}
        <div className="text-3xl text-white relative">
        <Link to={`/shoppingCart/gvsh2hsg672haw`} //fake id
          >
          <span>
             <MdOutlineShoppingCart />
          </span>
          </Link>
          <div className="bg-white text-black w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-2">
            <p className="text-sm">{cartCount}</p>
          </div>
        </div>
      </div>

      <div className="mt-12 mx-auto max-w-7xl px-4">
        <h1 className="text-4xl font-extrabold italic mb-8 text-center text-gray-800 dark:text-gray-200">
          Explore Our Supplements Catalog
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
          {supplements.map((supplement) => (
            <div
              key={supplement._id}
              className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg"
            >
              <Link
                to={`/SupplementProuductView/${supplement._id}`}
                className="block"
              >
                <img
                  src={supplement.imageUrls[0]}
                  alt={supplement.username}
                  className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300 rounded-t-lg"
                />
              </Link>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-200">
                  {supplement.productName}
                </h3>
                <div className="flex flex-col">
                  <p className="text-gray-900 dark:text-gray-300 mb-1">
                    <span className="line-through">Rs {supplement.price}</span>
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 font-semibold">
                    Rs {supplement.sellingPrice}
                  </p>
                  <div className="flex mt-4">
                    <Link to={`/shoppingCart/${supplement._id}`}>
                      <button
                        onClick={() => {
                          const currentCartList =
                            JSON.parse(localStorage.getItem("cart") || "[]") ||
                            [];

                          if (
                            !currentCartList.some(
                              (item) => item.id === supplement._id
                            )
                          ) {
                            currentCartList.push({
                              id: supplement._id,
                              quantity: 1,
                            });
                          }

                          localStorage.setItem(
                            "cart",
                            JSON.stringify(currentCartList)
                          );
                        }}
                        className=" bg-red-900 hover:bg-red-800 text-white font-semibold px-4 py-2 mr-2 rounded"
                      >
                        Add to Cart
                      </button>
                    </Link>

                    <button className="bg-[#4c0000] hover:bg-[#7e1010] text-white font-semibold px-4 py-2 rounded">
                      Buy Now
                    </button>
                  </div>
                </div>
                {supplement.productName.split(" ").length === 1 && (
                  <hr className="mt-2 border-t border-gray-200 dark:border-gray-600" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Shop;
