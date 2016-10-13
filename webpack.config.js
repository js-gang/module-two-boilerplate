const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const path = require('path')


module.exports = {
    devServer: {
        host: 'localhost',
        port: 8080,
    },

    entry: 'main.js',
    resolve: {
        root: path.join(__dirname, 'src'),
        alias: {
            api: 'api',
            dom: 'dom',
        },
    },

    devtool: 'inline-source-map',

    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css'],
            },
            {
                test: /\.(gif|jpe?g|png|svg)$/,
                loader: 'file',
            },
            {
                test: /\.(woff2?|ttf|eot)$/,
                loader: 'file',
            }
        ]
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html',
        }),
        //new webpack.optimize.UglifyJsPlugin({sourceMap: false}),
    ]
};
