import React, { useState, useEffect } from "react";

import NavBarSide from "../components/common/NavBarSide";
import Genres from "../components/Films/Genres";
import NavBarForMob from "../components/common/NavBarForMob";
import ScrollButton from "../components/common/ScrollButton";

import Trending from "../components/Films/Trending";
import SubSection from "../components/Films/SubSection";

import { trendingMovies, trendingTvShows } from "../services/trending";
import { listGenres } from "../services/genres";
import { subSection } from "../services/subSection";
import { translationMovies } from "../services/translation";

import { listFilmsTrending } from "../shared/variables";
import { genres } from "../shared/variables";

const Home: React.FC = () => {
  const [dataMoviesTrending, setDataMoviesTrending] = useState<
    listFilmsTrending[]
  >([]);
  const [dataTvShowsTrending, setDataTvShowsTrending] = useState<
    listFilmsTrending[]
  >([]);
  const [dataSubSection, setdataSubSection] = useState<listFilmsTrending[][]>(
    []
  );
  const [dataTranslation, setDataTranslation] = useState<string[][]>([]);
  const [dataGenres, setdataGenres] = useState<genres[]>([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const getDataMoviesTrending = async () => {
      setDataMoviesTrending(await trendingMovies());
    };

    const getDataGenres = async () => {
      setdataGenres(await listGenres("movie"));
    };

    const getDataTvShowsTrending = async () => {
      setDataTvShowsTrending(await trendingTvShows());
    };

    const getDataSubSection = async () => {
      setdataSubSection(await subSection());
    };

    getDataMoviesTrending();
    getDataTvShowsTrending();
    getDataGenres();
    getDataSubSection();
  }, []);

  useEffect(() => {
    const getDataTranslation = async () => {
      setDataTranslation(
        await translationMovies(dataMoviesTrending, dataTvShowsTrending)
      );
    };
    getDataTranslation();
  }, [dataMoviesTrending, dataTvShowsTrending]);

  const funcActive = (val: boolean) => {
    setIsActive(val);
  };

  return (
    <>
      <title>Home-Trang chủ</title>
      <div className="relative">
        <NavBarForMob isActive={isActive} funcActive={funcActive} />
        <div className="flex items-start">
          <NavBarSide isActive={isActive} />
          {/*        middle home           */}
          <div className=" bg-color-dark grow w-0">
            <Trending
              listMovies={dataMoviesTrending}
              listGenres={dataGenres}
              listTvShows={dataTvShowsTrending}
              moviesTitles={dataTranslation[0]}
              tvShowTitles={dataTranslation[1]}
            />
            <div className="px-12 pt-20 flex flex-col gap-12 bg-color-dark">
              <SubSection
                filmsPopular={dataSubSection[1]}
                filmsUpcoming={dataSubSection[3]}
                filmsTopRate={dataSubSection[4]}
                animation={dataSubSection[2]}
              />
            </div>
          </div>

          {/*        Genres         */}
          <Genres />
        </div>
        <ScrollButton />
      </div>
    </>
  );
};

export default Home;
