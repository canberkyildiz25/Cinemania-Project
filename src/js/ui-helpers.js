// src/js/ui-helpers.js

import {
  fetchMovieDetails,
  fetchMovieVideos,
  getImageUrl,
  getOriginalImageUrl,
} from './movies-data.js';
import { openTrailerModal, openTrailerErrorModal } from './trailer-modal.js';

// Render upcoming section
export function renderUpcomingSection(movie) {
  if (!movie) return;

  const posterImg = document.getElementById('movie-poster');
  const titleEl = document.getElementById('movie-title');
  const releaseDateEl = document.getElementById('release-date');
  const voteAverageEl = document.getElementById('vote-average');
  const voteCountEl = document.getElementById('vote-count');
  const popularityEl = document.getElementById('popularity');
  const genresEl = document.getElementById('genres');
  const overviewEl = document.getElementById('overview');

  if (posterImg) posterImg.src = getImageUrl(movie.poster_path);
  if (titleEl) titleEl.textContent = movie.title;
  if (releaseDateEl)
    releaseDateEl.textContent = new Date(movie.release_date).toLocaleDateString(
      'en-US'
    );
  if (voteAverageEl) voteAverageEl.textContent = movie.vote_average.toFixed(1);
  if (voteCountEl) voteCountEl.textContent = movie.vote_count;
  if (popularityEl) popularityEl.textContent = movie.popularity.toFixed(1);
  if (genresEl && movie.genre_ids) {
    // Genre mapping (add more as needed)
    const genreMap = {
      28: 'Action',
      12: 'Adventure',
      16: 'Animation',
      35: 'Comedy',
      80: 'Crime',
      99: 'Documentary',
      18: 'Drama',
      10751: 'Family',
      14: 'Fantasy',
      36: 'History',
      27: 'Horror',
      10402: 'Music',
      9648: 'Mystery',
      10749: 'Romance',
      878: 'Sci-Fi',
      10770: 'TV Movie',
      53: 'Thriller',
      10752: 'War',
      37: 'Western',
    };
    const genres = movie.genre_ids
      .map(id => genreMap[id] || '')
      .filter(Boolean)
      .join(', ');
    genresEl.textContent = genres || 'N/A';
  }
  if (overviewEl)
    overviewEl.textContent = movie.overview || 'No overview available.';
}

// Render movie card
export function renderMovieCard(movie) {
  // Card rendering logic here
  console.log('Rendering movie card:', movie);
}

// Update hero with movie
export function updateHeroWithMovie(movie) {
  // Hero update logic here
  console.log('Updating hero with movie:', movie);
}
