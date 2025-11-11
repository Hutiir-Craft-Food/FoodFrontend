module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    html: "<html lang='en'><div id='root'></div></html>",
  },
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
  coverageThreshold: {
    global: {
      lines: 30,
      statements: 30,
      branches: 40,
      functions: 50,
    },
  },
}

/**
 * more about jest configuration:
 * https://jestjs.io/docs/code-transformation
 * and about writing tests:
 * https://jestjs.io/docs/getting-started
 */
