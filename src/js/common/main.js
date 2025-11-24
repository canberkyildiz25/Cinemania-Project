// src/js/main.js

// === 1. ORTAK MODÜLLERİ İÇERİ AL ===
import { setupModal } from '../modal/modal.js';
import { setupTeamModal } from './team-modal.js';
import { initHeader } from '../header/header.js'; // <-- Header modülünü çağırdık
import '../header/mobile-nav.js';
import './theme-toggle.js';

document.addEventListener('DOMContentLoaded', () => {
  // --- A. Ortak Bileşenleri Başlat ---
  const { openModal } = setupModal();
  window.openMovieModal = openModal;
  
  setupTeamModal();
  initHeader(); // <-- Header active link ayarını çalıştır

  // --- B. Sayfa Yönlendirme (Routing) ---
  const path = window.location.pathname;
  let modulePath = null;

  if (path.includes('catalog.html')) {
    modulePath = '../catalog/catalog.js';
  } else if (path.includes('my-library.html')) {
    modulePath = '../my-library/my-library.js';
  } else if (path === '/' || path.endsWith('index.html')) {
    modulePath = '../home/index.js';
  }



  // --- C. Modülü Yükle ---
  if (modulePath) {
    import(modulePath)
      .then(() => console.log(`${modulePath} yüklendi.`))
      .catch(err => console.error(`${modulePath} yüklenirken hata:`, err));
  }
});