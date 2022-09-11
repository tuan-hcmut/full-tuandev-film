import axios from "axios";

import { genres } from "../shared/variables";

export const listGenres = async (val: string): Promise<genres[]> => {
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
  const url1 = `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;

  try {
    const res = await axios({
      method: "GET",
      url: val === "Movies" ? url : url1,
    });

    if (res.data) return res.data.genres;
  } catch (e) {}

  return [];
};
