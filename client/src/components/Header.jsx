import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar, Dropdown, DropdownDivider } from "flowbite-react";
import logo from "../assets/cjgym.png";
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="border-b-2 border-b-black bg-gradient-to-r from-[#1f1f1f] to-[#4c0000] shadow-md relative">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-6">
        <Link to="/">
          {/* <h2 className="font-light text-sm sm:text-xl flex flex-wrap text-[#D4D4D4]">
            CJ Gym & Fitness Centre
          </h2> */}
          <img src={logo} alt="logo" className="w-40"/>
        </Link>

        <ul className="flex gap-10">
          <Link to="/">
            <li className="hidden sm:inline text-[#D4D4D4] hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-[#D4D4D4] hover:underline">
              About
            </li>
          </Link>
          <Link to="#">
            <li className="hidden sm:inline text-[#D4D4D4] hover:underline">
              Memberships
            </li>
          </Link>
          <Link to="#">
            <li className="hidden sm:inline text-[#D4D4D4] hover:underline">
              Shop
            </li>
          </Link>
        </ul>

        {currentUser ? (
          
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
            style={{ zIndex: 9 }}
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/admin-dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <DropdownDivider />
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
          
        ) : (
          <ul>
            <Link to="/sign-in" className="flex gap-4">
              <li className=" text-[#D4D4D4] hover:underline font-semibold">
                Sign in
              </li>
            </Link>
          </ul>
        )}
      </div>
    </header>
  );
}
