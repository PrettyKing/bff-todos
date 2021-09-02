const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        index: path.resolve(__dirname, "../src/web/index.js")
    },
    output: {
        path: path.resolve(__dirname, '../dist/web'),
        filename: '[name].js',
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // 缓存上次编译结果，避免每次重新编译，减少打包时间
                        cacheDirectory: true
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.js', '.ts']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../public/template/index.html"),
            favicon: path.resolve(__dirname, "../public/template/favicon.ico")
        })
    ]
}