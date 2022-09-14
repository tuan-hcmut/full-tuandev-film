import React, { useContext, useState, useEffect } from "react";
import Footer from "../components/Footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FiSettings } from "react-icons/fi";
import { FiDatabase } from "react-icons/fi";
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";

import AuthContext from "../context/AuthProvider";
import { changeAcountInfor, changeAcountPassword } from "../services/auth";
import { useNavigate } from "react-router-dom";

const UserInfor: React.FC = () => {
  let { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const isUser = () => {
      if (user.firstname === undefined) {
        navigate("/login");
      }
    };

    isUser();
  }, []);

  if (user === null) {
    ////// this case for non-user access this route //////
    user = {};
    user.firstname = "";
    user.lastname = "";
    user.photo = "/meo-cute.jpg";
    user.email = "";
  }

  const [tabActive, setTabActive] = useState("Settings");
  const [accountInfor, setAccountInfor] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    photo: user.photo,
  });

  const [passwordSetting, SetPasswordSetting] = useState({
    currentpassword: "",
    newpassword: "",
    passwordconfirm: "",
    email: user.email,
  });

  const setMessage = (type: string, message: string) => {
    if (type === "err") toast.error(message);
    if (type === "success") toast.success(message);
  };
  const handleAccount = (e: any) => {
    setAccountInfor({
      ...accountInfor,
      [e.target.name]:
        e.target.name === "photo" ? e.target.files[0] : e.target.value,
    });
  };

  const handlePassword = (e: any) => {
    SetPasswordSetting({ ...passwordSetting, [e.target.name]: e.target.value });
  };

  const handleSubmitAccount = async (e: any) => {
    e.preventDefault();

    if (
      accountInfor.firstname === user.firstname &&
      accountInfor.lastname === user.lastname &&
      accountInfor.photo === user.photo
    ) {
      setMessage("err", "Nothing to update!!!");
    } else {
      let data = new FormData();
      data.append("firstname", accountInfor.firstname);
      data.append("lastname", accountInfor.lastname);
      data.append("email", user.email);
      data.append("photo", accountInfor.photo);
      data.append("photo", user.id);
      const res = await changeAcountInfor(data);
      if (res.status === 200) {
        setMessage("success", "Information updated!!");
        window.location.href = "/";
      }
    }
  };

  const handleSubmitPassword = async (e: any) => {
    e.preventDefault();
    if (passwordSetting.passwordconfirm !== passwordSetting.newpassword) {
      setMessage(
        "err",
        "New password and password confirm are not the same!!!"
      );
    } else {
      const res = await changeAcountPassword(passwordSetting);
      if (res.status === 200) {
        setMessage("success", "Information updated!!");
        window.location.href = "/";
      } else {
        setMessage("err", res.response.data.message);
      }
    }
  };

  return (
    <>
      <title>Settting account</title>
      <ToastContainer className={"!text-2xl !font-semibold !text-white"} />
      <div className="sky-bg w-[100%] flex justify-center">
        <div className="md:w-[70%] w-[90%] my-20">
          <div className="w-[100%] flex">
            <div className="md:w-[30%] w-[15%] bg-color-darker bg-opacity-50 flex flex-col gap-8 py-16 text-2xl font-medium ">
              <div
                onClick={() => {
                  setTabActive("Settings");
                }}
                className={`flex gap-10 items-center py-5 pl-6  ${
                  tabActive === "Settings" &&
                  "border-color-blue text-white border-l-[4px]"
                } cursor-pointer`}
              >
                <FiSettings />
                <h3 className="md:block hidden">Settings</h3>
              </div>
              <div
                onClick={() => {
                  setTabActive("Manager");
                }}
                className={`flex gap-10 items-center py-5 pl-6 cursor-pointer ${
                  tabActive === "Manager" &&
                  "border-color-blue text-white border-l-[4px]"
                }`}
              >
                <FiDatabase />
                <h3 className="md:block hidden">Manager</h3>
              </div>
            </div>
            <div className="md:w-[70%] w-[85%] py-16 bg-color-dark bg-opacity-50 flex flex-col">
              <div className="md:px-20 px-8">
                <form
                  className="flex flex-col gap-20 relative pb-32"
                  onSubmit={handleSubmitAccount}
                >
                  <h2 className="text-3xl font-semibold bg-text-color pt-5">
                    YOUR ACCOUNT SETTINGS
                  </h2>
                  <div className="flex flex-wrap gap-x-16 gap-y-20">
                    <div className="flex flex-col gap-5">
                      <label
                        className="font-semibold text-xl text-white"
                        htmlFor="firstname"
                      >
                        First Name
                      </label>

                      <div className="relative text-2xl font-normal">
                        <input
                          autoComplete="off"
                          value={accountInfor.firstname}
                          onChange={handleAccount}
                          name="firstname"
                          minLength={1}
                          maxLength={40}
                          type={"text"}
                          placeholder="Your name..."
                          id="firstname"
                          className=" w-[25rem]  py-6 pl-20 rounded-lg bg-color-filter bg-opacity-80"
                        />
                        <AiOutlineUser className="absolute top-[50%] left-0 !text-4xl translate-y-[-50%] text-white ml-4" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-5">
                      <label
                        className="font-semibold text-xl text-white"
                        htmlFor="lastname"
                      >
                        Last Name
                      </label>

                      <div className="relative text-2xl font-normal">
                        <input
                          autoComplete="off"
                          value={accountInfor.lastname}
                          onChange={handleAccount}
                          name="lastname"
                          minLength={1}
                          maxLength={40}
                          type={"text"}
                          placeholder="Your name..."
                          id="lastname"
                          required
                          className=" w-[25rem]  py-6 pl-20 rounded-lg bg-color-filter bg-opacity-80"
                        />
                        <AiOutlineUser className="absolute top-[50%] left-0 !text-4xl translate-y-[-50%] text-white ml-4" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-5">
                    <label
                      className="font-semibold text-xl text-white"
                      htmlFor="email"
                    >
                      Email
                    </label>

                    <div className="relative text-2xl font-normal">
                      <input
                        value={user.email}
                        name="email"
                        id="email"
                        readOnly
                        className="lg:w-[54rem] md:w-[40rem] w-[25rem]  py-6 pl-20 rounded-lg bg-color-filter bg-opacity-80"
                      />
                      <AiOutlineMail className="absolute top-[50%] left-0 !text-4xl translate-y-[-50%] text-white ml-4" />
                    </div>
                  </div>
                  <div className="flex md:gap-10 gap-3 items-center">
                    <img
                      src={` ${
                        user.photo.startsWith("https")
                          ? ""
                          : process.env.REACT_APP_IMG_USER + "/"
                      }${user.photo}`}
                      alt={"userphoto"}
                      className="md:w-[7.5rem] md:h-[7.5rem] w-[5rem] h-[5rem] rounded-full"
                    />
                    <input
                      type={"file"}
                      accept="image/*"
                      id="photo"
                      name="photo"
                      onChange={handleAccount}
                      className="h-[0.1px] w-[0.1px] opacity-0"
                    />
                    <label
                      htmlFor="photo"
                      className="p-[3px] border-b border-color-blue cursor-pointer text-color-blue text-2xl font-normal transition duration-200 hover:text-white hover:bg-color-blue"
                    >
                      Chose new photo
                    </label>
                  </div>

                  <div className="flex justify-end lg:w-[54rem] md:w-[40rem] w-[25rem]">
                    <button className="font-semibold text-xl text-white bg-color-blue bg-opacity-50 rounded-lg px-10 py-5 transition duration-200 hover:bg-opacity-100">
                      SAVE SETTINGS
                    </button>
                  </div>
                  <hr className="absolute bottom-0 left-[50%] translate-x-[-50%] border-opacity-50 border-border-grey-dark w-[30rem]" />
                </form>

                <form
                  className="mt-20 flex flex-col gap-20 relative pb-32"
                  onSubmit={handleSubmitPassword}
                >
                  <h2 className="text-3xl font-semibold bg-text-color pt-5">
                    PASSWORD SETTINGS
                  </h2>

                  <div className="flex flex-col gap-5">
                    <label
                      className="font-semibold text-xl text-white"
                      htmlFor="currentpassword"
                    >
                      Current Password
                    </label>

                    <div className="relative text-2xl font-normal">
                      <input
                        placeholder="••••••••"
                        type={"password"}
                        required
                        value={passwordSetting.currentpassword}
                        onChange={handlePassword}
                        name="currentpassword"
                        id="currentpassword"
                        minLength={1}
                        maxLength={40}
                        className="lg:w-[54rem] md:w-[40rem] w-[25rem]  py-6 pl-20 rounded-lg bg-color-filter bg-opacity-80"
                      />
                      <BiLockAlt className="absolute top-[50%] left-0 !text-4xl translate-y-[-50%] text-white ml-4" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-5">
                    <label
                      className="font-semibold text-xl text-white"
                      htmlFor="newpassword"
                    >
                      New Password
                    </label>

                    <div className="relative text-2xl font-normal">
                      <input
                        value={passwordSetting.newpassword}
                        onChange={handlePassword}
                        required
                        type={"password"}
                        placeholder="••••••••"
                        name="newpassword"
                        id="newpassword"
                        minLength={1}
                        maxLength={40}
                        className="lg:w-[54rem] md:w-[40rem] w-[25rem]  py-6 pl-20 rounded-lg bg-color-filter bg-opacity-80"
                      />
                      <BiLockAlt className="absolute top-[50%] left-0 !text-4xl translate-y-[-50%] text-white ml-4" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-5">
                    <label
                      className="font-semibold text-xl text-white"
                      htmlFor="passwordconfirm"
                    >
                      Password Confirm
                    </label>

                    <div className="relative text-2xl font-normal">
                      <input
                        value={passwordSetting.passwordconfirm}
                        onChange={handlePassword}
                        required
                        placeholder="••••••••"
                        type={"password"}
                        name="passwordconfirm"
                        id="passwordconfirm"
                        minLength={1}
                        maxLength={40}
                        className="lg:w-[54rem] md:w-[40rem] w-[25rem]  py-6 pl-20 rounded-lg bg-color-filter bg-opacity-80"
                      />
                      <BiLockAlt className="absolute top-[50%] left-0 !text-4xl translate-y-[-50%] text-white ml-4" />
                    </div>
                  </div>

                  <div className="flex justify-end lg:w-[54rem] md:w-[40rem] w-[25rem]">
                    <button className="font-semibold text-xl text-white bg-color-blue bg-opacity-50 rounded-lg px-10 py-5 transition duration-200 hover:bg-opacity-100">
                      SAVE SETTINGS
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfor;
