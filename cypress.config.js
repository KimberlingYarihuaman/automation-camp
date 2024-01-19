const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: "https://demoqa.com",
    specPattern: "./cypress/e2e/1st Month/**/*.spec.js",
  },
});
