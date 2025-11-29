// src/app/common/main.js

// === 1. ORTAK MODÜLLERİ İÇERİ AL ===
import { setupModal } from '../components/modal/modal.js';
import { setupTeamModal } from '../components/team-modal/team-modal.js';
import '../layout/mobile-nav/mobile-nav.js';
import './theme-toggle.js';

document.addEventListener('DOMContentLoaded', () => {
  // --- A. Ortak Bileşenleri Başlat ---
  const { openModal } = setupModal();
  window.openMovieModal = openModal;
  setupTeamModal();

  // --- B. Sayfa Yönlendirme (Routing) ---
  const path = window.location.pathname;
  let moduleName = null;
  let modulePath = null;

  if (path.includes('catalog.html')) {
    moduleName = 'catalog.js';
    modulePath = '../pages/catalog/catalog.js';
  } else if (path.includes('my-library.html')) {
    moduleName = 'my-library.js';
    modulePath = '../pages/my-library/my-library.js';
  } else if (path === '/' || path.endsWith('index.html')) {
    moduleName = 'index.js';
    modulePath = '../pages/home/index.js';
  }

  // --- C. Navbar Aktif Link Ayarı (EKLENEN KISIM) ---
  // Hangi sayfadaysak o linke 'active' sınıfını ekle
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.classList.remove('active'); // Önce hepsini temizle
    const href = link.getAttribute('href');

    // 1. Home Kontrolü (Ana sayfa veya index.html)
    if ((path === '/' || path.includes('index.html')) && href.includes('index.html')) {
      link.classList.add('active');
    }
    // 2. Catalog Kontrolü
    else if (path.includes('catalog') && href.includes('catalog')) {
      link.classList.add('active');
    }
    // 3. Library Kontrolü
    else if (path.includes('library') && href.includes('library')) {
      link.classList.add('active');
    }
  });

  // --- D. Modülü Yükle ---
  if (modulePath) {
    import(modulePath)
      .then(() => console.log(`${moduleName} yüklendi.`))
      .catch(err => console.error(`${moduleName} yüklenirken hata:`, err));
  }
});