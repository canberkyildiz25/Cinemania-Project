// Gerekli modülleri import et
import { fetchMovieVideos } from '../../data/movies-data.js';

// === 1. TRAILER MODALINI AÇ (BAŞARILI) ===
/**
 * YouTube videosunu modal içinde açar.
 * @param {string} videoKey - YouTube video ID'si (örn. "dQw4w9WgXcQ")
 */
export function openTrailerModal(videoKey) {
  const backdrop = document.getElementById('trailer-modal-backdrop');
  if (!backdrop) return;

  const iframe = document.getElementById('trailer-iframe');
  const closeBtn = document.getElementById('trailer-modal-close-btn');

  // Iframe'e YouTube linkini (otomatik oynatmalı) bas
  if (iframe) {
    iframe.src = `https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0&showinfo=0`;
  }

  backdrop.classList.remove('is-hidden');
  document.body.classList.add('modal-open'); // Arkaplan kaydırmayı durdur

  // Kapatma olayları
  if (closeBtn) closeBtn.onclick = () => closeTrailerModal();
  backdrop.onclick = (e) => {
    if (e.target === backdrop) closeTrailerModal();
  };
  const onEsc = (e) => {
    if (e.key === 'Escape') {
      closeTrailerModal(); // Fonksiyonu çağır
      window.removeEventListener('keydown', onEsc); // Dinleyiciyi kaldır
    }
  };
  window.addEventListener('keydown', onEsc);
}

// === 2. TRAILER MODALINI KAPAT ===
export function closeTrailerModal() {
  const backdrop = document.getElementById('trailer-modal-backdrop');
  const iframe = document.getElementById('trailer-iframe');
  if (!backdrop) return;

  backdrop.classList.add('is-hidden');
  document.body.classList.remove('modal-open'); // Kaydırmayı aç
  // Iframe'in src'sini temizle (video arka planda oynamasın)
  if (iframe) iframe.src = '';
}

// === 3. "WATCH TRAILER" TIKLAMA YÖNETİCİSİ ===
/**
 * Bir film ID'si alır, trailer'ı arar ve ilgili modalı açar.
 * (ui-helpers.js tarafından çağrılır)
 * @param {number|string} movieId - Film ID'si
 */
export async function onWatchTrailerClick(movieId) {
  try {
    const data = await fetchMovieVideos(movieId);
    // Videoları ara: Tipi "Trailer" ve sitesi "YouTube" olanı bul
    const trailer = data?.results?.find(
      (v) => v.type === 'Trailer' && v.site === 'YouTube'
    );

    if (trailer && trailer.key) {
      openTrailerModal(trailer.key); // Bulunduysa aç
    } else {
      openTrailerErrorModal(); // Bulunamadıysa hata modalını aç
    }
  } catch (error) {
    console.error('Fragman aranırken hata:', error);
    openTrailerErrorModal(); // API hatası olursa hata modalını aç
  }
}

// === 4. TRAILER HATA MODALINI AÇ ===
export function openTrailerErrorModal() {
  const backdrop = document.getElementById('trailer-error-backdrop');
  if (!backdrop) return;

  const closeBtn = document.getElementById('trailer-error-close-btn');
  backdrop.classList.remove('is-hidden');
  document.body.classList.add('modal-open');

  // Kapatma fonksiyonu (bu modal için özel)
  const closeErrorModal = () => {
    backdrop.classList.add('is-hidden');
    document.body.classList.remove('modal-open');
    window.removeEventListener('keydown', onEsc);
  };

  // Kapatma olayları
  if (closeBtn) closeBtn.onclick = closeErrorModal;
  backdrop.onclick = (e) => {
    if (e.target === backdrop) closeErrorModal();
  };
  const onEsc = (e) => {
    if (e.key === 'Escape') closeErrorModal();
  };
  window.addEventListener('keydown', onEsc);
}