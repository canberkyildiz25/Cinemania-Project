import "./styles/main.css";

async function loadPartials() {
  const loads = document.querySelectorAll("load");
  for (const el of loads) {
    const src = el.getAttribute("src");
    if (src) {
      try {
        const res = await fetch(src);
        if (res.ok) {
          const html = await res.text();
          const wrapper = document.createElement("div");
          wrapper.innerHTML = html;
          el.replaceWith(...wrapper.children);
        } else {
          console.error("Partial could not be loaded:", src);
        }
      } catch (err) {
        console.error("Error loading partial:", src, err);
      }
    }
  }
}

loadPartials().then(() => {
  import("./js/index.js");
});
