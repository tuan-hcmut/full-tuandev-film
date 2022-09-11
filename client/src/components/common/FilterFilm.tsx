import React, { useState } from "react";

import { genres, listFilmsTrending } from "../../shared/variables";

import Footer from "../Footer/Footer";
import Loading from "./Loading";
import CardWrapper from "./CardWrapper";

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

interface filter {
  listGenres: genres[];
  funcType: any;
  funcFilter: any;
  listFilms: listFilmsTrending[];
}

const FilterFilm: React.FC<filter> = ({
  listGenres,
  funcType,
  funcFilter,
  listFilms,
}) => {
  const typeArr = ["Movies", "Tv-Shows"];
  const sortArr = ["Most Popular", "New Release", "Top Rate"];

  const [pageArr, setPageArr] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [filter, setFilter] = useState({
    pageTrigger: "1",
    branch: "Movies",
    sortbyPicked: "popularity.desc",
    genrePicked: "none",
  });

  const filterFunc = (key: string, val: string) => {
    const newObj = { ...filter };

    if (key === "branch") {
      newObj.branch = val;
      newObj.genrePicked = "";
    }

    if (key === "pageTrigger") newObj.pageTrigger = val;

    if (key === "sortbyPicked") {
      if (val === "Most Popular") newObj.sortbyPicked = "popularity.desc";
      if (val === "New Release") newObj.sortbyPicked = "release_date.desc";
      if (val === "Top Rate") newObj.sortbyPicked = "vote_average.desc";
    }

    if (key === "genrePicked") {
      newObj.genrePicked =
        val === "none"
          ? ""
          : listGenres
              .filter((el) => {
                return el.name === val;
              })[0]
              .id.toString();
    }

    funcFilter(newObj);
    setFilter(newObj);
  };

  const sortBy = (e: any) => {
    filterFunc("sortbyPicked", e.target.value);
  };

  const genre = (e: any) => {
    filterFunc("genrePicked", e.target.value);
  };

  return (
    <>
      {listGenres.length === 0 ? (
        <Loading />
      ) : (
        <div className="w-[100%] mt-[5rem] z-10">
          <div className="flex justify-center w-[100%]">
            <div className="flex gap-20 md:text-3xl text-2xl font-medium relative">
              {typeArr.map((el, index) => {
                return (
                  <h2
                    onClick={() => {
                      filterFunc("branch", el);
                      funcType(el);
                    }}
                    className={`hover:text-white transition duration-200 relative pb-5 cursor-pointer ${
                      filter.branch === el && "!text-white"
                    }`}
                    key={index}
                  >
                    {el}
                    {filter.branch === el && (
                      <div className="h-[4px] w-[130%] left-[50%] translate-x-[-50%] bg-color-blue absolute bottom-0 rounded-t-xl"></div>
                    )}
                  </h2>
                );
              })}
              <div className="absolute border-b border-opacity-50 border-border-grey-dark bottom-0 w-[130%] left-[50%] translate-x-[-50%]"></div>
            </div>
          </div>

          <div className=" mt-14 text-2xl font-normal">
            <div className="flex flex-col md:flex-row md:gap-20 gap-10 md:justify-end items-center md:mr-28">
              <div className="flex gap-4">
                <h3 className="pt-4">Sort By:</h3>
                <select
                  className="bg-color-filter w-[20rem] p-4 rounded"
                  onChange={sortBy}
                >
                  {sortArr.map((el, index) => {
                    return (
                      <option value={el} key={index}>
                        {el}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex gap-4">
                <h3 className="pt-4">Genres: </h3>
                <select
                  defaultValue={"none"}
                  className="bg-color-filter w-[20rem] p-4 rounded"
                  onChange={genre}
                >
                  <option value={"none"} disabled>
                    None
                  </option>
                  {listGenres.map((el, index) => {
                    return (
                      <option value={el.name} key={index}>
                        {el.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-center w-[100%] mt-20">
            <div className="flex flex-wrap md:w-[140rem] w-[40rem] justify-center">
              {listFilms.length === 0 ? (
                <Loading />
              ) : (
                <CardWrapper films={listFilms} width={"md:w-[15%]"} />
              )}
              <div className="flex md:gap-4 w-[100%] justify-center items-center my-20">
                <AiOutlineLeft
                  onClick={() => {
                    if (Number(filter.pageTrigger) < 11) return;

                    filterFunc("pageTrigger", (pageArr[0] - 10).toString());
                    setPageArr(pageArr.map((el) => el - 10));
                  }}
                  className="mr-4 text-3xl font-medium hover:text-color-blue  transition duration-200 rounded-full cursor-pointer"
                />
                {pageArr.map((el, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        filterFunc("pageTrigger", el.toString());
                      }}
                      className={`w-[3rem] py-2 px-3 !text-3xl font-medium hover:text-color-blue  transition duration-200 rounded-full cursor-pointer ${
                        Number(filter.pageTrigger) === el &&
                        "!text-color-blue underline "
                      }`}
                    >
                      {el}
                    </div>
                  );
                })}
                <AiOutlineRight
                  onClick={() => {
                    if (Number(filter.pageTrigger) > 90) return;

                    filterFunc("pageTrigger", (pageArr[0] + 10).toString());
                    setPageArr(pageArr.map((el) => el + 10));
                  }}
                  className="ml-4 text-3xl font-medium hover:text-color-blue  transition duration-200 rounded-full cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="md:px-44 px-8">
            <Footer />
          </div>
        </div>
      )}
    </>
  );
};

export default FilterFilm;
