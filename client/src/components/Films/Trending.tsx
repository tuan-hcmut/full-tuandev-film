import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

import Loading from "../common/Loading";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BsFillPlayFill, BsClipboardCheck } from "react-icons/bs";
import { BiBell } from "react-icons/bi";
import { MdNavigateNext } from "react-icons/md";
import { TiThLarge } from "react-icons/ti";
import { BsBookmarkPlus } from "react-icons/bs";
import { AiTwotoneStar } from "react-icons/ai";
import { MdOutlineGroups } from "react-icons/md";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";

import { listFilmsTrending } from "../../shared/variables";
import { genres } from "../../shared/variables";
import { quotes } from "../../shared/quotes";

interface ListsFilmsData {
  listMovies: listFilmsTrending[];
  listTvShows: listFilmsTrending[];
  listGenres: genres[];
  moviesTitles: string[];
  tvShowTitles: string[];
}

const Trending: React.FC<ListsFilmsData> = ({
  listMovies,
  listGenres,
  listTvShows,
  moviesTitles,
  tvShowTitles,
}) => {
  const tabs = ["Movies", "Tv-Shows"];
  const [tabActive, setTabActive] = useState("Movies");

  const getGenreFromData = (arrIndex: number[]) => {
    return listGenres.filter((el) => {
      return arrIndex.includes(el.id);
    });
  };

  return (
    <>
      <ToastContainer className={"!text-2xl !font-semibold !text-white"} />
      {listMovies.length === 0 ||
      listGenres.length === 0 ||
      !moviesTitles ||
      !tvShowTitles ||
      tabActive === "Characters" ? (
        <Loading />
      ) : (
        <div className="">
          <div className="flex items-center justify-between py-8 px-12 md:text-2xl text-xl font-light">
            <div className="flex gap-10">
              {tabs.map((tab) => {
                return (
                  <h3
                    key={tab}
                    className={`hover:text-white transition duration-300 cursor-pointer relative ${
                      tabActive === tab && "!font-semibold text-white"
                    }`}
                    onClick={() => setTabActive(tab)}
                  >
                    {tab}
                    {tabActive === tab && (
                      <div className="h-[4px] w-[100%] bg-color-blue absolute bottom-[-100%] rounded-t-xl"></div>
                    )}
                  </h3>
                );
              })}
            </div>
            <div className="flex gap-10">
              <BiBell
                onClick={() => {
                  toast.success(quotes(), { position: "top-center" });
                }}
                className="hover:text-white hover:scale-125 transition duration-300 text-3xl cursor-pointer"
              />
              <TiThLarge className="hover:text-white hover:scale-125 transition duration-300 text-3xl cursor-pointer" />
            </div>
          </div>
          <hr className="border-border-dark border-opacity-50" />

          <div className="flex items-center justify-between px-12 py-7">
            <h2 className="md:text-2xl text-xl md:font-extrabold font-medium text-color-grey-dark uppercase">
              TRENDING {tabActive}
            </h2>
            <Link
              to={"/discovery"}
              className="flex-icons !gap-0 cursor-pointer"
            >
              <h3>See More</h3>
              <MdNavigateNext className="!text-3xl" />
            </Link>
          </div>
          <div className="relative px-12">
            <div>
              <Swiper
                className="absolute w-[100%] h-[20rem] !rounded-lg md:h-[45rem]"
                modules={[Navigation, Autoplay]}
                navigation
                slidesPerView={1}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
              >
                {(tabActive === "Movies" ? listMovies : listTvShows).map(
                  (el, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <Link
                          to={`${tabActive === "Movies" ? "movie" : "tv"}/${
                            el.id
                          }`}
                          className="group cursor-pointer "
                        >
                          <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full group-hover:bg-gradient-to-r from-sky-500 to-indigo-500 flex justify-center items-center z-10 opacity-0  duration-300 group-hover:opacity-100 pl-[1px]">
                            <BsFillPlayFill
                              size={40}
                              className="text-color-grey-dark"
                            />
                          </div>
                          <LazyLoadImage
                            effect="opacity"
                            className="group-hover:brightness-50 duration-300 brightness-90 opacity-70 rounded-lg"
                            src={`${process.env.REACT_APP_GET_IMG}${el.backdrop_path}`}
                            alt="img"
                          />
                          <h3 className="absolute right-[3%] top-[2%] sm:text-2xl text-lg  sm:py-2 py-1 sm:px-4 px-3 bg-color-dark flex items-center gap-3 rounded-full text-yellow-400 border-blue-400 border-2">
                            {el.vote_average.toFixed(1)}
                            <AiTwotoneStar />
                          </h3>
                          <div className="absolute sm:top-[15%] top-[25%] left-[6%] md:w-[43rem] w-[32rem] h-[15rem] md:h-[40rem] overflow-hidden text-ellipsis">
                            <div className="md:text-2xl text-lg flex items-center gap-4">
                              {getGenreFromData(el.genre_ids).map((el, index) =>
                                index < 3 && el.name !== "Sci-Fi & Fantasy" ? (
                                  <div
                                    key={index}
                                    className="sm:py-3 py-2 sm:px-5 px-3 text-color-grey-dark bg-color-dark rounded-full flex items-center gap-2 "
                                  >
                                    <BsBookmarkPlus />
                                    <h3>{el.name}</h3>
                                  </div>
                                ) : (
                                  ""
                                )
                              )}
                            </div>
                            <h1 className="md:text-7xl font-bold text-color-blue pt-1 sm:pb-10 pb-4 text-4xl">
                              {tabActive === "Movies" ? el.title : el.name}
                            </h1>
                            <h2 className="md:text-4xl text-2xl font-bold text-white pt-1">
                              {tabActive === "Movies"
                                ? moviesTitles[index]
                                : tvShowTitles[index]}
                            </h2>
                            <div className="flex items-center sm:gap-9 gap-5">
                              <div className="sm:text-2xl text-xl sm:pt-6 pt-3 sm:pb-2 flex items-center gap-4 text-color-grey-dark">
                                <BsClipboardCheck className="!text-xlbg-color-grey-dark" />
                                <h3>
                                  {tabActive === "Movies"
                                    ? el.release_date
                                    : el.first_air_date}
                                </h3>
                              </div>

                              <div className="sm:text-2xl text-xl sm:pt-6 pt-3 sm:pb-2 flex items-center gap-4 text-color-grey-dark">
                                <MdOutlineGroups className="!text-3xl" />
                                <h3>{el.popularity.toFixed()}</h3>
                              </div>
                            </div>

                            <div className="md:text-2xl text-xl text-color-grey-light text-resize pt-2 sm:visible invisible">
                              {el.overview}
                            </div>
                          </div>
                        </Link>
                      </SwiperSlide>
                    );
                  }
                )}
              </Swiper>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Trending;
