import { useEffect, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import css from "./App.module.css";
import { getMovie } from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import type { Movie } from "../../types/movie";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import Paginate from "../Paginate/Paginate";

function App() {
  const [query, setQuery] = useState<string>("");
  const [selectMovie, setSelectMovie] = useState<Movie | null>(null);
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["movie", query, page],
    queryFn: () => getMovie(query, page),
    enabled: query !== "",
    placeholderData: keepPreviousData,
  });

  const handleSubmit = (query: string) => {
    setQuery(query);
    setPage(1);
  };

  useEffect(() => {
    if (!data) return;

    if (data.results.length === 0) {
      toast.error("No movies found for your request.");
    }
  }, [data]);

  const handleSelect = (movie: Movie | null) => {
    setSelectMovie(movie);
  };

  const totalPages = data?.total_pages ?? 0;

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isSuccess && data.results.length > 0 && (
        <Paginate total={totalPages} onChange={setPage} page={page} />
      )}
      {data && data.results.length > 0 && (
        <MovieGrid movies={data.results} onSelect={handleSelect} />
      )}
      {selectMovie && (
        <MovieModal movie={selectMovie} onClose={() => setSelectMovie(null)} />
      )}
      <Toaster />
    </div>
  );
}

export default App;
