import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Dropdown, DropdownDivider } from "flowbite-react";
import logo from "../assets/cjgym.png";
import { signoutSuccess } from "../redux/user/userSlice";
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignoutEmp = async () => {
    try {
      const res = await fetch('/api/employee/signout', {
        method: 'POST',
      });
      const data = await res.json();

      
      
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    // [url("./assets/homebg.png")]
    <header className={`border-b-2 border-b-black shadow-md relative ${isHomePage ? 'bg-transparent shadow-none border-none' : 'bg-gradient-to-r from-[#1f1f1f] to-[#4c0000]'}`}>
      <div className="flex items-center justify-between p-6 mx-auto max-w-7xl">
        <Link to="/">
          {/* <h2 className="font-light text-sm sm:text-xl flex flex-wrap text-[#D4D4D4]">
            CJ Gym & Fitness Centre
          </h2> */}
          <img src={logo} alt="logo" className="w-40"/>
        </Link>

        <ul className="flex gap-10">
          <Link to="/">
            <li className="hidden sm:inline text-[#D4D4D4] hover:underline hover:underline-offset-4 hover:text-white">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-[#D4D4D4] hover:underline hover:underline-offset-4 hover:text-white">
              About
            </li>
          </Link>
          <Link to="#">
            <li className="hidden sm:inline text-[#D4D4D4] hover:underline hover:underline-offset-4 hover:text-white">
              Memberships
            </li>
          </Link>
          <Link to="#">
            <li className="hidden sm:inline text-[#D4D4D4] hover:underline hover:underline-offset-4 hover:text-white">
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
            <Link to={currentUser.role ? "/admin-dashboard?tab=profile" : "/admin-dashboard?tab=member-profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <DropdownDivider />
            <Dropdown.Item onClick={handleSignoutEmp}>Sign out</Dropdown.Item>
          </Dropdown>
          
        ) : (
          <ul>
            <Link to="/sign-in" className="flex gap-4">
              <li className=" text-[#D4D4D4] font-extrabold text-xl  rounded-lg hover:text-white">
                Sign in
              </li>
            </Link>
          </ul>
        )}
      </div>
    </header>
  );
}
