import Image from "next/image";
import MovieAPI from "./types/movies_api";

const getMovie = async (): Promise<MovieAPI> => {
  const response = await fetch("http://localhost:3000/api/movies");
  return response.json();
};
const Home = async () => {
  const movies = await getMovie();
  const data = movies.data;
  data.sort((a, b) => b.vote_average - a.vote_average)
  // const top = 
  const url = "https://image.tmdb.org/t/p/w500/";
  return (
    <main>
      <h1>Hello World</h1>
    </main>
  );
};
export default Home;
