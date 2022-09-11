import React, { useContext, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Footer from "../Footer/Footer";
import Watch from "./Watch";

import { listFilmsTrending, activeWatch } from "../../shared/variables";

import { modifyBookmark, isBookmark } from "../../services/bookmark";

import Similar from "./Similar";
import Loading from "../common/Loading";
import Comments from "../common/Comments";
import Episodes from "../common/Episodes";

import { AiFillClockCircle, AiFillStar } from "react-icons/ai";
import {
  BsFillPlayFill,
  BsCurrencyDollar,
  BsFillBookmarkPlusFill,
  BsFillBookmarkCheckFill,
} from "react-icons/bs";
import AuthContext from "../../context/AuthProvider";

interface filmsDetail {
  film: listFilmsTrending;
  filmsSimilar: listFilmsTrending[];
  activeWatch: activeWatch | undefined;
  watch: any;
  tvWatch: any;
}

const Detail: React.FC<filmsDetail> = ({
  film,
  filmsSimilar,
  activeWatch,
  watch,
  tvWatch,
}) => {
  const { user } = useContext(AuthContext);
  const typeArr = ["Overall", "Episodes", "Comments"];
  const [active, setActive] = useState("Overall");
  const [toogleBookmarkIcon, setToogleBookmarkIcon] = useState<
    boolean | undefined
  >(undefined);

  const [reSize, setReSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 768) setReSize(window.innerWidth);
    };

    const checkStateBookmark = async () => {
      const res = await isBookmark({
        user_id: user.id,
        film_id: film.id,
      });

      setToogleBookmarkIcon(res.data.data !== null);
    };

    window.addEventListener("resize", handleScroll);

    if (user !== null && film) checkStateBookmark();
    return () => {
      window.removeEventListener("resize", handleScroll);
    };
  }, [film]);

  const filterArr = (
    arr: { id: number; name: string }[] | undefined,
    num: number
  ) => {
    if (arr === undefined) return [];

    return arr.filter((el, index) => {
      return index < num && el.name !== "Action & Adventure";
    });
  };

  const dataFilm = (user: any, film: any) => {
    if (user === null) return null;
    return {
      user_id: user.id,
      name: film.name || film.title,
      poster_path: film.poster_path || film.backdrop_path,
      vote_average: film.vote_average || 7.0,
      overview: film.overview,
      runtime: film.runtime || null,
      film_id: film.id,
      type: film.name ? "tv" : "movie",
    };
  };

  const addToDb = async () => {
    if (user === null) {
      toast.error("Please login to use this feature!!!");
    } else {
      const res = await modifyBookmark(dataFilm(user, film));

      if (res.status === 200) {
        //// initial val is undefinded
        !toogleBookmarkIcon
          ? toast.success("Add success!!!")
          : toast.success("Remove Success");
        setToogleBookmarkIcon(!toogleBookmarkIcon);
      }
    }
  };

  return (
    <>
      <ToastContainer className={"!text-2xl !font-semibold !text-white"} />
      {!film && !toogleBookmarkIcon ? (
        <Loading />
      ) : (
        <div className="grow md:w-[100%] min-h-screen w-[100%] px-12">
          <div className="min-h-screen">
            {activeWatch ? (
              <Watch
                type={`${activeWatch.type}`}
                id={film.id}
                seasons={activeWatch.season}
                episode={activeWatch.episode}
              />
            ) : (
              <div
                className={
                  "md:h-[35rem] h-[23rem] bg-cover bg-center rounded-b-lg  relative"
                }
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)),url('https://image.tmdb.org/t/p/w1280${film.backdrop_path}')`,
                }}
              >
                <div
                  className={`absolute top-[-1%] right-[4.5%] text-color-grey-dark hover:text-white transition duration-200 cursor-pointer md:text-6xl text-5xl ${
                    toogleBookmarkIcon && "!text-red-500"
                  }`}
                  onClick={() => {
                    addToDb();
                  }}
                >
                  {toogleBookmarkIcon ? (
                    <BsFillBookmarkCheckFill />
                  ) : (
                    <BsFillBookmarkPlusFill />
                  )}
                </div>
                <div className="absolute bottom-[10%] -translate-y-[-50%] left-[10%] w-[86%] flex justify-between">
                  <div className="flex md:gap-10 gap-4">
                    <LazyLoadImage
                      effect="opacity"
                      className="md:w-[20rem] md:h-[25rem] w-[10rem] h-[15rem] rounded-md"
                      src={`https://image.tmdb.org/t/p/w1280${film.poster_path}`}
                      alt="img poster"
                    />
                    <div className="text-white font-semibold md:text-5xl text-2xl flex flex-col md:gap-10 gap-5 mt-4">
                      <h1 className="flex md:gap-5 gap-2">
                        {film.name || film.title}
                        <i className="md:text-2xl text-xl font-light text-yellow-300 flex items-center gap-2 md:pt-4">
                          {film.vote_average.toFixed(1)}
                          <AiFillStar />
                        </i>
                      </h1>
                      <div className=" flex items-center md:gap-5 gap-2 md:w-[45rem] w-[12rem] text-color-grey-dark">
                        {filterArr(film.genres, reSize > 768 ? 3 : 2).map(
                          (el, index) => {
                            return (
                              <a
                                key={index}
                                href={`http://127.0.0.1:3000/discovery?type=${
                                  film.name ? "tv" : "movie"
                                }&sort_by=popularity.desc&genre=${
                                  el.id
                                }&page=1`}
                                className=" cursor-pointer left-0 md:text-2xl text-lg font-thin md:py-3 md:px-5 py-1 px-3 bg-color-dark rounded-full hover:text-white"
                              >
                                {el.name}
                              </a>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-24">
                    <div
                      className=" md:py-5 cursor-pointer md:px-10 py-2 px-4 bg-red-500 hover:bg-red-600 transition duration-200 text-white md:text-2xl text-lg font-normal uppercase rounded-full flex items-center gap-4"
                      onClick={() => {
                        watch(dataFilm(user, film), film.name ? "tv" : "movie");
                      }}
                    >
                      watch
                      <BsFillPlayFill />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center w-[100%] justify-center mt-40">
              <div className="flex items-center gap-20 text-color-grey-dark font-medium md:text-2xl text-xl z-20 relative">
                {typeArr.map((el, index) => {
                  return (
                    <h2
                      key={index}
                      onClick={() => {
                        setActive(el);
                      }}
                      className={`cursor-pointer pb-5 ${
                        active === el && "!text-white"
                      } relative`}
                    >
                      {el}
                      {active === el && (
                        <div className="h-[4.5px] w-[130%] left-[50%] translate-x-[-50%] bg-color-blue absolute bottom-0 rounded-t-xl"></div>
                      )}
                    </h2>
                  );
                })}
                <div className="absolute border-b border-border-grey-dark border-opacity-50 bottom-0 w-[130%] left-[50%] translate-x-[-50%]"></div>
              </div>
            </div>

            {active === "Overall" && (
              <div className="w-[100%] px-[15%] mt-10 md:text-2xl text-xl font-normal">
                <i className="flex justify-center text-white md:text-3xl text-2xl">
                  " {film.tagline} "
                </i>
                <h2 className="mt-4 flex items-center gap-2">
                  Time:
                  <span className="text-color-blue flex gap-2 items-center">
                    {film.runtime} Minutes
                    <AiFillClockCircle />
                  </span>
                </h2>
                <h2 className="mt-4">
                  Release:{" "}
                  <span className="text-color-blue">{film.release_date}</span>
                </h2>
                <h2 className="mt-4">Overview: {film.overview}</h2>
                <h2 className="mt-4">
                  Language:{" "}
                  <span className="text-color-blue">
                    {film.spoken_languages?.map((el) => {
                      return `${el.name} `;
                    })}
                  </span>
                </h2>
                <h2 className="mt-4 flex items-center gap-2">
                  Revenue:
                  <span className="text-color-blue flex gap-2 items-center">
                    {film.revenue}
                    <BsCurrencyDollar />
                  </span>
                </h2>
                <h2 className="mt-4">
                  Home Page:{" "}
                  <a
                    href={`${film.homepage}`}
                    target="_blank"
                    className="underline text-color-blue"
                    rel="noreferrer"
                  >
                    {film.homepage}
                  </a>
                </h2>
              </div>
            )}
            {active === "Comments" && (
              <div>
                <Comments filmId={film.id} />
              </div>
            )}
            {active === "Episodes" &&
              (film.name ? (
                <Episodes
                  seasons={film.seasons || []}
                  tv_id={film.id}
                  tvWatch={tvWatch}
                />
              ) : (
                <div className="h-[20rem] w-[100&] flex justify-center items-center text-2xl font-light italic">
                  There is no episode yet!!!
                </div>
              ))}
          </div>
          <Similar films={filmsSimilar} numFilm={reSize > 768 ? 16 : 8} />
          <Footer />
        </div>
      )}
    </>
  );
};

export default Detail;
