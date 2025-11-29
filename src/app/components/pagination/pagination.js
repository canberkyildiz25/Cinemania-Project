/**
 * Sayfalama (pagination) component'ini oluşturur ve DOM'a basar.
 * @param {HTMLElement} container - Butonların basılacağı div
 * @param {number} totalPages - Toplam sayfa sayısı
 * @param {number} currentPage - Aktif sayfa
 * @param {Function} onPageChange - Sayfa değiştiğinde çağrılacak fonksiyon (yeni sayfa numarasını alır)
 */
export function setupPagination(
  container,
  totalPages,
  currentPage,
  onPageChange
) {
  if (!container || totalPages <= 1) {
    if (container) container.innerHTML = ''; // Sayfalama gerekmiyorsa temizle
    return;
  }

  container.innerHTML = '';
  const maxButtons = 5; // Ekranda görünecek maks sayfa butonu

  // Hangi sayfa numarasından başlayacağını hesapla
  let start = Math.max(currentPage - 2, 1);
  let end = Math.min(start + maxButtons - 1, totalPages);

  // Eğer sona yaklaşıldıysa (örn. 50 sayfa varken 49. sayfadaysan),
  // 46, 47, 48, 49, 50 göstermek için başlangıcı ayarla
  if (end - start < maxButtons - 1) {
    start = Math.max(end - maxButtons + 1, 1);
  }

  // --- 1. Sol Ok (Geri) ---
  const prev = document.createElement('button');
  prev.className = 'pagination-arrow';
  prev.innerHTML = '&laquo;'; // «
  prev.disabled = currentPage === 1; // İlk sayfadaysa pasif
  prev.addEventListener('click', () => onPageChange(currentPage - 1));
  container.appendChild(prev);

  // --- 2. Sayfa Numaraları ---

  // Gerekirse '1 ...' ekle
  if (start > 1) {
    container.appendChild(createPageButton(1, onPageChange));
    if (start > 2) {
      container.appendChild(createDots());
    }
  }

  // Ana sayfa butonları (örn. 10, 11, 12, 13, 14)
  for (let i = start; i <= end; i++) {
    const btn = createPageButton(i, onPageChange, i === currentPage);
    container.appendChild(btn);
  }

  // Gerekirse '... 50' ekle
  if (end < totalPages) {
    if (end < totalPages - 1) {
      container.appendChild(createDots());
    }
    container.appendChild(createPageButton(totalPages, onPageChange));
  }

  // --- 3. Sağ Ok (İleri) ---
  const next = document.createElement('button');
  next.className = 'pagination-arrow';
  next.innerHTML = '&raquo;'; // »
  next.disabled = currentPage === totalPages; // Son sayfadaysa pasif
  next.addEventListener('click', () => onPageChange(currentPage + 1));
  container.appendChild(next);
}

// --- Yardımcı Fonksiyonlar (pagination.js için) ---

/**
 * Tıklanabilir bir sayfa butonu oluşturur
 * @private
 */
function createPageButton(page, onClick, isActive = false) {
  const btn = document.createElement('button');
  btn.className = 'pagination-btn';
  if (isActive) btn.classList.add('active');
  btn.textContent = page;
  btn.addEventListener('click', () => onClick(page));
  return btn;
}

/**
 * '...' elementini oluşturur
 * @private
 */
function createDots() {
  const dots = document.createElement('span');
  dots.className = 'pagination-dots';
  dots.textContent = '...';
  return dots;
}