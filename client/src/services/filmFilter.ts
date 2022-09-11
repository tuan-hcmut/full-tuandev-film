import axios from "axios";

import { filterFilm } from "../shared/variables";

export const filmFilter = async (data: filterFilm) => {
  // const url = `https://api.themoviedb.org/3/discover/${data.type}?api_key=${
  //   process.env.REACT_APP_API_KEY
  // }&language=en-US&sort_by=${
  //   data.sort_by
  // }&include_adult=false&include_video=false&page=${data.page}${
  //   data.genre === "none" ? "" : `&with_genres=${data.genre}`
  // }&with_watch_monetization_types=flatrate`;

  const url = `https://api.themoviedb.org/3/discover/${data.branch}?api_key=${process.env.REACT_APP_API_KEY}&sort_by=${data.sortbyPicked}&with_genres=${data.genrePicked}&with_runtime.gte=0&with_runtime.lte=200&primary_release_date.gte=2002-11-04&primary_release_date.lte=2022-07-28&air_date.gte=2002-11-04&air_date.lte=2022-07-28&page=${data.pageTrigger}
  &with_watch_monetization_types=flatrate`;

  try {
    const res = await axios({
      method: "GET",
      url: url,
    });

    if (res.data) return res.data.results;
  } catch (e) {}
  return [];
};
