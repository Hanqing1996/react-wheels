const path = require('path');

module.exports = {
    entry: './lib/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist/lib'),
    },
    module: {
        rules: [
            {
                test:/\.tsx?$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    }
};