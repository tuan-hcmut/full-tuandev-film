import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import { filmDetail } from "../services/filmDetail";
import { similarFilms } from "../services/similar";

import { modifyInRecent } from "../services/recent";

import { listFilmsTrending, activeWatch } from "../shared/variables";

import ScrollButton from "../components/common/ScrollButton";
import Detail from "../components/Films/Detail";
import Genres from "../components/Films/Genres";
import NavSideBarMini from "../components/common/NavSideBarMini";
import NavBarForMob from "../components/common/NavBarForMob";
import NavBarSide from "../components/common/NavBarSide";

const DetailFilm: React.FC = () => {
  const location = useLocation();

  const [detailFilm, setDetailFilm] = useState<listFilmsTrending[]>([]);
  const [dataFilmsSimilar, setDataFilmsSimilar] = useState<listFilmsTrending[]>(
    []
  );
  const [isActive, setIsActive] = useState(false);
  const [activeWatch, setActiveWatch] = useState<activeWatch | undefined>(
    undefined
  );

  const [searchPrams, setSearchParams] = useSearchParams({});

  const idMovie = Number(location.pathname.split("/movie/")[1]);
  const idTvShow = Number(location.pathname.split("/tv/")[1]);
  if (isNaN(idMovie) && isNaN(idTvShow)) console.log("Wrong Id");

  const watchPram = searchPrams.get("watch");
  const seasonParam = searchPrams.get("season");
  const episodeByParam = searchPrams.get("episode");

  useEffect(() => {
    seasonParam === "-1" &&
      setActiveWatch({
        type: "movie",
      });

    watchPram === "true" &&
      seasonParam !== "-1" &&
      setActiveWatch({
        type: "tv",
        season: seasonParam || "1",
        episode: episodeByParam || "1",
      });
  }, [watchPram, seasonParam, episodeByParam]);

  useEffect(() => {
    const getDataFilm = async () => {
      setDetailFilm(
        await filmDetail(
          isNaN(idTvShow) ? "movie" : "tv",
          isNaN(idTvShow) ? idMovie : idTvShow
        )
      );
    };

    const getSimilarFilms = async () => {
      const numPage = 1;
      setDataFilmsSimilar(
        await similarFilms(
          isNaN(idTvShow) ? idMovie : idTvShow,
          numPage,
          isNaN(idTvShow) ? "movie" : "tv"
        )
      );
    };

    getSimilarFilms();
    getDataFilm();
  }, [idMovie, idTvShow]);

  const watch = async (data: any, type: string) => {
    if (data !== null) await modifyInRecent(data); /// null === non-user

    if (type === "movie") {
      setSearchParams({
        watch: "true",
        season: "-1",
        episode: "-1",
      });
    } else {
      setSearchParams({
        ///// default set when click watch button
        watch: "true",
        season: "1",
        episode: "1",
      });
    }
  };

  const tvWatch = (season: string, episode: string) => {
    setSearchParams({
      watch: "true",
      season,
      episode,
    });
  };

  const funcActive = (val: boolean) => {
    setIsActive(val);
  };

  return (
    <>
      <title>{!detailFilm[0] ? "Loading" : detailFilm[0].title}</title>

      <NavBarForMob isActive={isActive} funcActive={funcActive} />
      <div className="flex items-start bg-color-dark relative">
        <NavSideBarMini />
        {isActive && <NavBarSide isActive={isActive} />}

        <Detail
          film={detailFilm[0]}
          filmsSimilar={dataFilmsSimilar}
          activeWatch={activeWatch}
          watch={watch}
          tvWatch={tvWatch}
        />
        <Genres />
        <ScrollButton />
      </div>
    </>
  );
};

export default DetailFilm;
