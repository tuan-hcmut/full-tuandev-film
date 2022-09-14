import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthContext from "../context/AuthProvider";

import { login } from "../services/auth";

import { BiLockAlt } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";

import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { user, signUpWithGoogle } = useContext(AuthContext);

  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const isUser = () => {
      if (user !== null) navigate("/");
    };

    isUser();
  });

  const setMessage = (type: string, message: string) => {
    if (type === "err") toast.error(message);
    if (type === "success") toast.success(message);
  };

  const handle = (e: any) => {
    setLogInData({ ...logInData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await login(logInData);
    if (res.status === 200) window.location.href = "/";
    if (res.status === 400) setMessage("err", res.data.message);

    setLogInData({ email: "", password: "" });
  };

  const handleGoogleSignIn = async () => {
    await signUpWithGoogle();
  };
  return (
    <>
      <title>Login</title>
      <ToastContainer className={"!text-2xl !font-semibold !text-white"} />
      <div className="sky-bg w-screen h-screen">
        <div className="flex justify-center items-center h-screen">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center md:w-[50rem] w-[35rem] md:h-[65rem] h-[55rem] bg-color-filter z-30 bg-opacity-50 rounded-lg p-10"
          >
            <h1 className=" text-blue-600 md:text-7xl text-5xl font-bold text-center">
              Log In
            </h1>
            <div className="flex flex-col gap-6 items-center my-12">
              <h3 className="font-semibold text-2xl text-white">
                Login with:{" "}
              </h3>

              <div className="flex gap-10">
                <div
                  onClick={() => {
                    handleGoogleSignIn();
                  }}
                  className="p-6 bg-white rounded-full cursor-pointer "
                >
                  <FcGoogle className="text-4xl" />
                </div>
                <div
                  onClick={() => {
                    toast.error(
                      "Login with github is updating, you can login with google instead!!"
                    );
                  }}
                  className="p-6 bg-white rounded-full cursor-pointer text-4xl"
                >
                  <BsGithub className=" text-black" />
                </div>

                <div
                  onClick={() => {
                    toast.error(
                      "Login with facebook is updating, you can login with google instead!!"
                    );
                  }}
                  className="p-6 bg-white rounded-full cursor-pointer text-4xl"
                >
                  <FaFacebookF className=" text-blue-700" />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:gap-10 gap-7 my-4">
              <div className="flex flex-col gap-5">
                <label
                  className="font-semibold text-xl text-white"
                  htmlFor="email"
                >
                  Email
                </label>

                <div className="relative text-2xl font-normal">
                  <input
                    autoComplete="off"
                    autoFocus
                    value={logInData.email}
                    name="email"
                    minLength={1}
                    maxLength={40}
                    onChange={handle}
                    type={"text"}
                    placeholder="example@gmail.com"
                    id="email"
                    required
                    className="md:w-[40rem] w-[30rem]  py-6 pl-20 rounded-lg bg-color-filter bg-opacity-80"
                  />
                  <AiOutlineMail className="absolute top-[50%] left-0 !text-4xl translate-y-[-50%] text-white ml-4" />
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <label
                  className="font-semibold text-xl text-white"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative text-2xl font-normal">
                  <input
                    type={"password"}
                    name="password"
                    value={logInData.password}
                    minLength={1}
                    maxLength={40}
                    onChange={handle}
                    id="password"
                    required
                    className="md:w-[40rem] w-[30rem] py-6 pl-20 rounded-lg bg-color-filter bg-opacity-80"
                    placeholder="••••••••"
                  />
                  <BiLockAlt className="absolute top-[50%] left-0 !text-4xl translate-y-[-50%] text-white ml-4" />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="font-medium text-white text-3xl bg-blue-500 bg-opacity-70 py-4 px-10 rounded-md mt-10 hover:bg-opacity-100 transiton duration-200"
            >
              Log In
            </button>
            <Link
              to={"/signup"}
              className="font-semibold text-2xl text-blue-500 underline mt-10"
            >
              Create new acccount ???
            </Link>
          </form>
        </div>
        <div className="sun"></div>
        <div className="mercury"></div>
        <div className="venus"></div>
        <div className="earth"></div>
        <div className="mars"></div>
        <div className="jupiter"></div>
        <div className="saturn"></div>
        <div className="uranus"></div>
        <div className="neptune"></div>
        <div className="urasteroids-beltanus"></div>
      </div>
    </>
  );
};

export default Login;
