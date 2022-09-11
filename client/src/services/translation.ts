import axios from "axios";
import { listFilmsTrending } from "../shared/variables";

export const translationMovies = async (
  movies: listFilmsTrending[],
  tvShow: listFilmsTrending[]
): Promise<string[][]> => {
  if (movies.length === 0 || tvShow.length === 0) return []; /////   function accept to run when two arg finish

  let moviesId = movies.map((el) => {
    return el.id;
  });
  let tvShowId = tvShow.map((el) => {
    return el.id;
  });

  const handle = (data: any) => {
    return data.map((el: any) => {
      let temp: any;
      el.data.translations.forEach((el: any) => {
        if (el.iso_639_1 === "vi") {
          temp = el.data.title || el.data.name;
        }
      });
      return temp;
    });
  };

  const res = await Promise.all(
    moviesId.map((el) => {
      return axios.get(
        `https://api.themoviedb.org/3/movie/${el}/translations?api_key=${process.env.REACT_APP_API_KEY}`
      );
    })
  );

  const res1 = await Promise.all(
    tvShowId.map((el) => {
      return axios.get(
        `https://api.themoviedb.org/3/tv/${el}/translations?api_key=${process.env.REACT_APP_API_KEY}`
      );
    })
  );

  const moviesTitles = handle(res);
  const tvShowName = handle(res1);

  return [moviesTitles, tvShowName];
};
