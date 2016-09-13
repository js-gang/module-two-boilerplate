var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')

var path = require('path')

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
    root: appPath,
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
    path: './src/dist',
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
        loader: 'babel'
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
