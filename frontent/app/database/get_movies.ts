import { createClient } from "./server";
import Movie from "../types/movie";

const fetchMovies = async (): Promise<Movie[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("movies")
    .select("*");

  if (error) {
    console.error("Error fetching movies:", error);
    return [];
  }

  return data as Movie[];
};


const fetchData = async (): Promise<Movie[]> => {
  const moviesData = await fetchMovies();
  return moviesData
};



export default fetchData;
