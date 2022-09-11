import React from "react";

import { listFilmsTrending } from "../../shared/variables";

import Loading from "../common/Loading";
import CardWrapper from "../common/CardWrapper";

interface similar {
  films: listFilmsTrending[];
  numFilm: number;
}

const Similar: React.FC<similar> = ({ films, numFilm }) => {
  const filterFilm = (num: number) => {
    return films.filter((el, index) => {
      return index < num;
    });
  };
  return (
    <>
      <h2 className="md:text-2xl text-xl md:font-extrabold font-medium text-color-grey-dark uppercase mb-10">
        Similar
      </h2>
      {films.length === 0 ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap justify-center">
          <CardWrapper films={filterFilm(numFilm)} width={"md:w-[20%]"} />
        </div>
      )}
    </>
  );
};

export default Similar;
