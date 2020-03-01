const base=require('./webpack.config')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = Object.assign({},base,{
    mode: "development",
    entry:  {
        example: './lib/example.tsx'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "react wheel",
            template: "./lib/index.html"
        })
    ]
});