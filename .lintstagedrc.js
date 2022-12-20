const config = {
  'apps/app/**/*.{js,jsx,ts,tsx}': (filenames) =>
    `pnpm lint:app --fix --lintFilePatterns=${filenames}`,
  'apps/app-e2e/**/*.{js,jsx,ts,tsx}': (filenames) =>
    `pnpm lint:app-e2e --fix --lintFilePatterns=${filenames}`,
};

module.exports = config;
