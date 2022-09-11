import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

import { comment, listComments } from "../../shared/variables";

import { addComment, getListComments } from "../../services/comment";
import Loading from "./Loading";

interface commentProps {
  filmId: number;
}
let temp: comment[] = [];

const Comments: React.FC<commentProps> = ({ filmId }) => {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState<listComments[] | undefined>(
    undefined
  );

  const [comment, setComment] = useState<comment>({
    commentText: "",
    userId: user?.id,
    filmId,
  });

  useEffect(() => {
    const getComments = async () => {
      setComments(await getListComments(filmId));
    };

    getComments();
  }, []);

  const handle = (e: any) => {
    e.preventDefault();

    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await addComment(comment);
    if (res?.status === 200) {
      temp.push(comment);
    }

    setComment({
      commentText: "",
      userId: user.id,
      filmId,
    });
  };

  const likeClick = () => {
    if (user === null) {
      toast.error("You need login to use comment feature!!!");
    }
  };
  return (
    <>
      <ToastContainer className={"!text-2xl !font-semibold !text-white"} />
      <div className="mb-40">
        <h2 className="text-4xl font-medium text-white mt-32">Comments</h2>

        {user === null ? (
          <div className="mt-10 flex justify-center mb-16 text-3xl">
            You need
            <Link className="text-blue-600 underline inline px-3" to={"/login"}>
              login
            </Link>
            to use comment feature!!!
          </div>
        ) : (
          <form
            className="mt-10 flex items-center gap-4 mb-16"
            onSubmit={handleSubmit}
          >
            <img
              src={`${
                user.photo.startsWith("https")
                  ? ""
                  : process.env.REACT_APP_IMG_USER + "/"
              }${user.photo}`}
              alt="user img"
              className="w-[4.5rem] h-[4.5rem] rounded-full"
            />
            <input
              placeholder="Comment..."
              value={comment.commentText}
              required
              name="commentText"
              onChange={handle}
              minLength={1}
              maxLength={1000}
              className={`w-[80%] h-[5rem] bg-color-filter text-3xl font-normal p-6 rounded-md`}
            />
          </form>
        )}

        <div className="flex items-center gap-4 mb-20">
          <img
            src={`${process.env.REACT_APP_IMG_USER + "/meo-cute.jpg"}`}
            alt="user img"
            className="w-[4.5rem] h-[4.5rem] rounded-full"
          />
          <div className=" text-2xl font-normal p-4 rounded-md relative bg-color-filter">
            <div className=" text-xl font-bold mb-4 text-white">Admin</div>
            Comment is already completed, like and reply feature will be
            updating in the future. This text is just for tesing!!!
            <div className="absolute bottom-0 left-[5%] w-[5rem] translate-y-[110%] ">
              <div className="flex items-center gap-6 text-xl font-bold ">
                <h3
                  className="cursor-pointer"
                  onClick={() => {
                    likeClick();
                  }}
                >
                  Like
                </h3>
                <h3
                  className="cursor-pointer"
                  onClick={() => {
                    likeClick();
                  }}
                >
                  Reply
                </h3>
                <h3>2022</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-20">
          {temp.map((el, index) => {
            return (
              <div key={index} className="flex items-center gap-4">
                <img
                  src={`${
                    user.photo.startsWith("https")
                      ? ""
                      : process.env.REACT_APP_IMG_USER + "/"
                  }${user.photo}`}
                  alt="user img"
                  className="w-[4.5rem] h-[4.5rem] rounded-full"
                />
                <div className=" text-2xl font-normal p-4 rounded-md relative bg-color-filter ">
                  <div className=" text-xl font-bold mb-4 text-white">
                    {user.firstname + " " + user.lastname}
                  </div>
                  {el.commentText}
                  <div className="absolute bottom-0 left-[5%] w-[5rem] translate-y-[110%] ">
                    <div className="flex items-center gap-6 text-xl font-bold ">
                      <h3
                        className="cursor-pointer"
                        onClick={() => {
                          likeClick();
                        }}
                      >
                        Like
                      </h3>
                      <h3
                        className="cursor-pointer"
                        onClick={() => {
                          likeClick();
                        }}
                      >
                        Reply
                      </h3>
                      <h3>{new Date().toISOString().slice(0, 4)}</h3>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {comments === undefined ? (
            <div className="w-[100%] h-[30rem] flex items-center">
              <Loading />
            </div>
          ) : (
            comments.map((el, index) => {
              return (
                <div key={index} className="flex items-center gap-4">
                  <img
                    src={`${
                      el.photo.startsWith("https")
                        ? ""
                        : process.env.REACT_APP_IMG_USER + "/"
                    }${el.photo}`}
                    alt="user img"
                    className="w-[4.5rem] h-[4.5rem] rounded-full"
                  />
                  <div className=" text-2xl font-normal p-4 rounded-md relative bg-color-filter">
                    <div className=" text-xl font-bold mb-4 text-white">
                      {el.firstname + " " + el.lastname}
                    </div>
                    {el.comment_text}
                    <div className="absolute bottom-0 left-[5%] w-[5rem] translate-y-[110%] ">
                      <div className="flex items-center gap-6 text-xl font-bold ">
                        <h3
                          className="cursor-pointer"
                          onClick={() => {
                            likeClick();
                          }}
                        >
                          Like
                        </h3>
                        <h3
                          className="cursor-pointer"
                          onClick={() => {
                            likeClick();
                          }}
                        >
                          Reply
                        </h3>
                        <h3>
                          {new Date(el.createdAt).toISOString().slice(0, 4)}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Comments;
