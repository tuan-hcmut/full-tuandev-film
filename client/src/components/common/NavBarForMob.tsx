import React, { useContext } from "react";

import Logo from "./Logo";

import { AiOutlineMenu } from "react-icons/ai";
import AuthContext from "../../context/AuthProvider";

interface active {
  isActive: boolean;
  funcActive: any;
}

const NavBarForMob: React.FC<active> = ({ isActive, funcActive }) => {
  const { user } = useContext(AuthContext);

  const userImg =
    user !== null
      ? `${
          user.photo.startsWith("https")
            ? ""
            : process.env.REACT_APP_IMG_USER + "/"
        }${user.photo}`
      : "/meo-cute.jpg";

  return (
    <>
      <div className="md:hidden bg-color-darker px-12 py-8 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <AiOutlineMenu
            className={`w-[3rem] h-[3rem] text-white z-[200] ${
              isActive && "fixed"
            }`}
            onClick={() => {
              funcActive(!isActive);
            }}
          />
          <Logo />
        </div>
        <a href={`${process.env.REACT_APP_URL}/user/information`}>
          <img
            src={`${userImg}`}
            alt="default img"
            className="h-16 w-16 rounded-full"
          />
        </a>
      </div>
    </>
  );
};

export default NavBarForMob;
