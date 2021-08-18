const webpack = require('webpack')
const { merge } = require('webpack-merge');
const baseWebpackConfig = require("./webpack.base.js")

const devWebpackConfig = {
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        proxy: {
            // '/api': {
            //     target: 'https://api.faithcal.com/admin',
            //     changeOrigin: true,
            //     secure: true,
            //     pathRewrite: {
            //         '^/api': '/'
            //     }
            // },
            // '/default': {
            //     target: 'https://api.faithcal.com/default',
            //     changeOrigin: true,
            //     secure: true,
            //     pathRewrite: {
            //         '^/default': '/'
            //     }
            // },
        },
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                            }
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = merge(baseWebpackConfig, devWebpackConfig)
