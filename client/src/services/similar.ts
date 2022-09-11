import axios from "axios";

import { listFilmsTrending } from "../shared/variables";

export const similarFilms = async (
  id: number,
  page: number,
  type: string
): Promise<listFilmsTrending[]> => {
  const url = `https://api.themoviedb.org/3/${type}/${id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`;

  try {
    const res = await axios({
      method: "GET",
      url: url,
    });

    if (res.data) return res.data.results;
  } catch (e) {}
  return [];
};
