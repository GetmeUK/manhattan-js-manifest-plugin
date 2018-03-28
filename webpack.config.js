var path = require('path');


module.exports = {
    entry: {
        'index': './module/index.js'
    },

    externals: {
        'fs': 'fs',
        'path': 'path',
        'rimraf': 'rimraf',
        'walk': 'walk'
    },

    output: {
        library: 'manhattan-manifest-plugin',
        libraryTarget: 'commonjs2',
        path: path.resolve(__dirname, 'umd'),
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },

    stats: {
        colors: true
    },

    target: 'node'
}
