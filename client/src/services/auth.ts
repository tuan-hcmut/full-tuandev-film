import axios from "axios";
import { dataSignUp, dataLogin } from "../shared/variables";

function authHeader() {
  if (localStorage.getItem("token")) {
    return {
      Authorization:
        "Bearer " + JSON.parse(localStorage.getItem("token") || ""),
    };
  }
  return {};
}

export const signup = async (data: dataSignUp) => {
  try {
    const res = await axios({
      method: "POST",
      url: process.env.REACT_APP_SIGN_UP,
      data: data,
    });

    if (res.data.token)
      localStorage.setItem("token", JSON.stringify(res.data.token));
    return res;
  } catch (e: any) {
    return e.response;
  }
};

export const login = async (data: dataLogin) => {
  try {
    const res = await axios({
      method: "POST",
      url: process.env.REACT_APP_LOG_IN,
      data: data,
    });
    if (res.data.token)
      localStorage.setItem("token", JSON.stringify(res.data.token));
    return res;
  } catch (e: any) {
    return e.response;
  }
};

export const loginWithGoogle = async (user: any) => {
  try {
    const res = await axios({
      method: "POST",
      url: process.env.REACT_APP_GOOGLE_LOGIN,
      data: user,
    });
    if (res.data.token)
      localStorage.setItem("token", JSON.stringify(res.data.token));
    return res;
  } catch (e: any) {
    return e.response;
  }
};

export const isLogin = async () => {
  try {
    const res = await axios({
      method: "POST",
      url: process.env.REACT_APP_IS_LOG_IN,
      data: {
        token: authHeader().Authorization?.split(" ")[1],
      },
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
    // const res = await axios({
    //   method: "GET",
    //   url: process.env.REACT_APP_LOG_OUT,
    // });

    if (localStorage.getItem("token")) localStorage.removeItem("token");
    return "done";
  } catch (e: any) {
    return e;
  }
};

export const changeAcountInfor = async (data: any) => {
  try {
    const res = await axios({
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
      method: "PATCH",
      url: process.env.REACT_APP_CHANGE_ACCOUNT_PASSWORD,
      data,
    });
    return res;
  } catch (e: any) {
    return e;
  }
};
