import axios from "axios";
import { dataSignUp, dataLogin } from "../shared/variables";

export const signup = async (data: dataSignUp) => {
  try {
    const res = await axios({
      withCredentials: true,
      method: "POST",
      url: process.env.REACT_APP_SIGN_UP,
      data: data,
    });

    return res;
  } catch (e: any) {
    return e.response;
  }
};

export const login = async (data: dataLogin) => {
  try {
    const res = await axios({
      withCredentials: true,

      method: "POST",
      url: process.env.REACT_APP_LOG_IN,
      data: data,
    });

    return res;
  } catch (e: any) {
    return e.response;
  }
};

export const isLogin = async () => {
  try {
    const res = await axios({
      withCredentials: true,
      method: "GET",
      url: process.env.REACT_APP_IS_LOG_IN,
    });

    console.log(res.data.data);
    return res.data.data;
  } catch (e) {
    console.log(e);
  }
  return;
};

export const logout = async () => {
  try {
    const res = await axios({
      withCredentials: true,
      method: "GET",
      url: process.env.REACT_APP_LOG_OUT,
    });

    return res;
  } catch (e: any) {
    return e;
  }
};

export const changeAcountInfor = async (data: any) => {
  try {
    const res = await axios({
      withCredentials: true,
      method: "PATCH",
      url: process.env.REACT_APP_CHANGE_ACCOUNT_INFOR,
      data,
    });

    return res;
  } catch (e: any) {
    return e;
  }
};

export const changeAcountPassword = async (data: any) => {
  try {
    const res = await axios({
      withCredentials: true,
      method: "PATCH",
      url: process.env.REACT_APP_CHANGE_ACCOUNT_PASSWORD,
      data,
    });
    return res;
  } catch (e: any) {
    return e;
  }
};

export const loginFromGoogle = async () => {
  window.open(`${process.env.REACT_APP_GOOGLE_LOGIN}`, "_self");
};
