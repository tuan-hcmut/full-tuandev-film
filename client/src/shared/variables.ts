export interface listFilmsTrending {
  adults: boolean;
  backdrop_path: string;
  id: number;
  original_language: string;
  overview: string;
  poster_path: string;
  media_type?: string;
  genre_ids: number[];
  popularity: number;
  vote_average: number;
  vote_count: number;
  tagline?: string;
  status?: string;
  spoken_languages?: { name: string }[];
  production_companies?: object[];
  production_countries?: object[];
  genres?: { id: number; name: string }[];
  revenue?: number;
  homepage?: string;
  //// movies /////
  title?: string;
  original_title?: string;
  release_date?: string;
  video?: boolean;
  runtime?: number;
  ///// TV //////
  name?: string;
  original_name: string;
  first_air_date: string;
  origin_country: string[];
  number_of_episodes?: number;
  number_of_seasons?: number;
  still_path?: string;
  seasons?: {
    episode_count: number;
    id: number;
    name: string;
    season_number: number;
  }[];
}

export interface genres {
  id: number;
  name: string;
}

export interface translation {
  iso_3166_1: string;
  iso_639_1: string;
  name: string;
  english_name: string;
  data: object;
}

export interface filterFilm {
  pageTrigger: string;
  sortbyPicked: string;
  branch: string;
  genrePicked: string;
}

export interface searchResult {
  name: string;
  id: number;
}

export interface dataSignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface dataLogin {
  email: string;
  password: string;
}

export interface comment {
  commentText: string;
  userId: number;
  filmId: number;
}

export interface listComments {
  id: number;
  comment_text: string;
  user_id: number;
  film_id: number;
  createdAt: Date;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  photo: string;
}

export interface listBookmark {
  name: string;
  poster_path: string;
  vote_average: number;
  film_id: number;
  overview: string;
  runtime: number;
  type: string;
  createdAt: Date;
}

export interface SeasonsProps {
  tv_id: number;
  seasons: {
    episode_count: number;
    id: number;
    name: string;
    season_number: number;
  }[];
  tvWatch?: any;
}

export interface activeWatch {
  type: string;
  season?: string;
  episode?: string;
}
