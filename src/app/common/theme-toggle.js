// Tema (Açık/Koyu Mod) Değiştirici

document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle-checkbox');
  const body = document.body;

  if (!themeToggle) return; // Toggle butonu yoksa çalışma

  // 1. Sayfa yüklendiğinde hafızadaki temayı kontrol et
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'light') {
    body.classList.add('light-mode');
    themeToggle.checked = true; // Toggle'ı 'açık' konuma getir
  }
  // (Varsayılan 'dark' olduğu için else gerekmez)

  // 2. Toggle butonuna tıklandığında temayı değiştir
  themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
      // Açık Moda Geç
      body.classList.add('light-mode');
      localStorage.setItem('theme', 'light'); // Seçimi hafızaya kaydet
    } else {
      // Koyu Moda Geç
      body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark'); // Seçimi hafızaya kaydet
    }
  });
});