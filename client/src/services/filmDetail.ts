import axios from "axios";

import { listFilmsTrending, SeasonsProps } from "../shared/variables";

export const filmDetail = async (
  val: string,
  id: number
): Promise<listFilmsTrending[]> => {
  const url = `https://api.themoviedb.org/3/${val}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
  try {
    const res = await axios({
      method: "GET",
      url: url,
    });

    return [res.data];
  } catch (e: any) {
    return [e];
  }
};

export const episodes = async (seasons: SeasonsProps) => {
  try {
    const res = await Promise.all(
      seasons.seasons.map((el, index) => {
        return axios.get(
          `https://api.themoviedb.org/3/tv/${seasons.tv_id}/season/${el.season_number}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
      })
    );

    return res.map((el) => {
      return el.data.episodes;
    });
  } catch (e: any) {
    return [e];
  }
};
