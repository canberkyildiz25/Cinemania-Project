// src/js/header.js

/**
 * Header navigasyon linklerinin 'active' durumunu yönetir.
 * Sayfa URL'ine bakarak hangi menü elemanının seçili olduğunu belirler.
 */
export function initHeader() {
  const path = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.classList.remove('active'); // Önce temizle
    const href = link.getAttribute('href');

    // Eğer href null ise (örneğin yanlış yapılandırılmışsa) atla
    if (!href) return;

    // 1. Home Kontrolü (Ana sayfa veya index.html)
    // path '/' ise veya 'index.html' ile bitiyorsa
    if ((path === '/' || path.endsWith('index.html')) && href.includes('index.html')) {
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
}