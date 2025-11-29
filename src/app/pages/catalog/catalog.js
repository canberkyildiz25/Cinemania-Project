// src/app/pages/catalog/catalog.js
import {
  searchMovies,
  fetchPopularMovies,
} from '../../data/movies-data.js';
import { setupPagination } from '../../components/pagination/pagination.js';
import { showLoader, hideLoader } from '../../common/loader.js';
import { renderMovieCard, updateHeroWithMovie } from '../../common/ui-helpers.js';

const initCatalog = async () => {
  const form = document.getElementById('search-form');
  const input = document.getElementById('search-input');
  const movieGrid = document.getElementById('movie-grid');
  const paginationContainer = document.querySelector('.pagination');
  const heroSection = document.getElementById('catalog-hero');
  const heroContent = document.getElementById('catalog-hero-content');

  // --- YENİ DROPDOWN ELEMENTLERİ ---
  const dropdown = document.getElementById('year-dropdown');
  const dropdownHeader = document.getElementById('dropdown-header');
  const dropdownList = document.getElementById('dropdown-list');
  const selectedYearSpan = document.getElementById('selected-year');
  const yearInput = document.getElementById('year-input'); // Gizli input

  if (!movieGrid) return; // Katalog sayfasında değilsek dur

  // --- YILLARI LİSTEYE DOLDURMA ---
  const currentYear = new Date().getFullYear();

  if (dropdownList) {
    // 1. En başa "Year (All)" seçeneği ekle (Sıfırlamak için)
    const resetLi = document.createElement('li');
    resetLi.classList.add('dropdown-item'); // CSS'teki sınıf
    resetLi.textContent = "Year";
    
    resetLi.onclick = () => {
      if (yearInput) yearInput.value = ""; // Değeri temizle
      if (selectedYearSpan) {
        selectedYearSpan.textContent = "Year";
        selectedYearSpan.style.color = ""; // Rengi sıfırla
      }
      closeDropdown();
    };
    dropdownList.appendChild(resetLi);

    // 2. Yılları döngü ile ekle
    for (let y = currentYear; y >= 1950; y--) {
      const li = document.createElement('li');
      li.classList.add('dropdown-item'); // CSS'teki sınıf
      li.textContent = y;
      
      // Yıla tıklanınca ne olacak?
      li.onclick = () => {
        if (yearInput) yearInput.value = y; // Gizli inputa yaz
        if (selectedYearSpan) {
          selectedYearSpan.textContent = y; // Ekranda göster
          selectedYearSpan.style.color = "var(--primary-orange)"; // Seçili olduğunu belli et
        }
        closeDropdown();
      };
      
      dropdownList.appendChild(li);
    }
  }

  // --- DROPDOWN AÇMA / KAPAMA MANTIĞI ---
  function toggleDropdown() {
    if (dropdown) dropdown.classList.toggle('active'); // Ok işaretini döndürür
    if (dropdownList) dropdownList.classList.toggle('is-hidden'); // Listeyi açar/kapatır
  }

  function closeDropdown() {
    if (dropdown) dropdown.classList.remove('active');
    if (dropdownList) dropdownList.classList.add('is-hidden');
  }

  // Header'a tıklayınca aç/kapa
  if (dropdownHeader) {
    dropdownHeader.addEventListener('click', (e) => {
      e.stopPropagation(); // Tıklamanın sayfa geneline yayılmasını engelle
      toggleDropdown();
    });
  }

  // Sayfada boş yere tıklayınca kapat
  document.addEventListener('click', (e) => {
    if (dropdown && !dropdown.contains(e.target)) {
      closeDropdown();
    }
  });

  // --- DEĞİŞKENLER ---
  let currentPage = 1;
  let lastQuery = '';
  let lastYear = '';
  let totalPages = 1;

  // --- BAŞLANGIÇ FİLMLERİ ---
  async function loadInitialMovies() {
    showLoader();
    const data = await fetchPopularMovies(1);
    hideLoader();

    if (data?.results?.length) {
      renderMovies(data.results);
      if (data.results[0]) {
        await updateHeroWithMovie(data.results[0].id, heroSection, heroContent);
      }
    }
  }

  // --- ARAMA İŞLEMİ ---
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const query = input.value.trim();
      
      // DİKKAT: Artık select yok, gizli input'tan değeri alıyoruz
      const year = yearInput ? yearInput.value : ''; 

      if (!query) return;

      currentPage = 1;
      lastQuery = query;
      lastYear = year;
      
      // Arama yaparken dropdown açıksa kapatalım
      closeDropdown(); 
      
      await fetchAndRenderMovies(query, year, currentPage);
    });
  }

  async function fetchAndRenderMovies(query, year, page) {
    showLoader();
    const data = await searchMovies(query, page, year);
    hideLoader();

 if (!data?.results?.length) {
      // Görseldeki tasarıma uygun HTML yapısı
      movieGrid.innerHTML = `
        <div class="no-results-container">
          <h2 class="no-results-title">OOPS...</h2>
          <h3 class="no-results-text">We are very sorry!</h3>
          <h3 class="no-results-text">We don’t have any results matching your search.</h3>
        </div>
      `;
      paginationContainer.innerHTML = '';
      heroContent.innerHTML = '';
      heroSection.style.backgroundImage = 'none';
      return;
    }
    totalPages = data.total_pages;
    renderMovies(data.results);

    if (data.results[0]) {
      await updateHeroWithMovie(data.results[0].id, heroSection, heroContent);
    }

    setupPagination(paginationContainer, totalPages, page, (newPage) => {
      currentPage = newPage;
      fetchAndRenderMovies(lastQuery, lastYear, newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function renderMovies(list) {
    movieGrid.innerHTML = list.map((m) => renderMovieCard(m)).join('');
  }

  movieGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.movie-card');
    if (card && card.dataset.id) {
      updateHeroWithMovie(card.dataset.id, heroSection, heroContent);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  await loadInitialMovies();
};

initCatalog();