import axios from "axios";
import Movie from "@/app/types/movie";
import divideIntoParagraphs from "@/app/helper/divideIntoParagraphs";
import { getRecommendedMovie } from "@/app/helper/get_recometive";
import { Movie as MovieComponent } from "@/app/components/movie";

export default async function MoviePage(
  {
  params,
}: {
  params: { title: string };
}
) {
  const title = params.title;
  const res = await axios.get(`http://localhost:3000/api/movies/${title}`);
  if (res.status !== 200) {
    console.error(res);
    throw res;
  }
  const data: Movie = res.data.data[0];
 
  const recommendedMovies = await getRecommendedMovie(title);
  const url = "https://image.tmdb.org/t/p/w500/";
  const recommendsList = recommendedMovies?.map((movie, index) => {
    return (
      <MovieComponent
        key={index}
        id={index}
        title={movie.title}
        release_date={movie.release_date}
        vote_average={movie.vote_average}
        vote_count={movie.vote_count}
        poster_path={`${url}${movie.poster_path}`}
        genres={movie.genres}
      />
    );
  });
  const paragraphsString = divideIntoParagraphs(data.overview, 2)
  return (
    <div className="flex flex-col items-center p-5">
      <div className="card card-side shadow-xl bg-accent-color w-full max-w-4xl mb-10">
        <figure>
          <img
            src={`https://image.tmdb.org/t/p/w500/` + data.poster_path}
            alt={data.title}
          />
        </figure>
        <div className="card-body w-1/2 flex-wrap">
          <h2 className="card-title">{data.title}</h2>
          <h3>
            <strong>Orginalny tytuł:</strong> {data.original_title}
          </h3>
          <div>
            <p>Data wydania: {data.release_date}</p>
            <p>
              <strong>Popularność: </strong>
              {data.popularity}
            </p>
            <br />
            <p>
              <strong>Liczba ocen: </strong>
              {data.vote_count}
            </p>
            <p>
              <strong>Średnia ocena: </strong>
              {data.vote_average}
            </p>
          </div>
          <div className="justify-end max-w-lg">
            <h2 className="card-title">Opis filmu</h2>
            {paragraphsString}
          </div>
        </div>
      </div>
      <div className="w-full max-w-4xl">
        <h2 className="text-center text-2xl font-bold mb-4">Rekomendacje</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {recommendsList}
        </div>
      </div>
    </div>
  );
}
