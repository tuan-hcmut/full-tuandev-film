import React, { useEffect, useState } from "react";

import FilterFilm from "../components/common/FilterFilm";
import NavSideBarMini from "../components/common/NavSideBarMini";
import NavBarSide from "../components/common/NavBarSide";
import NavBarForMob from "../components/common/NavBarForMob";
import ScrollButton from "../components/common/ScrollButton";

import { listGenres } from "../services/genres";
import { filmFilter } from "../services/filmFilter";

import { filterFilm, genres, listFilmsTrending } from "../shared/variables";
import { useSearchParams } from "react-router-dom";

const Discovery: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [type, setType] = useState("Movies");
  const [listGen, setListGen] = useState<genres[]>([]);
  const [listFilms, setListFilms] = useState<listFilmsTrending[]>([]);
  const [search, setSearch] = useSearchParams({});

  const pageParam = search.get("page");
  const sortByParam = search.get("sort_by");
  const genreParam = search.get("genre");
  const typeParam = search.get("type");

  useEffect(() => {
    const getDatafilms = async () => {
      setListFilms(
        await filmFilter({
          pageTrigger: pageParam || "1",
          sortbyPicked: sortByParam || "popularity.desc",
          branch: typeParam || "movie",
          genrePicked: genreParam?.toString() || "",
        })
      );
    };

    getDatafilms();
  }, [pageParam, sortByParam, genreParam, typeParam]);
  useEffect(() => {
    const getDataGenres = async () => {
      setListGen(await listGenres(type));
    };

    getDataGenres();
  }, [type]);

  const funcActive = (val: boolean) => {
    setIsActive(val);
  };

  const funcType = (val: string) => {
    setType(val);
  };

  const funcFilterList = (data: filterFilm) => {
    const newData = { ...data };

    data.branch === "Movies"
      ? (newData.branch = "movie")
      : (newData.branch = "tv");
    setSearch({
      type: newData.branch,
      sort_by: newData.sortbyPicked,
      genre: newData.genrePicked,
      page: newData.pageTrigger,
    });
  };

  return (
    <>
      <title>Discovery</title>
      <NavBarForMob funcActive={funcActive} isActive={isActive} />
      <div className="flex items-start sky-bg relative">
        <NavSideBarMini />
        {isActive && <NavBarSide isActive={isActive} />}
        <FilterFilm
          listGenres={listGen}
          funcType={funcType}
          listFilms={listFilms}
          funcFilter={funcFilterList}
        />
        <ScrollButton />
      </div>
    </>
  );
};

export default Discovery;
