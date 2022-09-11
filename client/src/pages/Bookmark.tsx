import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { listBookmark } from "../shared/variables";
import { listBookmarked } from "../services/bookmark";

import NavBarForMob from "../components/common/NavBarForMob";
import NavSideBarMini from "../components/common/NavSideBarMini";
import NavBarSide from "../components/common/NavBarSide";
import ScrollButton from "../components/common/ScrollButton";

import { AiTwotoneStar } from "react-icons/ai";

import AuthContext from "../context/AuthProvider";
import Loading from "../components/common/Loading";
import Footer from "../components/Footer/Footer";

const Bookmark: React.FC = () => {
  let { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const typeArr = ["Movies", "Tv-Shows"];
  const [tab, setTab] = useState("Movies");
  const [isActive, setIsActive] = useState(false);
  const [listBookmark, setListBookmark] = useState<listBookmark[] | undefined>(
    undefined
  );

  const handleImg = (poster_path: string) => {
    if (poster_path) return `https://image.tmdb.org/t/p/w1280${poster_path}`;
    return "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
  };

  const funcActive = (val: boolean) => {
    setIsActive(val);
  };

  useEffect(() => {
    const getListBookmark = async () => {
      const res = await listBookmarked({
        user_id: user.id,
        type: tab === "Movies" ? "movie" : "tv",
      });
      setListBookmark(res.data.data);
    };

    const isUser = () => {
      user === null ? navigate("/login") : getListBookmark();
    };

    isUser();
  }, [tab]);

  return (
    <>
      <title>Bookmark</title>
      <NavBarForMob funcActive={funcActive} isActive={isActive} />
      <div className="flex items-start sky-bg relative">
        <NavSideBarMini />
        {isActive && <NavBarSide isActive={isActive} />}
        <div className="w-[100%]">
          <div className="flex justify-center w-[100%] mt-[5rem]">
            <div className="flex gap-20 md:text-3xl text-2xl font-medium relative">
              {typeArr.map((el, index) => {
                return (
                  <h2
                    onClick={() => {
                      setTab(el);
                    }}
                    className={`hover:text-white transition duration-200 relative pb-5 cursor-pointer ${
                      tab === el && "!text-white"
                    }
                  `}
                    key={index}
                  >
                    {el}
                    {tab === el && (
                      <div className="h-[4px] w-[130%] left-[50%] translate-x-[-50%] bg-color-blue absolute bottom-0 rounded-t-xl"></div>
                    )}
                  </h2>
                );
              })}
              <div className="absolute border-b border-opacity-50 border-border-grey-dark bottom-0 w-[130%] left-[50%] translate-x-[-50%]"></div>
            </div>
          </div>
          <div className="flex justify-center w-[100%]">
            <div className="flex flex-wrap justify-center md:w-[140rem] w-[40rem] mt-14">
              <h2 className="text-white text-4xl font-normal w-[95%] mb-10 mt-20">
                {listBookmark && listBookmark.length} {tab} you bookmarked.
              </h2>
              {!listBookmark ? (
                <Loading />
              ) : (
                listBookmark.map((el, index) => {
                  return (
                    <div key={index} className={`md:w-[15%] w-[40%] mx-5 my-5`}>
                      <div className="rounded-lg overflow-hidden relative group ">
                        <LazyLoadImage
                          effect="opacity"
                          className="md:w-[100%] md:h-[25rem] brightness-75 group-hover:scale-110 transition duration-200"
                          src={handleImg(el.poster_path)}
                          alt="img poster"
                        />
                        <Link
                          to={`/${el.type}/${el.film_id}`}
                          className="absolute right-[3%] md:bottom-[7%] bottom-[10%] md:text-2xl text-lg  font-medium  md:px-8 md:py-4 px-5 py-2  bg-color-blue !text-white rounded-2xl opacity-70 hover:opacity-100 cursor-pointer transition duration-300"
                        >
                          Watch Now
                        </Link>

                        <h3 className="absolute left-[3%] top-[2%] md:text-2xl text-xl  py-2 px-4 bg-color-dark flex items-center md:gap-3 gap-1 rounded-full text-yellow-400 border-blue-400 ">
                          {el.vote_average.toFixed(1)}
                          <AiTwotoneStar />
                        </h3>
                      </div>
                      <h3 className=" text-2xl text-yellow-300 text-center px-3 pt-4 font-medium text-ellipsis whitespace-nowrap overflow-hidden">
                        {el.name}
                      </h3>
                    </div>
                  );
                })
              )}

              <Footer />
            </div>
          </div>
        </div>
        <ScrollButton />
      </div>
    </>
  );
};

export default Bookmark;
