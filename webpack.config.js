const path = require('path');
const webpack = require('webpack');

module.exports = (env, argv) => {
  return {
    entry: {
      main: './views/public/js/main.js',
    },
    output: {
      filename: 'monitor.js',
      chunkFilename: 'monitor.[chunkhash].js',
      path: path.join(__dirname, './views/public/js')
    },
    devtool: 'sourcemap'
  };
};
