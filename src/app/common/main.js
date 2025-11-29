// src/app/common/main.js

// Ortak modalleri ve temayı hazırla
import { setupModal } from '../components/modal/modal.js';
import { setupTeamModal } from '../components/team-modal/team-modal.js';
import '../layout/mobile-nav/mobile-nav.js';
import './theme-toggle.js';

document.addEventListener('DOMContentLoaded', () => {
  const { openModal } = setupModal();
  window.openMovieModal = openModal;
  setupTeamModal();

  // Sayfa türünü URL'e göre belirle (Pages alt yolu dâhil)
  const currentUrl = window.location.href;
  const path = window.location.pathname;
  const isCatalog = currentUrl.includes('catalog');
  const isLibrary = currentUrl.includes('my-library');
  const isHome =
    !isCatalog &&
    !isLibrary &&
    (currentUrl.endsWith('/') ||
      currentUrl.includes('index.html') ||
      path === '/' ||
      path === '/Cinemania-Project/' ||
      path === '/Cinemania-Project');

  const moduleLoaders = {
    home: () => import('../pages/home/index.js'),
    catalog: () => import('../pages/catalog/catalog.js'),
    library: () => import('../pages/my-library/my-library.js'),
  };

  // Navbar aktif linki işaretle
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href') || '';

    if (isHome && href.includes('index')) {
      link.classList.add('active');
    } else if (isCatalog && href.includes('catalog')) {
      link.classList.add('active');
    } else if (isLibrary && href.includes('library')) {
      link.classList.add('active');
    }
  });

  // Sayfa modülünü yükle
  const loader = isCatalog ? moduleLoaders.catalog : isLibrary ? moduleLoaders.library : isHome ? moduleLoaders.home : null;
  if (loader) {
    loader()
      .then(() => console.log('Sayfa modülü yüklendi.'))
      .catch(err => console.error('Sayfa modülü yüklenirken hata:', err));
  }
});
