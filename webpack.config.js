const path = require('path')

module.exports = {
    entry: './src/app.ts',
    watch: true,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            { test: /\.js$/, loader: 'source-map-loader' },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        // path: path.resolve(__dirname, ''),
    },
    devtool: 'source-map',
}
