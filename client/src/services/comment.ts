import axios from "axios";

import { comment, listComments } from "../shared/variables";

export const getListComments = async (
  filmId: number
): Promise<listComments[]> => {
  try {
    const res = await axios({
      method: "POST",
      url: process.env.REACT_APP_GET_LIST_COMMENTS,
      data: { id: filmId },
    });
    if (res.data) return res.data.data;
  } catch (e) {
    console.log(e);
  }

  return [];
};

export const addComment = async (data: comment) => {
  try {
    const res = await axios({
      method: "POST",
      url: process.env.REACT_APP_ADD_COMMENT,
      data,
    });
    return res;
  } catch (e) {
    console.log(e);
  }
};
