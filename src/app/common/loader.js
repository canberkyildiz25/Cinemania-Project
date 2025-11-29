export function showLoader() {
  if (document.getElementById('loader')) return;
  const loader = document.createElement('div');
  loader.id = 'loader';
  loader.style.cssText = `
    position: fixed; inset: 0; background: rgba(0,0,0,0.7);
    display: flex; justify-content: center; align-items: center;
    z-index: 99999; color: white; font-size: 18px; flex-direction: column;
    backdrop-filter: blur(3px);
  `;
  loader.innerHTML = `
    <div class="spinner" style="
      border: 6px solid #333; border-top: 6px solid var(--primary-orange, orange);
      border-radius: 50%; width: 60px; height: 60px; animation: spin 1s linear infinite; margin-bottom: 10px;
    "></div><p>Loading...</p>
    <style>@keyframes spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}</style>
  `;
  document.body.appendChild(loader);
}

export function hideLoader() {
  document.getElementById('loader')?.remove();
}