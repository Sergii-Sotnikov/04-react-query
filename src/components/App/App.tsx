import { useState } from "react";
import css from "./App.module.css";
import { getMovie } from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import type { Movie } from "../../types/movie";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectMovie, setSelectMovie] = useState<Movie | null>(null);

  const handleSubmit = async (query: string) => {
    try {
      setIsLoading(true);
      setError(false);
      setMovies([]);
      const fetchedMovies = await getMovie(query);
      if (!fetchedMovies.length) {
        toast.error("No movies found for your request.");
        return;
      }
      setMovies(fetchedMovies);
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (movie: Movie | null) =>{
    setSelectMovie(movie)
  }

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {movies.length > 0 && <MovieGrid movies={movies} onSelect={handleSelect} />}
      {selectMovie && <MovieModal movie={selectMovie} onClose={()=>setSelectMovie(null)}/>}
      <Toaster />
    </div>
  );
}

export default App;
