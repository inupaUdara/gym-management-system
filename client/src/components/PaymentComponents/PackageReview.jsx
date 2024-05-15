"use client";

const PackageReview = () => {
  const productSubTotal = 35000; // Replace with actual product price logic

  const calculateTotal = () => {
    return productSubTotal;
  };

  return (
    <div className="p-4 rounded-md shadow-md bg-[#1F1F1F]">
      {/* Product details section */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-200 ">
        <div className="flex items-center">
          <div className="ml-4">
            <p className="text-sm font-semibold text-white" id="productName">
              Package Name
            </p>
            <p className="text-base font-semibold text-white" id="productName">
              Annually
            </p>
            <p className="text-sm text-white" id="productInfo">
              Fee for Annual Package
            </p>
          </div>
        </div>
        <p className="text-base font-semibold text-white" id="productPrice">
          RS 35000.00
        </p>
      </div>

      {/* Discount code or Gift card section */}
      <div className="flex justify-between items-center py-4 border-b border-gray-200">
        <p className="text-sm text-white">Discount code or Gift card</p>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Enter code"
            className="w-full px-4 py-2 text-white bg-[#1F1F1F] border border-[#A80000] rounded-lg focus:ring-[#A80000] focus:border-[#A80000] outline-none"
          />
          <button
            type="button"
            className="ml-2 px-4 py-2 text-white bg-[#A80000] rounded-lg hover:bg-[#A80000] focus:ring-[#A80000] focus:outline-none"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Subtotal section */}
      <div className="flex justify-between items-center py-4">
        <p className="text-sm text-white">Subtotal</p>
        <p className="text-base font-semibold text-white" id="productSubTotal">
          RS {calculateTotal()}.00
        </p>
      </div>

      {/* Total section */}
      <div className="flex justify-between items-center py-4 border-t border-gray-200">
        <p className="text-base font-semibold text-white">Total</p>
        <p className="text-lg font-semibold text-white" id="productTotal">
          RS {calculateTotal()}.00
        </p>
      </div>
    </div>
  );
};

export default PackageReview;
