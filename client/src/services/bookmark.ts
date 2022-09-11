import axios from "axios";

import { listBookmark } from "../shared/variables";

export const modifyBookmark = async (data: any) => {
  try {
    const res = await axios({
      method: "POST",
      url: process.env.REACT_APP_ADD_BOOKMARK,
      data,
    });

    return res;
  } catch (e: any) {
    console.log(e);
    return e;
  }
};

export const isBookmark = async (data: any) => {
  try {
    const res = await axios({
      method: "POST",
      url: process.env.REACT_APP_IS_BOOKMARKS,
      data,
    });

    return res;
  } catch (e: any) {
    console.log(e);
    return e;
  }
};

export const listBookmarked = async (data: any) => {
  try {
    const res = await axios({
      method: "POST",
      url: process.env.REACT_APP_GET_LIST_BOOKMARKS,
      data,
    });

    return res;
  } catch (e: any) {
    console.log(e);
    return e;
  }
};
