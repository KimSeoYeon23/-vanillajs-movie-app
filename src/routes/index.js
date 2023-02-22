import { createRouter } from "../core/heropy";
import Home from './Home';
import Movie from './Movie';
import About from './About';
import NotFount from './NotFound';

export default createRouter([
  { path: '#/', component: Home },
  { path: '#/movie', component: Movie },
  { path: '#/about', component: About },
  { path: '.*', component: NotFount }
]);