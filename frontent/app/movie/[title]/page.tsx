import axios from "axios";
import Movie from "@/app/types/movie";

export default async function MoviePage({
  params,
}: {
  params: { title: string };
}) {
  const title = params.title;
  const res = await axios.get(`http://localhost:3000/api/movies/${title}`);
  if (res.status != 200) {
    console.error(res);
    throw res;
  }
  const data: Movie = res.data.data[0];
  return (
    <div className="flex justify-center items-center min-h-screen p-5">
      <div className="movie p-5 bg-white rounded-md shadow-lg">
        <div className="grid grid-rows-2 gap-5">
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] items-center gap-5 col-span-2">
            <img
              src={`https://image.tmdb.org/t/p/w500/` + data.poster_path}
              alt={data.title}
              className="max-w-full h-auto object-center rounded-md"
            />
            <div>
              <h3 className="text-3xl font-bold">{data.title}</h3>
              <h3 className="text-2xl font-bold">Orginalny tytuł: {data.original_title}</h3>
              <p>{data.genres}</p>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-md">
            <h4 className="text-xl font-semibold mb-2">Opis</h4>
            <p className="text-gray-700">{data.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
