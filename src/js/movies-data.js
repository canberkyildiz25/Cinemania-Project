// src/js/movies-data.js

const API_KEY = '362ee522f1af2dedac989b8df9cfb4eb';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500'; // Kartlar için
const IMG_ORIGINAL_URL = 'https://image.tmdb.org/t/p/original'; // Hero için

// Upcoming movies
export async function fetchUpcomingMovies() {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    return [];
  }
}

// Trending movies
export async function fetchTrendingMovies(timeWindow = 'week') {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/movie/${timeWindow}?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
}

// Movie details
export async function fetchMovieDetails(movieId) {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
}

// Movie videos
export async function fetchMovieVideos(movieId) {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching movie videos:', error);
    return [];
  }
}

// Image URL helpers
export function getImageUrl(path) {
  return path
    ? `${IMG_URL}${path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';
}

export function getOriginalImageUrl(path) {
  return path
    ? `${IMG_ORIGINAL_URL}${path}`
    : 'https://via.placeholder.com/1920x1080?text=No+Image';
}
