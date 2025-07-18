import axios from "axios";
import type { Movie } from "../types/movie";

interface MoviesHttpResponse {
  results: Movie[];
}

const myKey = import.meta.env.VITE_API_KEY;

export const getMovie = async (query: string): Promise<Movie[]> => {

  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        `Bearer ${myKey}`,
    },
  };

  const response = await axios.get<MoviesHttpResponse>(url, options);
  return response.data.results;
};


