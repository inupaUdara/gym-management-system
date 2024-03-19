import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsDribbble,
} from "react-icons/bs";
import logo from "../assets/cjgym.png";
export default function FooterCom() {
  return (
    <Footer
      container
      className="border border-t-8 border-[#4c0000] bg-[#1f1f1f] rounded-none"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div>
            <Link to="/">
              <img src={logo} alt="logo" className="w-40" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm: mt-4 sm:grid-cols-3 sm:gap-6">
            
            <div>
              <Footer.Title title="Quick Links" className="text-[#d4d4d4]"/>
              <Footer.LinkGroup col>
                <Footer.Link
                  href="/"
                  target="_self"
                  rel="noopener noreferrer"
                  className="text-[#d4d4d4]"
                >
                  Home
                </Footer.Link>
                <Footer.Link
                  href="/about"
                  target="_self"
                  rel="noopener noreferrer"
                  className="text-[#d4d4d4]"
                >
                  About
                </Footer.Link>
                <Footer.Link
                  href="#"
                  target="_self"
                  rel="noopener noreferrer"
                  className="text-[#d4d4d4]"
                >
                  Memberships
                </Footer.Link>
                <Footer.Link
                  href="#"
                  target="_self"
                  rel="noopener noreferrer"
                  className="text-[#d4d4d4]"
                >
                  Shop
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="legal" className="text-[#d4d4d4]"/>
              <Footer.LinkGroup col className="text-[#d4d4d4]">
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </Footer.Link>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Terms & Condition
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider/>
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright
            href="#"
            by="CJ Gym & Fitness Centre"
            year={new Date().getFullYear()}
          />

          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
