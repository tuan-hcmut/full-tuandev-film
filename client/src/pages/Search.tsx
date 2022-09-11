import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import NavBarSide from "../components/common/NavBarSide";
import NavBarForMob from "../components/common/NavBarForMob";
import NavSideBarMini from "../components/common/NavSideBarMini";
import ScrollButton from "../components/common/ScrollButton";

import { searchResult, listFilmsTrending } from "../shared/variables";

import { search, searchBaseOnResult } from "../services/search";

import FindFilm from "../components/Films/FindFilm";

const Search: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [searchKey, setSearchKey] = useState<searchResult[]>([]);
  const [films, setFilms] = useState<listFilmsTrending[][]>([[], []]);
  const [searchParam, setSearchParam] = useSearchParams({});

  const searchKeyWord = searchParam.get("key_word");
  const pageKeyWord = searchParam.get("page");

  const [pagination, setPagination] = useState({
    pageTrigger: "1",
    pageArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  });

  const setPageFunc = (pageTrigger: string, pageArr: number[]) => {
    const newObj = { ...pagination };

    setSearchParam({
      key_word: searchKeyWord || "",
      page: pageTrigger,
    });
    newObj.pageTrigger = pageTrigger;
    newObj.pageArr = pageArr;
    setPagination(newObj);
  };

  useEffect(() => {
    const getFilm = async () => {
      setFilms(
        await searchBaseOnResult(searchKeyWord || "", pageKeyWord || "1")
      );
    };

    getFilm();
  }, [searchKeyWord, pageKeyWord]);

  const funcActive = (val: boolean) => {
    setIsActive(val);
  };

  const searchFunc = async (val: string) => {
    setSearchKey(await search(val));
  };

  const searchFilms = async (val: string) => {
    setSearchParam({ key_word: val, page: pagination.pageTrigger });
  };

  return (
    <>
      <title>Search</title>
      <div>
        <NavBarForMob funcActive={funcActive} isActive={isActive} />
        <div className={`flex items-start sky-bg min-h-screen`}>
          <NavSideBarMini />
          {isActive && <NavBarSide isActive={isActive} />}
          <FindFilm
            searchFunc={searchFunc}
            seachFilmFunc={searchFilms}
            searchKeyResults={searchKey}
            films={films[0]}
            totalResults={films[1]}
            pagination={pagination}
            setPageFunc={setPageFunc}
          />
          <ScrollButton />
        </div>
      </div>
    </>
  );
};

export default Search;
