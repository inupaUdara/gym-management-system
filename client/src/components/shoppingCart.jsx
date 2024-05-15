import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ShoppingCart = ({ supplements }) => {
  // Access product details from the supplements prop

  // State to manage quantity (assuming quantity is initially present in supplements)

  // State to manage total quantity in the cart
  const [totalQuantity, setTotalQuantity] = useState(1);
  const [cartData, setCartData] = useState([]);

  const currentCartList =
    JSON.parse(localStorage.getItem("cart") || "[]") || [];
  const [allQuantites, setAllQuantites] = useState(currentCartList);
  let total = 0;

  if (!supplements) {
    return <div>Loading...</div>; // Handle loading state while fetching data
  }
  console.log("Cart Data:", cartData);
  return (
    <div className="container mx-auto py-12">
      <h2 className="text-2xl font-semibold mb-8">Shopping Cart</h2>
      <div className="flex flex-col">
        {/* Check if there's at least one cart item to display */}
        {supplements
          .filter((supplement) =>
            currentCartList.some((item) => item.id === supplement._id)
          )
          .map((supplement) => {
            const productName = supplement.productName;
            const sellingPrice = supplement.sellingPrice;
            const imageUrl = supplement.imageUrls && supplement.imageUrls[0];
            const cartItem = currentCartList.find(
              (item) => item.id === supplement._id
            );
            const quantity = cartItem?.quantity;
            const handleQuantityChange = (id, delta) => {
              const newItems = [
                ...allQuantites.filter((item) => item.id !== supplement._id),
                { id, quantity: quantity + delta },
              ];
              localStorage.setItem("cart", JSON.stringify(newItems));
              setAllQuantites(newItems);
            };
            total += quantity * sellingPrice;
            return (
              <div key={supplement._id} className="flex items-center mb-6">
                <img
                  className="w-20 h-20 object-cover rounded-lg mr-4"
                  src={imageUrl || "https://picsum.photos/id/237/200/200"}
                  alt="Product"
                />
                <div className="flex flex-col">
                  <span className="text-lg font-medium">{productName}</span>
                  <div className="flex mt-2">
                    <span className="text-lg font-semibold">
                      Rs.{sellingPrice}.00
                    </span>
                    <button
                      onClick={() => {
                        const newItems = allQuantites.filter(
                          (item) => item.id !== supplement._id
                        );
                        localStorage.setItem("cart", JSON.stringify(newItems));
                        setAllQuantites(newItems);
                      }}
                      className="text-red-500 font-medium ml-4 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                {/* Quantity and Total Price columns (assuming quantity is available in supplements) */}
                <div className="flex flex-col ml-auto">
                  <form className="max-w-xs mx-auto">
                    <label
                      htmlFor="quantity-input"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Choose quantity:
                    </label>
                    <div className="relative flex items-center max-w-[8rem]">
                      <button
                        type="button"
                        disabled={quantity < 2}
                        id="decrement-button"
                        onClick={() => handleQuantityChange(supplement._id, -1)}
                        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                      >
                        <svg
                          className="w-3 h-3 text-gray-900 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <input
                        type="text"
                        id="quantity-input"
                        value={quantity}
                        className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="999"
                        required
                        readOnly
                      />
                      <button
                        type="button"
                        id="increment-button"
                        onClick={() => handleQuantityChange(supplement._id, 1)}
                        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                      >
                        <svg
                          className="w-3 h-3 text-gray-900 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            );
          })}
        {/* Handle the case where no cart items exist */}
        {!supplements.length && <div>Your cart is currently empty.</div>}
      </div>
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <span className="text-lg font-semibold text-black-500">Total</span>
        <span className="text-lg font-semibold">Rs {total.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-end mt-4">
        <Link
          to={{
            pathname: "/Checkout/payment",
            state: { cartData: cartData }, // Pass cartData as state
          }}
          onClick={() => console.log("Cart data:", cartData)}
        >
          <button className="bg-[#4c0000] hover:bg-[#7e1010] text-white py-2 px-4 rounded-m focus:outline-none focus:ring-2 focus:ring-offset-2">
            Check Out
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ShoppingCart;
