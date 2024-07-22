import GenreMovie from "./genremovie";

interface Movie {
    id: number;
    title: string;
    original_title: string;
    original_language: string;
    overview: string;
    popularity: number;
    release_date: string | null;
    vote_average: number;
    vote_count: number;
    keywords: string;
    poster_path: string;
    genres: string 
    moviegenres: GenreMovie[];
  }
export default Movie