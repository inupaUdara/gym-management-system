// SupplementProductView.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { Link } from 'react-router-dom';

// import ShopHeader from "../components/ShopHeader";

const SupplementProductView = () => {
  const { SupplementProuductId } = useParams();
  const [supplement, setSupplement] = useState(null);

  useEffect(() => {
    const fetchSupplement = async () => {
      try {
        const res = await fetch(
          `/api/supplements/getAllSupplements?supplementId=${SupplementProuductId}`
        );

        const data = await res.json();
        if (res.ok) {
          setSupplement(data.supplements[0]);
        }
      } catch (error) {
        console.error("Error fetching supplement:", error);
      }
    };

    fetchSupplement();
  }, [SupplementProuductId]);

  console.log(supplement)

  return (
    <>
      <Header />

      {supplement ? (
        <div className="container mx-auto p-8 flex justify-center">
          <div className="max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden flex">
            <div className="w-1/2 border-r border-gray-200">
              <img
                src={supplement.imageUrls[0]}
                alt={supplement.productName}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            <div className="w-1/2 p-8">
              <h1 className="text-3xl font-bold mb-4">
                {supplement.brandName} {supplement.productName}
              </h1>
              <div className="mb-4">
                <p className="line-through text-gray-700">Rs {supplement.price}</p>
              </div>
              <div className="mb-4">
                <p className="text-gray-700 font-semibold">Rs {supplement.sellingPrice}</p>
              </div>
              <div className="mb-6 flex">
              <Link to={`/shoppingCart/${supplement._id}`}
          >
                <button onClick={()=>{
                const currentCartList = JSON.parse(localStorage.getItem('cart') || '[]') || []

                if(!currentCartList.some((item=>item.id === supplement._id))){
                    currentCartList.push({id: supplement._id, quantity: 1})
                }
                
                localStorage.setItem('cart', JSON.stringify(currentCartList))
              }} className=" bg-red-900 hover:bg-red-800 text-white font-semibold px-6 py-3 mr-4 rounded border border-red-900 w-full">
                  Add to Cart
                </button>
                </Link>
              </div>
              <div className="mb-6 flex">
                <button className="bg-[#4c0000] hover:bg-[#7e1010] text-white font-semibold px-6 py-3 mr-4 rounded border border-red-900 w-full">
                  Buy Now
                </button>
              </div>
              <p className="text-gray-700">{supplement.description}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default SupplementProductView;
