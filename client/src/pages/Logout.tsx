import React from "react";
import { logout } from "../services/auth";

const Logout: React.FC = () => {
  const setLoginState = async () => {
    const res = await logout();
    if (res) window.location.href = "/";
  };

  setLoginState();
  return <></>;
};

export default Logout;
