import React, { useState } from "react";

import { searchResult, listFilmsTrending } from "../../shared/variables";

import Pagination from "../common/Pagination";
import CardWrapper from "../common/CardWrapper";
import Footer from "../Footer/Footer";

import { BsSearch } from "react-icons/bs";

interface typePros {
  searchFunc: any;
  seachFilmFunc: any;
  searchKeyResults: searchResult[];
  films: listFilmsTrending[];
  totalResults: any;
  pagination: any;
  setPageFunc: any;
}
const FindFilm: React.FC<typePros> = ({
  searchFunc,
  seachFilmFunc,
  searchKeyResults,
  films,
  totalResults,
  pagination,
  setPageFunc,
}) => {
  const [nameOfFilm, setNameOfFilm] = useState("");

  const handle = (e: any) => {
    searchFunc(e.target.value);
    setNameOfFilm(e.target.value);
  };

  const handleClick = (val: string) => {
    seachFilmFunc(val);
    setNameOfFilm("");
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    seachFilmFunc(nameOfFilm);
    setNameOfFilm("");
  };

  return (
    <>
      <div
        className={`flex flex-col w-[100%] items-center ${
          films && films.length === 0 ? "mt-32" : "mt-10"
        } z-30`}
      >
        <h1 className="text-white font-medium md:text-5xl text-2xl mb-10">
          Typing name of the film you want to watch
        </h1>
        <form className=" relative" onSubmit={handleSubmit}>
          <input
            className={`md:w-[70rem] md:h-[5rem] ms:w-[40rem] w-[36rem] h-[4rem]  bg-zinc-800 rounded-full ${
              searchKeyResults.length !== 0 &&
              "rounded-b-none border-b border-color-grey-light"
            } ${
              nameOfFilm === "" && "!rounded-full !border-none"
            } pl-[6rem] text-2xl font-medium opacity-90`}
            value={nameOfFilm}
            onChange={handle}
            autoFocus
            placeholder="Search..."
            type={"text"}
            minLength={1}
            maxLength={40}
          />

          <BsSearch className="absolute top-[50%] translate-y-[-50%] left-10 md:text-4xl text-3xl font-semibold text-white" />
          <div className="flex flex-col absolute z-30">
            {searchKeyResults.length > 0 &&
              searchKeyResults.map((el, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      handleClick(el.name);
                    }}
                    className={`w-[70rem] h-[5rem] bg-zinc-800 ${
                      nameOfFilm === "" && "hidden"
                    } ${
                      index === searchKeyResults.length - 1 && "rounded-b-full"
                    }  text-2xl font-medium opacity-90 pl-[6rem] relative flex items-center hover:bg-zinc-900 cursor-pointer`}
                  >
                    {el.name}
                    <BsSearch className="absolute top-[50%] translate-y-[-50%] left-10 text-4xl font-semibold " />
                  </div>
                );
              })}
          </div>
        </form>
        {totalResults > 0 && (
          <div className="flex flex-wrap justify-center md:w-[140rem] w-[40rem] mt-14">
            <div className="w-[95%] text-white font-medium text-3xl mb-10 mt-20">
              {totalResults} results have been found!!!
            </div>
            <CardWrapper films={films} width={"md:w-[15%]"} />
            <Pagination
              pageTrigger={pagination.pageTrigger}
              pageArr={pagination.pageArr}
              setPageFunc={setPageFunc}
            />
            <Footer />
          </div>
        )}
      </div>
      <div className={`${totalResults > 0 && "hidden"}`}>
        <div className="sun"></div>
        <div className="mercury"></div>
        <div className="venus"></div>
        <div className="earth"></div>
        <div className="mars"></div>
        <div className="jupiter"></div>
        <div className="saturn"></div>
        <div className="uranus"></div>
        <div className="neptune"></div>
        <div className="urasteroids-beltanus"></div>
      </div>
    </>
  );
};

export default FindFilm;
