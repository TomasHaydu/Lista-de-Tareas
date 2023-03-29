import { defineConfig } from "cypress";

export default defineConfig({
  
  e2e: {
    baseUrl: "http://127.0.0.1:5173/",
    viewportWidth: 1200,
    viewportHeigth: 1200,
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
