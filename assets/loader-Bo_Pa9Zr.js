function t(){if(document.getElementById("loader"))return;const e=document.createElement("div");e.id="loader",e.style.cssText=`
    position: fixed; inset: 0; background: rgba(0,0,0,0.7);
    display: flex; justify-content: center; align-items: center;
    z-index: 99999; color: white; font-size: 18px; flex-direction: column;
    backdrop-filter: blur(3px);
  `,e.innerHTML=`
    <div class="spinner" style="
      border: 6px solid #333; border-top: 6px solid var(--primary-orange, orange);
      border-radius: 50%; width: 60px; height: 60px; animation: spin 1s linear infinite; margin-bottom: 10px;
    "></div><p>Loading...</p>
    <style>@keyframes spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}</style>
  `,document.body.appendChild(e)}function n(){document.getElementById("loader")?.remove()}export{n as h,t as s};
//# sourceMappingURL=loader-Bo_Pa9Zr.js.map
