import { useEffect, useState } from "react";
import { getMovieList, searchMovie } from "./api";

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [film, setAdaFilm] = useState("");

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div
          key={i}
          className="w-full place-items-center p-4 border grid gap-2"
        >
          <h1 className="text-2xl">{movie.title}</h1>
          <img
            src={`${import.meta.env.VITE_REACT_APP_BASEIMGURL}/${
              movie.poster_path
            }`}
          />
          <h2>{movie.release_date}</h2>
          <h2 className="text-lg bg-amber-400 p-1 rounded-lg">
            {movie.vote_average.toFixed(1)}
          </h2>
          <p className="text-center">{movie.overview}</p>
        </div>
      );
    });
  };

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q);

      if (query.results.length === 0) {
        setAdaFilm("Tidak ada film bang");
        setPopularMovies([]);
      } else {
        setPopularMovies(query.results);
        setAdaFilm("");
      }
    }

    if (q.length == 0) {
      getMovieList().then((result) => {
        setPopularMovies(result);
        setAdaFilm("");
      });
    }
  };

  return (
    <section id="Movies" className="bg-slate-300 p-20">
      <div className="flex justify-center w-full mb-8 ">
        <h1 className="text-2xl">Danishian Films</h1>
      </div>

      <div className="w-full  grid gap-12    ">
        <div className="flex justify-center w-full">
          <input
            onChange={({ target }) => search(target.value)}
            type="text"
            placeholder="Film apa a?"
            className="px-4 py-2 w-1/3 bg-white rounded-lg border  "
          />
        </div>

        <div
          id="movies-container"
          className=" w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1   gap-4 native "
        >
          <h1 className=" absolute left-0 right-0 text-center">{film}</h1>
          <PopularMovieList />
        </div>
      </div>
    </section>
  );
};

export default App;
