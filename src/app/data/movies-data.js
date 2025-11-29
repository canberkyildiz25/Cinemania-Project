// src/app/data/movies-data.js

const API_KEY = '362ee522f1af2dedac989b8df9cfb4eb';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500'; // Kartlar için
const IMG_ORIGINAL_URL = 'https://image.tmdb.org/t/p/original'; // Hero için

/* === GENEL FETCH FONKSİYONU === */
async function fetchFromAPI(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append('api_key', API_KEY);
  url.searchParams.append('language', 'en-US'); // İstersen 'tr-TR' yapabilirsin

  for (const key in params) {
    if (params[key]) url.searchParams.append(key, params[key]);
  }

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('API Request Failed:', err);
    return null;
  }
}

/* === DIŞA AÇILAN FONKSİYONLAR === */

export async function fetchPopularMovies(page = 1) {
  return await fetchFromAPI('/movie/popular', { page });
}

export async function fetchTrendingMovies(period = 'week', page = 1) {
  return await fetchFromAPI(`/trending/movie/${period}`, { page });
}

export async function fetchUpcomingMovies(page = 1) {
  return await fetchFromAPI('/movie/upcoming', { page, region: 'US' });
}

export async function searchMovies(query, page = 1, year = '') {
  return await fetchFromAPI('/search/movie', {
    query,
    page,
    primary_release_year: year,
  });
}

export async function fetchMovieDetails(id) {
  return await fetchFromAPI(`/movie/${id}`);
}

export async function fetchMovieVideos(id) {
  return await fetchFromAPI(`/movie/${id}/videos`);
}

/* === GÖRSEL YARDIMCILARI === */
export function getImageUrl(path) {
  return path ? `${IMG_URL}${path}` : 'https://via.placeholder.com/500x750?text=No+Poster';
}

export function getOriginalImageUrl(path) {
  return path ? `${IMG_ORIGINAL_URL}${path}` : 'https://via.placeholder.com/1920x1080?text=No+Image';
}