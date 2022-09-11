import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";

import { listFilmsTrending } from "../../shared/variables";

import Footer from "../Footer/Footer";
import Loading from "../common/Loading";

import { MdNavigateNext } from "react-icons/md";
import { AiTwotoneStar } from "react-icons/ai";
import { Link } from "react-router-dom";

interface DataSubSection {
  filmsPopular: listFilmsTrending[];
  filmsUpcoming: listFilmsTrending[];
  filmsTopRate: listFilmsTrending[];
  animation: listFilmsTrending[];
}
const SubSection: React.FC<DataSubSection> = ({
  filmsPopular,
  filmsUpcoming,
  filmsTopRate,
  animation,
}) => {
  const typeArr = ["popular", "animation", "upcoming", "top-rate"];
  const typeFilms = [filmsPopular, animation, filmsUpcoming, filmsTopRate];

  return (
    <>
      {!filmsPopular && !filmsTopRate && !filmsUpcoming ? (
        <Loading />
      ) : (
        typeArr.map((el, index) => {
          return (
            <div key={index} className="z-10">
              <div className="flex items-center justify-between py-7">
                <h2 className="text-2xl font-extrabold text-color-grey-dark uppercase">
                  {el}
                </h2>
                <Link
                  to={"/discovery"}
                  className="flex-icons !gap-0 cursor-pointer"
                >
                  <h3>See More</h3>
                  <MdNavigateNext className="!text-3xl" />
                </Link>
              </div>
              <div>
                <Swiper
                  modules={[Navigation, Autoplay]}
                  navigation
                  slidesPerView={4}
                  autoplay={{
                    delay: 5000 + index * 2000,
                    disableOnInteraction: false,
                  }}
                >
                  {typeFilms[index].map((film, index1) => {
                    return (
                      <SwiperSlide
                        className="mr-10 md:!h-[23rem] md:!w-[26.5rem] !h-[12rem] !w-[15rem] text-ellipsis overflow-hidden"
                        key={index1}
                      >
                        <Link to={`movie/${film.id}`} className="group">
                          <div className="overflow-hidden rounded-lg">
                            <LazyLoadImage
                              effect="opacity"
                              className=" duration-300 h-[20rem] !w-[100%] brightness-75 group-hover:scale-110"
                              src={`${process.env.REACT_APP_GET_IMG}${film.backdrop_path}`}
                              alt="img"
                            />
                          </div>
                          <h2 className=" text-2xl text-yellow-300 text-center px-3 pt-4 font-medium text-ellipsis whitespace-nowrap overflow-hidden">
                            {film.title}
                          </h2>

                          <h3 className="absolute left-[3%] top-[2%] sm:text-2xl text-xl  py-2 px-4 bg-color-dark flex items-center gap-3 rounded-full text-yellow-400 border-blue-400 ">
                            {film.vote_average.toFixed(1)}
                            <AiTwotoneStar />
                          </h3>

                          <h3 className="absolute left-[4%] md:bottom-[17%] bottom-[10%] md:text-2xl text-xl  font-medium">
                            {film.release_date?.slice(0, 4)}
                          </h3>

                          <h3 className="absolute right-[3%] md:bottom-[17%] bottom-[10%] md:text-2xl text-xl  font-medium  md:px-8 md:py-4 px-4 py-2  bg-color-blue !text-white rounded-2xl opacity-70 hover:opacity-100 cursor-pointer transition duration-300">
                            {el === "upcoming" ? "Trailer" : "Watch now"}
                          </h3>
                        </Link>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          );
        })
      )}
      <Footer />
    </>
  );
};

export default SubSection;
