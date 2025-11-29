// src/app/components/team-modal/team-modal.js

export function setupTeamModal() {
  // Footer linkini seç (Birden fazla sayfada olabilir, sınıfına göre seçiyoruz)
  const openBtn = document.querySelector('.footer-link'); 
  const backdrop = document.getElementById('team-modal-backdrop');
  const closeBtn = document.getElementById('team-modal-close-btn');

  // Eğer elementler sayfada yoksa (örn. başka bir sayfadaysak) dur.
  if (!openBtn || !backdrop) return;

  function openModal(e) {
    e.preventDefault(); // Linkin yukarı atmasını engelle
    backdrop.classList.remove('is-hidden'); // Modalı göster
    document.body.classList.add('modal-open'); // Scrollu kilitle
    window.addEventListener('keydown', onEscKeyPress);
  }

  function closeModal() {
    backdrop.classList.add('is-hidden'); // Modalı gizle
    document.body.classList.remove('modal-open'); // Scrollu aç
    window.removeEventListener('keydown', onEscKeyPress);
  }

  function onEscKeyPress(e) {
    if (e.code === 'Escape') {
      closeModal();
    }
  }

  // Olay Dinleyicileri
  openBtn.addEventListener('click', openModal);
  
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });
}