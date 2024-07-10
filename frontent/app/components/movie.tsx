import React from "react";
import Link from "next/link";
type MovieProps = {
  id: number;
  title: string;
  overview: string;
  release_date: string | null;
  vote_average: number;
  vote_count: number;
  keywords: string[];
  poster_path: string;
  genres: string | null;
};

export const Movie: React.FC<MovieProps> = ({
  id,
  title,
  overview,
  release_date,
  vote_average,
  vote_count,
  keywords,
  poster_path,
  genres,
}) => {
  const keywords_p = keywords.map((key) => <span>{`${key}, `}</span>);
  return (
    <div
      key={id}
      className="movie flex flex-col justify-center items-center
          w-1/4 
          bg-[var(--light-accent-color)] p-[10px_20px] m-[25px_10px] rounded-[15px]
          "
    >
      <h2>
        <strong>{title}</strong>
      </h2>
      <img
        src={poster_path}
        alt=""
        className=" h-18 w-16 object-center p-[5px 10px]"
      />
      <div className="metadata pt-5">
        <span>
          <strong>Średnia ocen:</strong> {vote_average}
        </span>
        <br />
        <span>
          <strong>Liczba ocen:</strong> {vote_count}
        </span>
        <br />
        <span>
          <strong>Data wydania:</strong> {release_date}
        </span>
        <br />
        <strong className="pt-20 pr-10">Słowa kluczowe: </strong>
        <br />
        {keywords_p}
      </div>
      <button
        className="
            bg-secondary-color
             p-[10px_20px] 
            hover:bg-[var(--accent-color)] text-white font-bold rounded-full"
      >
        <Link href={`/movie/${title}`}> Czytaj więcej</Link>
      </button>
    </div>
  );
};
 