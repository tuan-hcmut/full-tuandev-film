import axios from "axios";

import { searchResult, listFilmsTrending } from "../shared/variables";

export const search = async (val: string): Promise<searchResult[]> => {
  const url = `https://api.themoviedb.org/3/search/keyword?api_key=${process.env.REACT_APP_API_KEY}&query=${val}&page=1`;

  try {
    const res = await axios({
      method: "GET",
      url: url,
    });

    if (res.data) {
      const newArr = res.data.results.filter(
        (el: searchResult, index: number) => {
          return index < 5;
        }
      );

      return newArr;
    }
  } catch (e) {}

  return [];
};

export const searchBaseOnResult = async (
  val: string,
  page: string
): Promise<listFilmsTrending[][]> => {
  if (val === "") return [[], []];
  const url = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${val}&page=${page}&include_adult=false`;

  try {
    const res = await axios({
      method: "GET",
      url: url,
    });

    if (res.data) return [res.data.results, res.data.total_results];
  } catch (e) {}

  return [];
};
