import { Store } from "../core/heropy";
import dotenv from 'dotenv';

dotenv.config();

const store = new Store({
  searchText: '',
  page: 1,
  pageMax: 1,
  movies: [],
  loading: false
});

console.log(store.state);

export default store;
export const searchMovies = async page => {
  store.state.loading = true;
  store.state.page = page;
  if(page === 1) {
    store.state.movies = [];
  }
  // 영화 리스트 api 연결
  const res = await fetch(`${process.env.OMDb_API_KEY}s=${store.state.searchText}&page=${page}`);
  const { Search, totalResults } = await res.json();
  store.state.movies = [
    ...store.state.movies,
    ...Search
  ]
  store.state.pageMax = Math.ceil(Number(totalResults) / 10);
  store.state.loading = false;
}