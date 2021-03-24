const webpack = require('webpack');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const paths = require('./paths');

const babelLoader = {
  loader: 'babel-loader',
  options: {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-class-properties'
    ]
  }
}

module.exports = {
  mode: 'production',

  entry: {
    main: paths.entry,
  },

  output: {
    path: paths.bundle,
    filename: '[name]-[chunkhash:4].js',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },

  optimization: {
    minimizer: [new TerserPlugin()],
  },

  plugins: [
    new webpack.ProgressPlugin(),

    // new webpack.ProvidePlugin({
    //   React: 'react'
    // }),

    new CleanWebpackPlugin(),

    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: `${paths.public}/assets`
    //     }
    //   ]
    // }),

    new HtmlWebpackPlugin({
      template: paths.template,
      filename: 'index.html',
    }),

    new MiniCssExtractPlugin({
      filename: 'css/[name]-[chunkhash:4].css'
    }),

    new Dotenv({
      path: paths.env,
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: [babelLoader, 'ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(less|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
};
