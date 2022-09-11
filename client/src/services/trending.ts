import axios from "axios";
import { listFilmsTrending } from "../shared/variables";

export const trendingMovies = async (): Promise<listFilmsTrending[]> => {
  try {
    const res = await axios({
      method: "GET",
      url: process.env.REACT_APP_GET_MOVIES_TRENDING,
    });
    // console.log(res.data!.results);
    if (res.data) return res.data!.results;
    else return [];
  } catch (e) {}

  return [];
};

export const trendingTvShows = async (): Promise<listFilmsTrending[]> => {
  try {
    const res = await axios({
      method: "GET",
      url: process.env.REACT_APP_GET_TV_SHOWS_TRENDING,
    });
    // console.log(res.data!.results);
    if (res.data) return res.data!.results;
    else return [];
  } catch (e) {}

  return [];
};
