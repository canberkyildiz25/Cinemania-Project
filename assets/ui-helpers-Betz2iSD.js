import{c as w,g,d as k,e as $}from"./main-Bn_Jp4Ge.js";function L(e){const a=document.getElementById("trailer-modal-backdrop");if(!a)return;const r=document.getElementById("trailer-iframe"),t=document.getElementById("trailer-modal-close-btn");r&&(r.src=`https://www.youtube.com/embed/${e}?autoplay=1&rel=0&showinfo=0`),a.classList.remove("is-hidden"),document.body.classList.add("modal-open"),t&&(t.onclick=()=>y()),a.onclick=i=>{i.target===a&&y()};const s=i=>{i.key==="Escape"&&(y(),window.removeEventListener("keydown",s))};window.addEventListener("keydown",s)}function y(){const e=document.getElementById("trailer-modal-backdrop"),a=document.getElementById("trailer-iframe");e&&(e.classList.add("is-hidden"),document.body.classList.remove("modal-open"),a&&(a.src=""))}function b(){const e=document.getElementById("trailer-error-backdrop");if(!e)return;const a=document.getElementById("trailer-error-close-btn");e.classList.remove("is-hidden"),document.body.classList.add("modal-open");const r=()=>{e.classList.add("is-hidden"),document.body.classList.remove("modal-open"),window.removeEventListener("keydown",t)};a&&(a.onclick=r),e.onclick=s=>{s.target===e&&r()};const t=s=>{s.key==="Escape"&&r()};window.addEventListener("keydown",t)}function f(e){if(!e)return"N/A";if(Array.isArray(e)&&e.length>0&&typeof e[0]=="object")return e.map(r=>r.name).slice(0,2).join(", ");const a={28:"Action",12:"Adventure",16:"Animation",35:"Comedy",80:"Crime",99:"Documentary",18:"Drama",10751:"Family",14:"Fantasy",36:"History",27:"Horror",10402:"Music",9648:"Mystery",10749:"Romance",878:"Sci-Fi",10770:"TV Movie",53:"Thriller",10752:"War",37:"Western"};return Array.isArray(e)?e.map(t=>a[t]).filter(Boolean).slice(0,2).join(", ")||"Other":"N/A"}function h(e){const a=Math.round((e||0)/2);let r="";for(let t=1;t<=5;t++)r+=`<i class="fa-star ${t<=a?"fas active":"far"}"></i>`;return r}function A(e){const a=e.genres||e.genre_ids,r=e.release_date?new Date(e.release_date).getFullYear():"N/A";return`
    <div class="movie-card" data-id="${e.id}">
        <img src="${$(e.poster_path)}" alt="${e.title}" class="movie-card-poster" loading="lazy">
        <div class="movie-card-overlay">
            <h3 class="movie-title">${e.title}</h3>
            <div class="movie-meta">
                <span class="movie-genre">${f(a)} | ${r}</span>
                <div class="movie-rating">${h(e.vote_average)}</div>
            </div>
        </div>
    </div>
  `}async function E(e,a,r){if(!(!a||!r))try{const t=await w(e);if(!t)return;const s=g(t.backdrop_path||t.poster_path);a.style.backgroundImage=`
      linear-gradient(to right, 
        #111 0%, 
        rgba(17, 17, 17, 1) 30%, 
        rgba(17, 17, 17, 0.5) 50%, 
        transparent 100%),
      url('${s}')
    `,r.innerHTML=`
      <h1 class="hero-title">${t.title}</h1>
      <div class="star-rating hero-stars">
        ${h(t.vote_average)}
      </div>
      <p class="hero-description">${t.overview||"No description available."}</p>
      <div class="hero-buttons">
        <button class="btn btn-primary" id="hero-watch-trailer" data-id="${t.id}">Watch Trailer</button>
        <button class="btn btn-secondary" id="hero-details-btn" data-id="${t.id}">More details</button>
      </div>
    `;const i=r.querySelector("#hero-watch-trailer");i&&(i.onclick=async o=>{o.preventDefault();const l=o.target.dataset.id;try{const c=(await k(l))?.results?.find(n=>n.type==="Trailer"&&n.site==="YouTube");c?L(c.key):b()}catch(u){console.error(u),b()}});const d=r.querySelector("#hero-details-btn");d&&(d.onclick=o=>{o.preventDefault();const l=o.target.dataset.id;window.openMovieModal&&window.openMovieModal(l)})}catch(t){console.error("Hero update error:",t)}}function _(e,a){if(!e||!a)return;const r=new Date(e.release_date).toLocaleDateString("en-US"),t=e.vote_average?e.vote_average.toFixed(1):"N.A",s=e.vote_count||0,i=e.popularity?e.popularity.toFixed(1):"N.A",d=f(e.genre_ids),o=g(e.backdrop_path||e.poster_path),c=(JSON.parse(localStorage.getItem("myLibrary"))||[]).includes(Number(e.id))?"Remove from my library":"Add to my library";a.innerHTML=`
    <div class="upcoming-image">
      <img src="${o}" alt="${e.title}" loading="lazy" />
    </div>
    <div class="upcoming-info">
      <h3>${e.title}</h3>
      <div class="movie-details-list">
        <div class="detail-item">
          <span class="detail-key">Release date</span>
          <span class="detail-history">${r}</span>
        </div>
        <div class="detail-item">
          <span class="detail-key">Vote / Votes</span>
          <span class="detail-value">
            <span class="rating-badge">${t}</span> / ${s}
          </span>
        </div>
        <div class="detail-item">
          <span class="detail-key">Popularity</span>
          <span class="detail-value">${i}</span>
        </div>
        <div class="detail-item">
          <span class="detail-key">Genre</span>
          <span class="detail-value">${d}</span>
        </div>
      </div>
      <h4>ABOUT</h4>
      <p class="about-text">${e.overview||"No description available."}</p>
      <button class="btn btn-primary btn-add-library" id="upcoming-add-btn" data-id="${e.id}">
        ${c}
      </button>
    </div>
  `;const n=a.querySelector("#upcoming-add-btn");n&&(n.onclick=()=>{const p=JSON.parse(localStorage.getItem("myLibrary"))||[],m=Number(n.dataset.id),v=p.indexOf(m);v>-1?(p.splice(v,1),n.textContent="Add to my library"):(p.push(m),n.textContent="Remove from my library"),localStorage.setItem("myLibrary",JSON.stringify(p))})}export{_ as a,A as r,E as u};
//# sourceMappingURL=ui-helpers-Betz2iSD.js.map
