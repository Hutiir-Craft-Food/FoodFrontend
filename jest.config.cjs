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
}

/**
 * more about jest configuration:
 * https://jestjs.io/docs/code-transformation
 * and about writing tests:
 * https://jestjs.io/docs/getting-started
 */
