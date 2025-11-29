import { defineConfig } from "vite";
import { glob } from "glob";
import injectHTML from "vite-plugin-html-inject";

export default defineConfig(({ command }) => {
  return {
    base: "/Cinemania-Project/", // ⭐ GitHub Pages için eklendi
    define: {
      [command === "serve" ? "global" : "_global"]: {},
    },
    root: "src", // Projenin kökü src klasörün
    build: {
      sourcemap: true,
      rollupOptions: {
        // src içindeki tüm HTML dosyalarını giriş sayfası yap
        input: glob.sync("./src/*.html"),
        outDir: "../dist", // dist klasörü üst dizine gider
      },
    },
    plugins: [
      injectHTML(), // <load> etiketlerini işler
    ],
  };
});
