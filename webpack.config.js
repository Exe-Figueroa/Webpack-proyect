const path = require('path');
const htmlWebpackPlugin =  require('html-webpack-plugin');
const CssMiniExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin'); 
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/images/[hash][ext][query]'
  },
  resolve:{
    extensions: ['.js'],
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@templates': path.resolve(__dirname, 'src/templates/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@images': path.resolve(__dirname, 'src/assets/images/'),
    }
  },
  module: {
    rules: [
      {
        // este es p/trabajar con babel-loader
        test: /\.m?js$/, 
        exclude: /node_modules/,
        use:{
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css|.styl$/i, 
        use: [
          CssMiniExtractPlugin.loader,
          'css-loader', 
          'stylus-loader'
        ]
      },
      {
        test: /\.png/,
        type: "asset/resource"
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: "application/font-woff",
            name: "[name].[contenthash].[ext]",
            outputPath: "./assets/fonts/",
            publicPath: "../assets/fonts/",
            esModule: false,
          },
        }
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      filename: './index.html'
    }),
    new CssMiniExtractPlugin({
      filename: 'assets/[name].[contenthash].css'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images"
        }
      ]
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ]
  }
};