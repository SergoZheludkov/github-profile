const webpack = require('webpack');
const { merge } = require('webpack-merge');

const common = require('./webpack.prod');
const paths = require('./paths');

const config = {
  mode: 'development',

  devtool: 'eval-cheap-source-map',

  plugins: [new webpack.HotModuleReplacementPlugin()],

  devServer: {
    historyApiFallback: true,
    contentBase: paths.bundle,
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
};

module.exports = merge(common, config);
