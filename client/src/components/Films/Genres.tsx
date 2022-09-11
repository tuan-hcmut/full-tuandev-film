import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
// import { LazyLoadImage } from "react-lazy-load-image-component";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Autoplay } from "swiper";

import { listBookmark } from "../../shared/variables";

// import { AiTwotoneStar } from "react-icons/ai";
import { BiChevronDown, BiLogOut } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

import Loading from "../common/Loading";
import { getListRecent } from "../../services/recent";

const Genres: React.FC = () => {
  const listGenres = [
    { name: "Action", active: false, id: 28 },
    { name: "Adventure", active: false, id: 12 },
    { name: "Animation", active: false, id: 16 },
    { name: "Comedy", active: false, id: 35 },
    { name: "Crime", active: false, id: 80 },
    { name: "Romance", active: false, id: 10749 },
    { name: "Horror", active: false, id: 27 },
    { name: "Science Fiction", active: false, id: 878 },
  ];

  const { user } = useContext(AuthContext);
  const userImg =
    user !== null
      ? `${
          user.photo.startsWith("https")
            ? ""
            : process.env.REACT_APP_IMG_USER + "/"
        }${user.photo}`
      : "/meo-cute.jpg";
  const [listRecent, setListRecent] = useState<listBookmark[] | undefined>(
    undefined
  );
  const [arrGenres, setArrGenres] = useState<number[]>([]);
  const [genresCheck, setGenresCheck] = useState(listGenres);
  const [nameOfFilm, setNameOfFilm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getList = async () => {
      const res = await getListRecent({ user_id: user.id });
      setListRecent(res.data.data);
    };

    if (user !== null) getList();
  }, []);

  const handleSearch = (e: any) => {
    setNameOfFilm(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    navigate(`/search?key_word=${nameOfFilm}&page=1`);
  };

  const handle = (index: number) => {
    const newArr = [...genresCheck];
    newArr[index].active = !genresCheck[index].active;

    return newArr;
  };

  const handleArrGenres = (val: number) => {
    const newArr: number[] = [val];

    genresCheck.forEach((el) => {
      if (el.active) newArr.push(el.id);
    });

    return newArr;
  };

  const isLogin = () => {
    if (user === null) navigate("/login");
  };

  return (
    <>
      <div className="shrink-0 py-6 px-12 w-[350px] md:sticky top-0 xl:block hidden bg-color-darker h-screen">
        <div
          onClick={() => {
            isLogin();
          }}
          className="flex items-center justify-between cursor-pointer relative group pb-4"
        >
          <div className="flex items-center gap-4">
            <img
              src={`${userImg}`}
              alt="user-img"
              className="w-[4.8rem] h-[4.5rem] rounded-full   shrink-0"
            />
            <div className="flex flex-col gap-0 grow ">
              <h2 className="text-2xl font-extrabold text-white uppercase overflow-hidden text-ellipsis whitespace-nowrap w-[17rem]">
                {user !== null ? user.lastname : "Anonymous"}
              </h2>
              <h3 className="text-xl font-light overflow-hidden text-ellipsis whitespace-nowrap w-[17rem] ">
                {user !== null ? user.email : "Anonymous@gmail.com"}
              </h3>
            </div>
          </div>
          <BiChevronDown className="text-5xl text-white shrink-0" />
          {user !== null && (
            <div className="  flex-col gap-2 absolute hidden group-hover:!flex text-2xl  font-semibold bottom-[0] translate-y-[100%] z-30 left-0 bg-color-filter w-[100%] rounded-lg py-3">
              <Link
                to={"/user/information"}
                className="flex items-center gap-4 pl-8 hover:bg-color-dark hover:text-white transition duration-200 cursor-pointer py-4"
              >
                <CgProfile /> Information
              </Link>
              <Link
                to={`/logout`}
                className="flex items-center gap-4 pl-8 hover:bg-color-dark hover:text-white transition duration-200 cursor-pointer py-4"
              >
                <BiLogOut /> logout
              </Link>
            </div>
          )}
        </div>

        <form className="mt-10 mb-12 relative" onSubmit={handleSubmit}>
          <input
            value={nameOfFilm}
            onChange={handleSearch}
            type={"text"}
            placeholder="Search Movies..."
            maxLength={40}
            minLength={1}
            className="w-[100%] h-[4.7rem] rounded-full pl-[6rem]  bg-zinc-800 text-xl font-light text-white"
          />

          <BsSearch className="absolute top-[50%] translate-y-[-50%] left-10 text-4xl font-semibold text-white" />
        </form>

        <h2 className="text-xl font-medium text-color-grey-dark uppercase mb-6">
          genres
        </h2>

        <div className="flex flex-wrap text-2xl font-light">
          {genresCheck.map((el, index) => {
            return (
              <h3
                onClick={() => {
                  setArrGenres(handleArrGenres(el.id));
                  setGenresCheck(handle(index));
                }}
                className={`py-4 pl-4 pr-20 rounded-full bg-zinc-800 mb-4 ml-2 relative cursor-pointer hover:bg-zinc-900 transition duration-200 ${
                  el.active && "!bg-color-blue !text-white"
                }`}
                key={index}
              >
                {el.name}
                {el.active ? (
                  <AiOutlineCheck className="absolute right-[8%] top-[50%] translate-y-[-50%] !text-white" />
                ) : (
                  <AiOutlinePlus className="absolute right-[8%] top-[50%] translate-y-[-50%] !text-white" />
                )}
              </h3>
            );
          })}
        </div>

        <Link
          to={`/discovery?genre=${arrGenres.toString()}`}
          className="w-[100%] h-[4.7rem] rounded-full bg-zinc-900 text-2xl font-bold text-color-grey-dark mt-4 flex justify-center items-center cursor-pointer"
        >
          Next
        </Link>

        <h2 className="text-xl font-medium text-color-grey-dark uppercase mb-6 mt-12">
          Continue Watching
        </h2>

        {user === null ? (
          <h3 className="text-3xl font-light mt-32">
            Please
            <Link
              to={"/login"}
              className="!font-semibold text-color-blue inline"
            >
              {" "}
              Log In
            </Link>{" "}
            to try this feature 🥰🥰🥰!!!
          </h3>
        ) : !listRecent ? (
          <Loading />
        ) : (
          <div className=" flex justify-center w-[100%]">
            {/* <Swiper
              className="md:!w-[25rem] !w-[15rem]"
              modules={[Navigation, Autoplay]}
              navigation
              slidesPerView={1}
              autoplay={{
                delay: 5000 + 1000 * 2000,
                disableOnInteraction: false,
              }}
            >
              {listRecent.map((el, index) => (
                <SwiperSlide
                  key={index}
                  className=" md:!h-[25rem] md:!w-[25rem] !h-[12rem] !w-[15rem] text-ellipsis overflow-hidden"
                >
                  <Link to={`movie/${el.film_id}`} className="group">
                    <div className="overflow-hidden rounded-lg">
                      <LazyLoadImage
                        effect="opacity"
                        className=" duration-300 md:!h-[25rem] !h-[12rem] !w-[100%] brightness-75 group-hover:scale-110"
                        src={`${process.env.REACT_APP_GET_IMG}${el.poster_path}`}
                        alt="img"
                      />
                    </div>
                    <h2 className=" text-2xl text-yellow-300 text-center px-3 pt-4 font-medium text-ellipsis whitespace-nowrap overflow-hidden">
                      {el.name}
                    </h2>

                    <h3 className="absolute left-[3%] top-[2%] text-2xl  py-2 px-4 bg-color-dark flex items-center gap-3 rounded-full text-yellow-400 border-blue-400 ">
                      {el.vote_average}
                      <AiTwotoneStar />
                    </h3>

                    <h3 className="absolute left-[4%] md:bottom-[17%] bottom-[10%] md:text-2xl text-xl  font-medium">
                      2022
                    </h3>

                    <h3 className="absolute right-[3%] md:bottom-[17%] bottom-[10%] md:text-2xl text-xl  font-medium  md:px-8 md:py-4 px-4 py-2  bg-color-blue !text-white rounded-2xl opacity-70 hover:opacity-100 cursor-pointer transition duration-300">
                      Watch now
                    </h3>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper> */}
          </div>
        )}
      </div>
    </>
  );
};

export default Genres;
