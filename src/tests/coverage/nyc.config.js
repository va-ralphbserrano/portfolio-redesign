module.exports = {
  extends: "@istanbuljs/nyc-config-typescript",
  all: true,
  "check-coverage": true,
  include: [
    "src/**/*.ts",
    "src/**/*.tsx"
  ],
  exclude: [
    "**/*.d.ts",
    "**/*.test.ts",
    "**/*.test.tsx",
    "src/tests/**/*",
    "src/types/**/*",
    "coverage/**/*"
  ],
  reporter: [
    "text",
    "html",
    "json",
    "lcov"
  ],
  statements: 85,
  branches: 80,
  functions: 90,
  lines: 85,
  "report-dir": "./coverage",
  "temp-dir": "./coverage/.nyc_output",
  "skip-full": true,
  "skip-empty": true
}
