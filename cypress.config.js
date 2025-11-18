const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://app.grabdocs.com",
  },

  // VIDEO SETTINGS
  video: true,                    // Always record videos
  videosFolder: "cypress/videos", // Store them here
  trashAssetsBeforeRuns: false,   // KEEP previous videos, do NOT delete
  screenshotOnRunFailure: true,   // keep screenshots for debugging
});