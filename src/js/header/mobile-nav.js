// LOGO İLE AÇILAN MOBİL MENÜ – SADE VERSİYON

document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".main-nav");
  const logo = document.querySelector(".logo");
  const openBtn = document.querySelector(".mobile-menu-btn"); // Bazı sayfalarda var
  let overlay = null;

  if (!nav || !logo) return;

  const isMobile = () => window.innerWidth <= 768;

  function openNav(e) {
    if (!isMobile()) return; // Desktop'ta çalışmasın
    if (e) e.preventDefault();

    // Overlay yoksa oluştur
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "mobile-overlay";
      overlay.addEventListener("click", closeNav);
      document.body.appendChild(overlay);
    }

    nav.classList.add("is-open");
    document.body.classList.add("menu-open");
  }

  function closeNav() {
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");

    if (overlay) {
      overlay.removeEventListener("click", closeNav);
      overlay.remove();
      overlay = null;
    }
  }

  // Menü içi X butonu yoksa ekle
  let closeBtn = nav.querySelector(".mobile-nav-close");
  if (!closeBtn) {
    closeBtn = document.createElement("button");
    closeBtn.type = "button";
    
    closeBtn.className = "mobile-nav-close";
    closeBtn.innerHTML = "&times;";
    nav.appendChild(closeBtn);
  }
  closeBtn.addEventListener("click", closeNav);

  // LOGO'ya tıklayınca menü aç
  logo.addEventListener("click", openNav);

  // (Bazı sayfalarda varsa) hamburger butonu da açsın
  if (openBtn) {
    openBtn.addEventListener("click", openNav);
  }

  // Menüdeki linklere tıklayınca menü kapansın
  nav.querySelectorAll("a.nav-link").forEach(link => {
    link.addEventListener("click", closeNav);
  });

  // Ekran genişlerse (desktop'a geçince) menüyü kapat
  window.addEventListener("resize", () => {
    if (!isMobile()) {
      closeNav();
    }
  });
});
