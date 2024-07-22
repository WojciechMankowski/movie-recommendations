import axios from "axios";
import Movie from "../types/movie";

export const getRecommendedMovie = async (title: string): Promise<Movie[] | null> => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/${title}`);
        return response.data as Movie[];
    } catch (error) {
        console.error(`Error fetching recommended movie for title "${title}":`, error);
        return null;
    }
};
