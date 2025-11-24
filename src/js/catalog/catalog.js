// src/js/catalog.js
import {
  searchMovies,
  fetchPopularMovies,
} from '../modal/movies-data.js';
import { setupPagination } from '../common/pagination.js';
import { showLoader, hideLoader } from '../common/loader.js';
import { renderMovieCard, updateHeroWithMovie } from '../common/ui-helpers.js';

