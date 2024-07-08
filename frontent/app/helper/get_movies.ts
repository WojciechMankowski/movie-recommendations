import axios from "axios";
import MovieAPI from "../types/movies_api";

const getMovie = async (): Promise<MovieAPI> => {
  const res = await axios.get("http://localhost:3000/api/movies");
  if (res.status != 200){
    console.error(res)
    throw res
  }
  return res.data;
};

export default getMovie