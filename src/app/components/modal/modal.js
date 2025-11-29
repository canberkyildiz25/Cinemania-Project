// Gerekli modülleri import et
import { fetchMovieDetails, getImageUrl } from '../../data/movies-data.js';

/**
 * Film detay modalının tüm işlevselliğini ayarlar.
 * @returns { {openModal: Function, closeModal: Function} }
 */
export function setupModal() {
  // === 1. DOM ELEMENTLERİNİ SEÇ ===
  const backdrop = document.querySelector('#movie-modal-backdrop');

  // Modal bulunamazsa hata ver ve boş fonksiyonlar döndür
  if (!backdrop) {
    console.error("Modal backdrop '#movie-modal-backdrop' not found.");
    return { openModal: () => {}, closeModal: () => {} };
  }

  const closeBtn = backdrop.querySelector('#modal-close-btn');
  const poster = backdrop.querySelector('#modal-poster');
  const title = backdrop.querySelector('#modal-title');
  const voteAvg = backdrop.querySelector('#modal-vote-avg');
  const voteCount = backdrop.querySelector('#modal-vote-count');
  const popularity = backdrop.querySelector('#modal-popularity');
  const genre = backdrop.querySelector('#modal-genre');
  const description = backdrop.querySelector('#modal-description');
  const addBtn = backdrop.querySelector('#modal-add-btn');

  // === 2. LOCALSTORAGE YARDIMCI FONKSİYONLARI ===
  function getLibrary() {
    return JSON.parse(localStorage.getItem('myLibrary')) || [];
  }

  function saveLibrary(list) {
    localStorage.setItem('myLibrary', JSON.stringify(list));
  }

  // === 3. MODAL AÇMA FONKSİYONU ===
  async function openModal(movieId) {
    // API'den film detaylarını çek
    const movie = await fetchMovieDetails(movieId);
    if (!movie) return; // Film bulunamazsa açma

    // Modal içini film bilgileriyle doldur
    if (poster) poster.src = getImageUrl(movie.poster_path);
    if (title) title.textContent = movie.title.toUpperCase();
    if (voteAvg) voteAvg.textContent = movie.vote_average.toFixed(1);
    if (voteCount) voteCount.textContent = movie.vote_count; // HTML'deki '/' ayracı sabit
    if (popularity) popularity.textContent = movie.popularity.toFixed(1);
    if (genre) {
      genre.textContent = movie.genres.map((g) => g.name).join(', ') || 'N/A';
    }
    if (description)
      description.textContent = movie.overview || 'No description available.';

    // Kütüphane butonunu ayarla
    if (addBtn) {
      const library = getLibrary();
      const numericMovieId = Number(movie.id); // ID'yi sayıya çevir

      // Film kütüphanede mi?
      addBtn.textContent = library.includes(numericMovieId)
        ? 'Remove from my library' // Varsa
        : 'Add to my library'; // Yoksa
      addBtn.dataset.id = numericMovieId; // Butona film ID'sini ekle
    }

    // Modal'ı görünür yap
    backdrop.classList.remove('is-hidden');
    document.body.classList.add('modal-open'); // Arkaplan kaydırmayı durdur
  }

  // === 4. MODAL KAPATMA FONKSİYONU ===
  function closeModal() {
    backdrop.classList.add('is-hidden');
    document.body.classList.remove('modal-open'); // Kaydırmayı tekrar aç
  }

  // === 5. OLAY DİNLEYİCİLERİ (EVENT LISTENERS) ===

  // Kapatma (X) butonu
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Backdrop'a (dışarıya) tıklayınca kapat
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      closeModal();
    }
  });

  // ESC tuşu ile kapat
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !backdrop.classList.contains('is-hidden')) {
      closeModal();
    }
  });

  // "Add to my library" butonu
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const id = Number(addBtn.dataset.id);
      if (!id) return;

      const library = getLibrary();
      const idx = library.indexOf(id); // Filmin kütüphanedeki index'i

      if (idx > -1) {
        // Film varsa: çıkar
        library.splice(idx, 1);
        addBtn.textContent = 'Add to my library';
      } else {
        // Film yoksa: ekle
        library.push(id);
        addBtn.textContent = 'Remove from my library';
      }
      saveLibrary(library); // Değişikliği kaydet

      // Not: Kütüphaneye ekledikten sonra yönlendirme kodu kaldırıldı.
      // Bu, kullanıcının modalı kapatmadan başka filmlere bakmasına olanak tanır.
      // Yönlendirme istenirse buraya eklenebilir.
    });
  }

  // Dışarıya açılan fonksiyonları döndür
  return { openModal, closeModal };
}