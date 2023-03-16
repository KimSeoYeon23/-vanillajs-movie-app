import { Store } from "../core/heropy";
import dotenv from 'dotenv';

dotenv.config();

interface SimpleMovie {
  Title: string;
  Year: string;
  imdbId: string;
  Type: string;
  Poster: string;
}

interface DetailedMovie {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: {
    Source: string
    Value: string
  }
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}

interface State {
  searchText: string;
  page: number;
  pageMax: number;
  movies: SimpleMovie[];
  movie: DetailedMovie;
  loading: boolean;
  message: string;
}

const store = new Store<State>({
  searchText: '',
  page: 1,
  pageMax: 1,
  movies: [],
  movie: {} as DetailedMovie,
  loading: false,
  message: 'Search for the movie title!',
});

console.log(store.state);

export default store;
export const searchMovies = async (page: number) => {
  store.state.loading = true;
  store.state.page = page;
  if(page === 1) {
    store.state.movies = [];
    store.state.message = '';
  }
  // 영화 리스트 api 연결
  try {
    // const res = await fetch(`https://www.omdbapi.com/?apikey=${process.env.OMDb_API_KEY}s=${store.state.searchText}&page=${page}`);
    const res = await fetch('/api/movie', {
      method: 'POST',
      body: JSON.stringify({
        title: store.state.searchText,
        page: page,
      })
    })
    const { Search, totalResults, Response, Error } = await res.json();
    if(Response === 'True') {
      store.state.movies = [
        ...store.state.movies,
        ...Search
      ]
      store.state.pageMax = Math.ceil(Number(totalResults) / 10);
    } else {
      store.state.message = Error;
    }
  } catch (error) {
    console.log('searchMovies error: ', error);
  } finally {
    store.state.loading = false;
  }
}
export const getMovieDetails = async (id: string) => {
  try {
    // const res = await fetch(`https://www.omdbapi.com/?apikey=${process.env.OMDb_API_KEY}i=${id}&plot=full`);
    const res = await fetch('/api/movie', {
      method: 'POST',
      body: JSON.stringify({
        id: id,
      })
    })
    store.state.movie = await res.json();
  } catch (error) {
    console.log('getMovieDetails error:', error);
  }
}