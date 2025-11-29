// src/app/pages/my-library/my-library.js
import { fetchMovieDetails } from '../../data/movies-data.js';
import { renderMovieCard, updateHeroWithMovie } from '../../common/ui-helpers.js';

const initLibrary = async () => {
  const grid = document.getElementById('library-grid');
  const heroSection = document.getElementById('library-hero');
  const heroContent = document.getElementById('library-hero-content');
  const genreContainer = document.getElementById('genre-filter-container');
  const genreHeader = document.getElementById('genre-header');
  const genreTextSpan = document.getElementById('selected-genre-text');
  const genreList = document.getElementById('genre-list');
  const loadMoreContainer = document.getElementById('load-more-container');
  const loadMoreBtn = document.getElementById('load-more-btn');

  if (!grid) return;

  const storedIds = JSON.parse(localStorage.getItem('myLibrary') || '[]');
  const numericIds = (Array.isArray(storedIds) ? storedIds : [])
    .map((v) => Number(v))
    .filter((v) => Number.isFinite(v) && v > 0);

  if (!numericIds.length) {
    grid.innerHTML = `
      <div class="library-message">
        <p style="font-size: 24px; font-weight: 500; margin-bottom: 10px;">OOPS...</p>
        <p>Henüz bir film eklemediniz!</p>
        <a href="/catalog.html" class="btn btn-primary" style="margin-top:20px; display:inline-block;">Kataloğa Git</a>
      </div>`;
    if (genreContainer) genreContainer.style.display = 'none';
    if (loadMoreContainer) loadMoreContainer.classList.add('is-hidden');
    return;
  }

  const results = await Promise.allSettled(
    numericIds.map((id) => fetchMovieDetails(id))
  );

  const allMovies = [];
  const successfulIds = [];

  results.forEach((r, idx) => {
    const id = numericIds[idx];
    if (r.status === 'fulfilled' && r.value) {
      allMovies.push(r.value);
      successfulIds.push(id);
    }
  });

  localStorage.setItem('myLibrary', JSON.stringify(successfulIds));

  if (allMovies.length > 0) {
    await updateHeroWithMovie(allMovies[0].id, heroSection, heroContent);
  }

  // Tür Filtreleme
  const availableGenres = new Map();
  allMovies.forEach((movie) => {
    if (movie.genres) {
      movie.genres.forEach((g) => availableGenres.set(g.id, g.name));
    }
  });

  if (genreList) {
    const allItem = document.createElement('div');
    allItem.className = 'genre-item active';
    allItem.textContent = 'All Genres';
    allItem.dataset.id = 'all';
    genreList.appendChild(allItem);

    availableGenres.forEach((name, id) => {
      const item = document.createElement('div');
      item.className = 'genre-item';
      item.textContent = name;
      item.dataset.id = id;
      genreList.appendChild(item);
    });
  }

  if (genreHeader) {
    genreHeader.addEventListener('click', (e) => {
      e.stopPropagation();
      genreList.classList.toggle('is-hidden');
      genreContainer.classList.toggle('is-open');
    });
  }

  document.addEventListener('click', (e) => {
    if (genreContainer && !genreContainer.contains(e.target)) {
      genreList.classList.add('is-hidden');
      genreContainer.classList.remove('is-open');
    }
  });

  let currentGenreId = 'all';
  let filteredMovies = [...allMovies];

  if (genreList) {
    genreList.addEventListener('click', (e) => {
      if (e.target.classList.contains('genre-item')) {
        currentGenreId = e.target.dataset.id;
        const genreName = e.target.textContent;
        if (genreTextSpan) genreTextSpan.textContent = genreName === 'All Genres' ? 'Genre' : genreName;

        document.querySelectorAll('.genre-item').forEach((item) => item.classList.remove('active'));
        e.target.classList.add('active');
        genreList.classList.add('is-hidden');
        genreContainer.classList.remove('is-open');
        applyFilter();
      }
    });
  }

  let renderedCount = 0;
  const PER_PAGE = 6;

  function applyFilter() {
    if (currentGenreId === 'all') {
      filteredMovies = [...allMovies];
    } else {
      filteredMovies = allMovies.filter((m) =>
        m.genres.some((g) => g.id.toString() === currentGenreId.toString())
      );
    }

    renderedCount = 0;
    grid.innerHTML = '';

    if (filteredMovies.length === 0) {
      grid.innerHTML = `<div class="library-message">Bu türde film bulunamadı.</div>`;
      if (loadMoreContainer) loadMoreContainer.classList.add('is-hidden');
    } else {
      renderBatch();
    }
  }

  function renderBatch() {
    const nextBatch = filteredMovies.slice(renderedCount, renderedCount + PER_PAGE);
    const html = nextBatch.map((m) => renderMovieCard(m)).join('');
    grid.insertAdjacentHTML('beforeend', html);
    renderedCount += nextBatch.length;

    if (renderedCount >= filteredMovies.length) {
      if (loadMoreContainer) loadMoreContainer.classList.add('is-hidden');
    } else {
      if (loadMoreContainer) loadMoreContainer.classList.remove('is-hidden');
    }
  }

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', renderBatch);
  }

  renderBatch();

  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.movie-card');
    if (card && card.dataset.id) {
      updateHeroWithMovie(card.dataset.id, heroSection, heroContent);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
};

initLibrary();