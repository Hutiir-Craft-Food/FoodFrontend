export default {
  verbose: true,
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    html: "<html lang='en'><div id='root'></div></html>",
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/src/(assets|icons)/',
  ],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
    '^.+\\.scss$': 'jest-scss-transform',
    '^.+\\.svg$': 'jest-transformer-svg',
  },
  moduleNameMapper: {
    '/src/(.*)': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/src/$1',
    // mocking all swiper/react stuff to avoid importing issues during unit tests
    '^swiper/react$': '<rootDir>/__mocks__/components/swiper/react.jsx',
    '^swiper/modules$': '<rootDir>/__mocks__/components/swiper/modules.js',
    '^swiper/css(/.*)?$': '<rootDir>/__mocks__/components/swiper/styles.js',
  },
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/src/(assets|icons)/',
  ],
  coverageThreshold: {
    global: {
      branches: 55.93, // TODO: increase to at least 40%
      functions: 50, // TODO: increase to at least 50%
      lines: 53.75,
      statements: 55.74,
    },
  },
}

/**
 * more about jest configuration:
 * https://jestjs.io/docs/code-transformation
 * and about writing tests:
 * https://jestjs.io/docs/getting-started
 */
