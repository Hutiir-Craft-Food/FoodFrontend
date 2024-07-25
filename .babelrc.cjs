module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
}
/**
 * documentation about babel config for jest:
 * - https://babeljs.io/docs/config-files
 * - https://jestjs.io/docs/getting-started
 */
