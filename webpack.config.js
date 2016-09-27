/* eslint-disable */

var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')

var path = require('path')
var root = __dirname
var appPath = path.join(__dirname, 'src')

var env = process.env.NODE_ENV || 'dev'
var debug = env !== 'production'
var minify = !debug


var plugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.join(appPath, 'index.html'),
    minify: false
  }),
  new CleanWebpackPlugin(['dist'], {
    root: root,
    verbose: true
  })
]

if (minify) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    sourceMap: false
  }))
}
module.exports = {
  entry: {
    bundle: './src/main.js'
  },
  devtool: 'inline-source-map',
  debug: debug,
  output: {
    path: './dist',
    filename: '[hash].[name].js'
  },
  devServer: {
    host: 'localhost',
    port: 8080
  },
  module:{
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel', 'eslint']
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.(gif|png|jpe?g)$/,
        loader: 'file',
        query: {
          name: '[path][name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: plugins
}
