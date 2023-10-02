module.exports = {
  collectCoverage: true,
  coverageReporters: ["json", "html", "text"],
  coverageThreshold: {
    global: {
      lines: 75,
    },
  },
};
