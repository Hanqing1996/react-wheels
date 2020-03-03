const base=require('./webpack.config')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = Object.assign({},base,{
    // 指定开发时的入口文件，这样才能保证 example.html 能引用 example.tsx
    mode: "development",
    entry:  {
        example: './lib/examples/example.tsx'
    },
    plugins: [
        // 指定开发时的预览首页
        new HtmlWebpackPlugin({
            title: "react wheel",
            template: "./lib/examples/example.html"
        })
    ]
});