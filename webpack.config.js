const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const configClientBundle = {
    target: 'web',
    mode: 'production',
    entry: {
        webapp: './src/client/mainClient.tsx'
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.scss'],
        alias: {
            GlobalComponents: path.resolve(__dirname, 'src/client/components')
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist/public'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            { test: /\.tsx|.ts$/, use: 'awesome-typescript-loader' },
            {
                test: /\.scss/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
            }
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: true,
                toplevel: true
            }
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
};

const configServerBundle = Object.assign({}, configClientBundle, {
    target: 'node',
    mode: 'production',
    entry: {
        serverapp: './src/client/mainServer.tsx'
    },
    output: {
        path: path.resolve(__dirname, 'dist/server'),
        filename: '[name].bundle.js',
        library: "webapp",
        libraryTarget: "commonjs2"
    }
});

module.exports = [configClientBundle, configServerBundle];