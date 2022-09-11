import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaRegCompass } from "react-icons/fa";
import { AiFillHome, AiFillClockCircle } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { RiErrorWarningLine } from "react-icons/ri";
import { MdOutlineLogin } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import AuthContext from "../../context/AuthProvider";

const NavSideBarMini: React.FC = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  return (
    <>
      <ToastContainer className={"!text-2xl !font-semibold !text-white"} />

      <div className=" shrink-0 pt-8 px-2 md:sticky top-0 md:block hidden bg-color-darker h-screen z-50">
        <div className="flex flex-col w-[6rem] h-screen items-center gap-10 font-bold text-xl">
          <Link to={"/"} className=" mb-36">
            <img
              className="h-16 w-16 rounded-full bg-cyan-500"
              src="/logo1.png"
              alt="logo"
            />
          </Link>
          <h1>M</h1>
          <div className="text-4xl flex flex-col gap-9">
            <Link to={"/"}>
              <AiFillHome className="hover:text-color-blue transition duration-200" />
            </Link>
            <Link to={"/discovery"} className="relative">
              <FaRegCompass
                className={`hover:text-color-blue transition duration-200 ${
                  location.pathname === "/discovery" && "text-color-blue"
                }`}
              />
              {location.pathname === "/discovery" && (
                <div className="w-[3.5px] h-[130%] bg-color-blue absolute right-[-100%] top-[-10%] rounded-l-xl"></div>
              )}
            </Link>
            <Link to={"/search"} className="relative">
              <BsSearch
                className={`hover:text-color-blue transition duration-200 ${
                  location.pathname === "/search" && "text-color-blue"
                }`}
              />
              {location.pathname === "/search" && (
                <div className="w-[3.5px] h-[130%] bg-color-blue absolute right-[-100%] top-[-10%] rounded-l-xl"></div>
              )}
            </Link>
          </div>
          <h1 className="mt-10">L</h1>
          <div className="text-4xl flex flex-col gap-9">
            <Link to={"/bookmark"} className="relative">
              <BsFillBookmarkCheckFill
                className={`hover:text-color-blue transition duration-200 ${
                  location.pathname === "/bookmark" && "text-color-blue"
                }`}
              />
              {location.pathname === "/bookmark" && (
                <div className="w-[3.5px] h-[130%] bg-color-blue absolute right-[-100%] top-[-10%] rounded-l-xl"></div>
              )}
            </Link>
            <Link to={"/recent"} className="relative">
              <AiFillClockCircle
                className={`hover:text-color-blue transition duration-200 ${
                  location.pathname === "/recent" && "text-color-blue"
                }`}
              />
              {location.pathname === "/recent" && (
                <div className="w-[3.5px] h-[130%] bg-color-blue absolute right-[-100%] top-[-10%] rounded-l-xl"></div>
              )}
            </Link>
          </div>
          <h1 className="mt-10">G</h1>
          <div className="text-4xl flex flex-col gap-9">
            <Link to={`${user !== null ? "/logout" : "/login"}`}>
              <MdOutlineLogin className="hover:text-color-blue transition duration-200" />
            </Link>
            <div
              className="cursor-pointer"
              onClick={() => {
                toast.error("This feature is updating!!");
              }}
            >
              <FiSettings className="hover:text-color-blue transition duration-200" />
            </div>
            <Link to={"/"}>
              <RiErrorWarningLine className="hover:text-color-blue transition duration-200" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavSideBarMini;
