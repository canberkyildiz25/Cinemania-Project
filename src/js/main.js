// src/js/main.js

// === 1. ORTAK MODÜLLERİ İÇERİ AL ===
import { setupModal } from './modal.js';
import { setupTeamModal } from './team-modal.js';
import { initHeader } from './header.js'; // <-- Header modülünü çağırdık
import './mobile-nav.js';
import './theme-toggle.js';

document.addEventListener('DOMContentLoaded', () => {
  // --- A. Ortak Bileşenleri Başlat ---
  const { openModal } = setupModal();
  window.openMovieModal = openModal;
  
  setupTeamModal();
  initHeader(); // <-- Header active link ayarını çalıştır

  // --- B. Sayfa Yönlendirme (Routing) ---
  const path = window.location.pathname;
  let moduleName = null;

  if (path.includes('catalog.html')) {
    moduleName = 'catalog.js';
  } else if (path.includes('my-library.html')) {
    moduleName = 'my-library.js';
  } else if (path === '/' || path.endsWith('index.html')) {
    moduleName = 'index.js';
  }



  // --- C. Modülü Yükle ---
  if (moduleName) {
    import(`./${moduleName}`)
      .then(() => console.log(`${moduleName} yüklendi.`))
      .catch(err => console.error(`${moduleName} yüklenirken hata:`, err));
  }
});