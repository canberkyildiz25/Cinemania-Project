import { defineConfig } from "vite";
import { glob } from "glob";
import injectHTML from "vite-plugin-html-inject";

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === "serve" ? "global" : "_global"]: {},
    },
    root: "src", // DİKKAT: Kök dizini 'src' olarak ayarladık
    build: {
      sourcemap: true,
      rollupOptions: {
        // src klasörü altındaki tüm html dosyalarını giriş noktası yap
        input: glob.sync("./src/*.html"),
        outDir: "../dist",
      },
    },
    plugins: [
      injectHTML(), // Bu eklenti <load> etiketlerini işler
    ],
  };
});