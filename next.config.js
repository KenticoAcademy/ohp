const withTypescript = require('@zeit/next-typescript');

module.exports = withTypescript({
  // we can change the webpack here
  webpack(config, options) {
    return config;
  }
});
