import { Store } from "../core/heropy";
import dotenv from 'dotenv';

dotenv.config();

const store = new Store({
  searchText: '',
  page: 1,
  movies: []
});

console.log(store.state);

export default store;
export const searchMovies = async page => {
  if(page === 1) {
    store.state.page = 1;
    store.state.movies = [];
  }
  const res = await fetch(`${process.env.OMDb_API_KEY}s=${store.state.searchText}&page=${page}`);
  const { Search } = await res.json();
  store.state.movies = [
    ...store.state.movies,
    ...Search
  ]
}