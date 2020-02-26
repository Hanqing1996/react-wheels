const HtmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path');

module.exports = {
    mode: "development",
    entry: './lib/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist/lib'),
        library: 'myReactWheel',
        libraryTarget: "umd"
    },
    module: {
        rules: [
            {
                test:/\.tsx?$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "react wheel",
            template: "./lib/index.html"
        })
    ]
};