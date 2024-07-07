import { createClient } from "./server";
import Movie from "../types/movie";
import Genre from "../types/genre";

const fetchGenres = async (id: number): Promise<Genre[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("genres")
    .select("name")
    .eq("id", id);

  if (error) {
    console.error("Error fetching genres:", error);
    return [];
  }

  return data as Genre[];
};

const fetchMovies = async (): Promise<Movie[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("movies")
    .select("*, moviegenres(*)");

  if (error) {
    console.error("Error fetching movies:", error);
    return [];
  }

  return data as Movie[];
};

const setGenres = async (data: Movie): Promise<Movie> => {
  const data_movie = data.moviegenres;
  let genres: string = "";
  for (let i = 0; i < data_movie.length; i++) {
    const element = data_movie[i];
    const genreData = await fetchGenres(element.genre_id);
    if (genreData.length > 0) {
      genres += `${i === 0 ? "" : ", "}${genreData[0].name}`;
    }
  }
  data.genres = genres;
  return data;
};

const fetchData = async (): Promise<Movie[]> => {
  const moviesData = await fetchMovies();
  const moviesWithGenres = await Promise.all(
    moviesData.map((movie) => setGenres(movie))
  );
  return moviesWithGenres;
};

export default fetchData;
