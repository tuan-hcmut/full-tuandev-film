import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

import NavSideBarMini from "../components/common/NavSideBarMini";
import NavBarForMob from "../components/common/NavBarForMob";
import NavBarSide from "../components/common/NavBarSide";

import { AiFillStar, AiFillClockCircle } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";

import { getListRecent } from "../services/recent";

import ScrollButton from "../components/common/ScrollButton";
import Footer from "../components/Footer/Footer";
import { listBookmark } from "../shared/variables";
import Loading from "../components/common/Loading";
import AuthContext from "../context/AuthProvider";

const Recent: React.FC = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [listRecent, setListRecent] = useState<listBookmark[] | undefined>(
    undefined
  );

  const handleImg = (poster_path: string) => {
    if (poster_path) return `https://image.tmdb.org/t/p/w1280${poster_path}`;
    return "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
  };

  useEffect(() => {
    const getList = async () => {
      const res = await getListRecent({ user_id: user.id });
      setListRecent(res.data.data);
    };

    const isUser = () => {
      user === null ? navigate("/login") : getList();
    };

    isUser();
  }, []);

  const funcActive = (val: boolean) => {
    setIsActive(val);
  };

  return (
    <>
      <title>History</title>
      <NavBarForMob isActive={isActive} funcActive={funcActive} />
      <div className="flex items-start sky-bg relative">
        <NavSideBarMini />
        {isActive && <NavBarSide isActive={isActive} />}
        <div className="flex w-[100%] justify-center">
          <div className="flex flex-col justify-center w-[80%]">
            <div className=" min-h-[50vh] w-[100%]">
              <h2 className="text-white md:text-4xl text-2xl font-normal mb-20 mt-20">
                You watched:
              </h2>
              {!listRecent ? (
                <Loading />
              ) : (
                <div className="flex flex-col gap-10">
                  {listRecent.map((el, index) => {
                    return (
                      <Link
                        to={`/${el.type}/${el.film_id}`}
                        key={index}
                        className="flex items-start gap-8 group hover:bg-color-dark hover:bg-opacity-70 z-10"
                      >
                        <div className="shrink-0 relative overflow-hidden">
                          <LazyLoadImage
                            effect="opacity"
                            className="w-[13rem] h-[14rem] md:w-[21rem] md:h-[20rem] brightness-75 group-hover:brightness-50 transition duration-200"
                            src={handleImg(el.poster_path)}
                            alt="img poster"
                          />
                          <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full group-hover:bg-gradient-to-r from-sky-500 to-indigo-500 flex justify-center items-center z-10 opacity-0  duration-300 group-hover:opacity-100 pl-[1px]">
                            <BsFillPlayFill
                              size={40}
                              className="text-color-grey-dark"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-4 grow-0 pt-4 md:h-auto h-[14rem] overflow-hidden">
                          <h2 className="md:text-4xl text-3xl font-semibold text-white">
                            {el.name}
                          </h2>
                          <div className="flex items-center gap-2">
                            <p className="text-xl font-medium">
                              Time:{" "}
                              <span className="text-2xl">{el.runtime}</span>{" "}
                              minutes
                            </p>
                            <AiFillClockCircle className="w-[1.5rem] h-[1.5rem]" />
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-xl font-medium">
                              Vote:{" "}
                              <span className="text-2xl">
                                {el.vote_average}
                              </span>
                            </p>
                            <AiFillStar className="w-[1.5rem] h-[1.5rem] text-yellow-400" />
                          </div>
                          <p className="text-xl font-medium">
                            Overview: {el.overview}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
            <div>
              <Footer />
            </div>
          </div>
        </div>
        <ScrollButton />
      </div>
    </>
  );
};

export default Recent;
