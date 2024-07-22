import { createClient } from "../server";
import Movie from "../../types/movie";

 const fetchMovieTitle = async (title: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("movies")
      .select("*").eq('title', title);
  
    if (error) {
      console.error("Error fetching movies:", error);
      return [];
    }
  
    return data as Movie[];
  }
export default fetchMovieTitle