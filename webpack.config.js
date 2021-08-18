const devWebpackConfig = require("./webpack_config/webpack.development.js")
const proWebpackConfig = require('./webpack_config/webpack.production.js')
console.log("====>",process.env.NODE_ENV)
module.exports = process.env.NODE_ENV == 'development' ?  devWebpackConfig : proWebpackConfig