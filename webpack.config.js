const HTMLWebpackPlugin = require('html-webpack-plugin');
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
                loaders: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(gif|jpg|png|svg)$/,
                loader: 'file',
            }
        ]
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html'
        })
    ]
};
