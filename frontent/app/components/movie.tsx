import React from "react";
import Link from "next/link";
import { MovieProps } from "../types/props";

export const Movie: React.FC<MovieProps> = ({
  id,
  title,
  release_date,
  vote_average,
  vote_count,
  poster_path,
  genres,
}) => {
  const genresList: string[] = genres?.split(", ")
  genresList?.sort((a, b) => a.length - b.length);
  const genreElements = genresList?.map((item) => {
    if (item) {
      return (
        <p key={item} className="w-3/2 bg-secondary-color m-2 rounded-lg p-2  text-white">
          {item}
        </p>
      );
    }
  });

  return (
    <div key={id} className="w-full h-50 bg-gray-300 rounded-xl p-10 relative">
      <Link href={`/movie/${title}`}>
      <h2 className="text-4xl font-extrabold">
        {title}
      </h2>
      <img src={poster_path} alt="" className="h-30 w-30 object-center p-5" /> </Link>
      <div className="metadata pt-5">
        <p><strong>Średnia ocena:</strong> {vote_average}</p>
        <p><strong>Liczba ocen:</strong> {vote_count}</p>
        <p><strong>Data wydania:</strong> {release_date}</p>

        <div className="flex flex-wrap items-center justify-center flex-grow">
          {genreElements}
        </div>

       
      </div>
    </div>
  );
};