import getMovie from "../helper/get_movies";
import { Movie } from "../components/movie";

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
      <h2 className="text-3xl font-bold text-gray-900 p-5">Filmy</h2>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 px-10">
        {data.map((movie, index) => {
          return (
            <Movie
              id={index}
              title={movie.title}
              release_date={movie.release_date}
              vote_average={movie.vote_average}
              vote_count={movie.vote_count}
              poster_path={`${url}${movie.poster_path}`}
              genres={movie.genres}
            />
          );
        })}
      </div>
    </main>
  );
};
export default movie;
