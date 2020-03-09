const path = require('path');
module.exports = {
  mode: 'development',
  entry: './src/script.js',
  output: {
    filename: 'main.js',
    publicPath: 'dist'
  }
};