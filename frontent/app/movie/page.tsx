import getMovie from "../lib/get_movies";

const movie = async () => {
  const movies = await getMovie();
  const data = movies.data;
  data.sort((a, b) => {
    if (a.vote_count === b.vote_count) {
      return b.vote_average - a.vote_average;
    }
    return b.vote_count - a.vote_count;
  });
  const url = "https://image.tmdb.org/t/p/w500/";
  return (
    <main className="flex flex-wrap flex-row justify-center">
      <h2>Filmy</h2>
      {data.map((movie) => {
        const urls = `${url}${movie.poster_path}`;
        const keywords = movie.keywords.split(",");
        const keywords_p = keywords.map((key) => <span>{`${key}, `}</span>);
        return (
          <div
            key={movie.id}
            className="movie flex flex-col justify-center items-center
          w-1/4 
          bg-[var(--light-accent-color)] p-[10px_20px] m-[25px_10px] rounded-[15px]
          "
          >
            <h2>
              <strong>{movie.title}</strong>
            </h2>
            <img
              src={urls}
              alt=""
              className=" h-18 w-16 object-center p-[5px 10px]"
            />
            <div className="metadata pt-5">
              <span>
                <strong>Średnia ocen:</strong> {movie.vote_average}
              </span>
              <br />
              <span>
                <strong>Liczba ocen:</strong> {movie.vote_count}
              </span>
              <br />
              <span>
                <strong>Data wydania:</strong> {movie.release_date}
              </span>
              <br />
              <strong className="pt-20 pr-10">Słowa kluczowe: </strong>
              <br />
              {keywords_p}
            </div>
            <button
              className="
             bg-[var(--highlight-color)] 
             p-[10px_20px] 
            hover:bg-[var(--accent-color)] text-white font-bold rounded-full"
            >
              Czytaj więcej
            </button>
          </div>
        );
      })}
    </main>
  );
};
export default movie;
