const importIf = (selectorOrTestFn, importer) => {
  const ok =
    typeof selectorOrTestFn === "function"
      ? selectorOrTestFn()
      : !!document.querySelector(selectorOrTestFn);
  return ok ? importer() : Promise.resolve();
};

async function boot() {
  await Promise.all([
    importIf("header, .header, #header", () =>
      import("../components/header/header.js")
    ),
    importIf("footer, .footer, #footer", () =>
      import("../components/footer/footer.js")
    ),
    importIf("#hero, .hero", () => import("../components/hero/hero.js")),
    importIf("#loading-indicator, .loading-indicator", () =>
      import("../components/loader/loader.js")
    ),
    importIf("#app-modal-template", () =>
      import("../components/modal/modal.js")
    ),
    importIf("#movies-ul, .movie-list-grid", () =>
      import("../pages/catalog/catalog.js")
    ),
    importIf("#pagination-ul, .pagination", () =>
      import("../components/pagination/pagination.js")
    ),
    importIf("#catalog-search-form, .search-container", () =>
      import("../components/searchbar/searchbar.js")
    ),
    importIf(".weekly__gallery", () =>
      import("../components/weekly/weekly.js")
    ),
    importIf(".upcoming-section, #upcoming", () =>
      import("../components/upcoming/upcoming.js")
    ),
    importIf("#library, .library container", () =>
      import("../pages/library/library.js")
    ),
    importIf("#scroll-up, .button-up", () =>
      import("../components/scrollup/scrollup.js")
    ),
  ]);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
