// src/js/index.js
import { showLoader, hideLoader } from './loader.js';
import { fetchTrendingMovies, fetchUpcomingMovies } from './movies-data.js';
import {
  renderMovieCard,
  updateHeroWithMovie,
  renderUpcomingSection,
} from './ui-helpers.js';

// Initialize home page
async function initHomePage() {
  try {
    showLoader();

    // Fetch and render upcoming movie
    const upcomingMovies = await fetchUpcomingMovies();
    if (upcomingMovies && upcomingMovies.length > 0) {
      renderUpcomingSection(upcomingMovies[0]);
    }

    // Fetch and render trending movies
    const trendingMovies = await fetchTrendingMovies();
    console.log('Trending movies:', trendingMovies);

    hideLoader();
  } catch (error) {
    console.error('Error initializing home page:', error);
    hideLoader();
  }
}

// Run on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHomePage);
} else {
  initHomePage();
}
