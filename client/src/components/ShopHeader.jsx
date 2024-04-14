import { Link, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";

// import { useSelector } from "react-redux";
// import { Avatar, Dropdown, DropdownDivider } from "flowbite-react";

export default function ShopHeader() {
    return (
      <header className="bg-neutral-800 shadow-md">
          <div className="flex justify-between items-center max-w-7x1 mx-auto p-3 pr-20">
              <ul className="flex gap-10 pl-20">
                  <Link to="/supplements">
                  <li className="hidden sm:inline text-white hover:underline">SUPPLEMENTS</li>
                  </Link>
                  <Link to="/liftingaccessories">
                  <li className="hidden sm:inline text-white hover:underline">LIFTING ACCESSORIES</li>
                  </Link>
                  <Link to="/shakersandbottles">
                  <li className="hidden sm:inline text-white hover:underline">SHAKERS & BOTTLES</li>
                  </Link>
                  <Link to="/giflcollection">
                  <li className="hidden sm:inline text-white hover:underline">GIFT COLLECTION</li>
                  </Link>
                  <Link to="/offersanddeals">
                  <li className="hidden sm:inline text-white hover:underline">OFFERS & DEALS</li>
                  </Link>
              </ul>

              <div className="hidden lg:flex items-center w-full justify-between max-w-sm rounded-full focus-within:shadow pl-2 bg-neutral-600"> {/*hidden lg for mobile phones size */}
                <div className="text-lg min-w-[50px] h-8 flex items-center justify-center rounded-r-full text-white">
                    <FaSearch/>
                </div>
                <input type="text" placeholder="Search product here..." className="w-full outline-none bg-transparent"/>
              </div>

              <div className="text-3xl text-white relative">
                <span><MdOutlineShoppingCart/></span>

                <div className="bg-white text-black w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-2">
                    <p className="text-sm">0</p>
                </div>
              </div>
              
          </div>
      </header>
    )
  }