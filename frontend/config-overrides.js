const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = function override(config, env) {
  // Add custom Babel configuration for your library
  config.module.rules.push({
    test: /\.(js|jsx)$/,
    include: path.resolve(__dirname, '../mylib/dist'),
    loader: require.resolve('babel-loader'),
    options: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
    },
  });

  // Add React Refresh for fast refresh during development
  if (env === 'development') {
    config.plugins.push(new ReactRefreshWebpackPlugin());
  }

  return config;
};