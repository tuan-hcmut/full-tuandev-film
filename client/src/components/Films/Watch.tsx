import React from "react";

interface watchProps {
  type: string;
  id: number;
  seasons?: string;
  episode?: string;
}

const Watch: React.FC<watchProps> = ({ type, id, seasons, episode }) => {
  return (
    <>
      <div className="w-[100%] md:h-[65rem] h-[17rem] mt-10">
        <iframe
          className="w-[100%] h-[100%]"
          src={
            type === "movie"
              ? `https://www.2embed.to/embed/tmdb/movie?id=${id}`
              : `https://www.2embed.to/embed/tmdb/tv?id=${id}&s=${seasons}&e=${episode}`
          }
          frameBorder="0"
          title="film play"
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
};

export default Watch;
