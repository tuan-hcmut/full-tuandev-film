import React, { useEffect, useState } from "react";

import { SeasonsProps } from "../../shared/variables";

import { LazyLoadImage } from "react-lazy-load-image-component";

import Loading from "./Loading";

import { episodes } from "../../services/filmDetail";

const Episodes: React.FC<SeasonsProps> = ({ seasons, tv_id, tvWatch }) => {
  const [listSeasons, setListSeasons] = useState<any | undefined>(undefined);

  const [episodeActive, setEpisodeActive] = useState<
    | {
        season: number;
        episode: number;
      }
    | undefined
  >(undefined);

  useEffect(() => {
    const getList = async () => {
      setListSeasons(await episodes({ seasons, tv_id }));
    };

    getList();
  }, []);

  console.log(listSeasons);
  return (
    <>
      {!listSeasons ? (
        <Loading />
      ) : (
        <div className="w-[100%] sm:px-[15%] px-[5%] mt-20">
          {listSeasons.map((listEpisodes: any, season: number) => {
            return (
              <div key={season} className="pb-16">
                <h2 className="text-2xl font-semibold text-yellow-400 my-6 flex justify-start">
                  Season {season + 1}
                </h2>
                <div className="flex flex-col gap-8">
                  {listEpisodes.map((el: any, index: number) => {
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          tvWatch(
                            (season + 1).toString(),
                            (index + 1).toString()
                          );
                          setEpisodeActive({
                            season: season + 1,
                            episode: index + 1,
                          });
                        }}
                        className={`flex gap-6 items-center group hover:bg-dark-lighten ${
                          episodeActive?.episode === index + 1 &&
                          episodeActive.season === season + 1 &&
                          "bg-dark-lighten"
                        } py-3 px-2 transition duration-200 rounded-lg cursor-pointer`}
                      >
                        <div
                          className={`md:text-3xl text-xl font-semibold text-white ${
                            episodeActive?.episode === index + 1 &&
                            episodeActive.season === season + 1 &&
                            "text-color-blue"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div key={index} className="flex gap-16">
                          <div className="shrink-0 relative">
                            <LazyLoadImage
                              effect="opacity"
                              className="md:w-[22rem] md:h-[15rem] w-[13rem] h-[9rem] rounded-md brightness-[-85]"
                              src={`https://image.tmdb.org/t/p/w1280${
                                el.still_path === null
                                  ? listEpisodes[0].still_path
                                  : el.still_path
                              }`}
                              alt="img poster"
                            />
                            <div className="absolute bottom-[5%] right-[7%] text-xl text-yellow-300 font-medium">
                              {el.runtime} minutes
                            </div>
                          </div>
                          <div className="flex items-center grow-0 text-xl font-normal">
                            <p
                              className={`md:text-3xl text-xl font-semibold text-white ${
                                episodeActive?.episode === index + 1 &&
                                episodeActive.season === season + 1 &&
                                "text-color-blue"
                              }`}
                            >
                              {el.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Episodes;
