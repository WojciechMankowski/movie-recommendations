import Movie from "@/app/types/movie";
const CompomnetMovie = (data: Movie) => (
  <div className="movie">
    <h3>{data.title}</h3>
    <img src="" alt="" />
    <div className="metadata">
      <span>Średnia ocen: {data.vote_average}</span>
      <span>Liczba ocen: {data.vote_count}</span>
    </div>
  </div>
);

export default CompomnetMovie;
