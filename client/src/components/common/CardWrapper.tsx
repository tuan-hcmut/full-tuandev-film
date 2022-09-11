import React from "react";

import { listBookmark, listFilmsTrending } from "../../shared/variables";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

import { AiTwotoneStar } from "react-icons/ai";

interface listFlims {
  films: listFilmsTrending[];
  width: string;
}
const CardWrapper: React.FC<listFlims> = ({ films, width }) => {
  const handleImg = (poster_path: string, backdrop_path: string) => {
    //`https://image.tmdb.org/t/p/w1280${ el.poster_path || el.backdrop_path }`

    if (poster_path || backdrop_path)
      return `https://image.tmdb.org/t/p/w1280${poster_path || backdrop_path}`;
    return "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
  };
  return (
    <>
      {films.map((el, index) => {
        return (
          <div key={index} className={`${width} w-[40%] mx-5 my-5`}>
            <div className="rounded-lg overflow-hidden relative group ">
              <LazyLoadImage
                effect="opacity"
                className="md:w-[100%] md:h-[25rem] brightness-75 group-hover:scale-110 transition duration-200"
                src={handleImg(el.poster_path, el.backdrop_path)}
                alt="img poster"
              />
              <Link
                to={`/${el.name === undefined ? "movie" : "tv"}/${el.id}`}
                className="absolute right-[3%] md:bottom-[7%] bottom-[10%] md:text-2xl text-lg  font-medium  md:px-8 md:py-4 px-5 py-2  bg-color-blue !text-white rounded-2xl opacity-70 hover:opacity-100 cursor-pointer transition duration-300"
              >
                Watch Now
              </Link>

              <h3 className="absolute left-[3%] top-[2%] md:text-2xl text-xl  py-2 px-4 bg-color-dark flex items-center md:gap-3 gap-1 rounded-full text-yellow-400 border-blue-400 ">
                {el.vote_average === undefined
                  ? 7.9
                  : el.vote_average.toFixed(1)}
                <AiTwotoneStar />
              </h3>
            </div>
            <h3 className=" text-2xl text-yellow-300 text-center px-3 pt-4 font-medium text-ellipsis whitespace-nowrap overflow-hidden">
              {el.title || el.name}
            </h3>
          </div>
        );
      })}
    </>
  );
};

export default CardWrapper;
