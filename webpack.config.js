module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test:/\.tsx?$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    }
};