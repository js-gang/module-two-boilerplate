const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path')

module.exports = {
    devServer: {
        host: 'localhost',
        port: 8080,
    },

    entry: 'main.js',
    resolve: {
        root: path.join(__dirname, 'src')
    },

    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.(gif|jpg|png|svg)$/,
                loader: 'file'
            }
        ]
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html'
        })
    ]
};
