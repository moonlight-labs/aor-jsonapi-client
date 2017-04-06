var path = require('path');
var webpack = require('webpack');
 
module.exports = {
  entry: './src/restClient.js',
  output: { path: __dirname, filename: 'jsonApiRestClient.js' },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "node_modules")
        ],
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};