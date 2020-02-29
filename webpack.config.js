const path = require('path');

module.exports = {
    entry:  {
        index: './lib/index.tsx'
    },
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
            },
            {
                test: /\.svg$/,
                loader:'svg-sprite-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    }
};