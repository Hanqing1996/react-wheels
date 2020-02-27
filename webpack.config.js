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
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "react wheel",
            template: "./lib/index.html"
        })
    ],
    externals: {
        react:{
            commonjs:'react',
            commonjs2:'react',
            amd:'react',
            root:'React'
        },
        'react-dom':{
            commonjs:'react-dom',
            commonjs2:'react-dom',
            amd:'react-dom',
            root:'ReactDOM'
        }
    }
};