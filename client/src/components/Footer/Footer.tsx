import React from "react";
import { Link } from "react-router-dom";

import Logo from "../common/Logo";

import { BsFacebook, BsSearch } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineLogin } from "react-icons/md";
import { FaRegCompass } from "react-icons/fa";
import { VscSignIn } from "react-icons/vsc";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiOutlineInstagram,
  AiOutlinePhone,
  AiOutlineInfoCircle,
  AiFillHome,
} from "react-icons/ai";

const Footer: React.FC = () => {
  return (
    <>
      <div className="  pt-80 grid-footer !text-white">
        <div className="flex flex-col gap-8">
          <Logo />
          <p className="text-xl font-white font-light">
            LTT is an online platform that using for entertainment purposes.
          </p>
          <div className="flex items-center gap-4 text-3xl text-white font-semibold ">
            <a
              href={"https://www.facebook.com/lethanh.tuan.754703"}
              target={"_blank"}
              rel="noreferrer"
              className="hover:text-color-blue transition duration-200"
            >
              <BsFacebook />
            </a>
            <a
              href={"https://github.com/tuan-hcmut?tab=repositories"}
              target={"_blank"}
              rel="noreferrer"
              className="hover:text-color-blue transition duration-200"
            >
              <AiFillGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/lethanh-tuan-883b3123b/"
              target={"_blank"}
              rel="noreferrer"
              className="hover:text-color-blue transition duration-200"
            >
              <AiFillLinkedin />
            </a>
            <AiOutlineInstagram />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-color-blue pb-6">
            Contact
          </h2>
          <p className="flex items-center gap-6 text-xl font-white font-light">
            <HiOutlineMail />
            tuan01677239677@gmail.com
          </p>
          <p className="flex items-center gap-6 text-xl font-white font-light">
            <AiOutlinePhone /> 0377239677
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-color-blue pb-6">
            Account
          </h2>
          <a
            href={`${process.env.REACT_APP_URL}/login`}
            className="flex items-center gap-6 text-xl font-white font-light hover:text-color-blue transition duration-200"
          >
            <MdOutlineLogin />
            Login
          </a>
          <a
            href={`${process.env.REACT_APP_URL}/signup`}
            className="flex items-center gap-6 text-xl font-white font-light hover:text-color-blue transition duration-200"
          >
            <VscSignIn /> Sign Up
          </a>

          <p className="flex items-center gap-6 text-xl font-white font-light">
            <AiOutlineInfoCircle /> Information
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-color-blue pb-6">
            Navigation
          </h2>
          <a
            href={`${process.env.REACT_APP_URL}`}
            className="flex items-center gap-6 text-xl font-white font-light hover:text-color-blue transition duration-200 "
          >
            <AiFillHome />
            Home
          </a>
          <a
            href={`${process.env.REACT_APP_URL}/search`}
            className="flex items-center gap-6 text-xl font-white font-light hover:text-color-blue transition duration-200"
          >
            <BsSearch /> Search
          </a>

          <a
            href={`${process.env.REACT_APP_URL}/discovery`}
            className="flex items-center gap-6 text-xl font-white font-light hover:text-color-blue transition duration-200"
          >
            <FaRegCompass /> Discovery
          </a>
        </div>
      </div>
      <div className="text-xl font-light text-white text-center pb-6 mt-20">
        Copyright © Le Thanh Tuan. All rights reserved.
      </div>
    </>
  );
};

export default Footer;
