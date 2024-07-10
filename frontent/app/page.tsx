import getMovie from "./helper/get_movies";
import { Movie } from "./components/movie";

const Home = async () => {
  const movies = await getMovie();
  const data = movies.data;
  data.sort((a, b) => {
    if (a.vote_count === b.vote_count) {
      return b.vote_average - a.vote_average;
    }
    return b.vote_count - a.vote_count;
  });
  const top = data.slice(0, 10);
  const url = "https://image.tmdb.org/t/p/w500/";
  return (
    <main className="flex flex-wrap flex-row justify-center">
      <h1 className="text-3xl font-bold text-gray-900 p-5">Top 10 filmów</h1>
      <div className="movies flex flex-wrap flex-row justify-center">
        {top.map((movie, index) => {
          return (
            <Movie
              id={index}
              title={movie.title}
              overview={movie.overview}
              release_date={movie.release_date}
              vote_average={movie.vote_average}
              vote_count={movie.vote_count}
              keywords={movie.keywords.split(",")}
              poster_path={`${url}${movie.poster_path}`}
              genres={movie.genres}
            />
          );
        })}
      </div>
    </main>
  );
};
export default Home;
