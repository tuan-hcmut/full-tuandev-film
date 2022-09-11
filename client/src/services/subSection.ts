import axios from "axios";
import { listFilmsTrending } from "../shared/variables";

export const subSection = async (): Promise<listFilmsTrending[][]> => {
  const url1 = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=2`;
  const url2 = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=16&with_watch_monetization_types=flatrate`;
  const url3 = ` https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;
  const url4 = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;

  let arr: listFilmsTrending[][] | undefined = [[]];
  try {
    const res = await Promise.all([
      axios.get(url1),
      axios.get(url2),
      axios.get(url3),
      axios.get(url4),
    ]);

    res.forEach((el) => {
      if (arr) arr.push(el.data.results);
    });
  } catch (e) {}

  return arr;
};
