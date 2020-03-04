const base=require('./webpack.config')
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = Object.assign({},base,{
    mode: "production",
    entry:  {
        example: './lib/examples/example.tsx'
    },
    output: {
        path: path.resolve(__dirname, 'docs'),
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: "react wheel",
            template: "./lib/examples/example.html"
        })
    ]
});
