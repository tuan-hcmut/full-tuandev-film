import axios from "axios";

export const modifyInRecent = async (data: any) => {
  try {
    const res = await axios({
      method: "POST",
      url: process.env.REACT_APP_MODIFY_RECENT,
      data,
    });
  } catch (e: any) {
    return e;
  }
};

export const getListRecent = async (data: any) => {
  try {
    const res = await axios({
      method: "POST",
      url: process.env.REACT_APP_GET_LIST_RECENT,
      data,
    });

    return res;
  } catch (e: any) {
    return e;
  }
};
