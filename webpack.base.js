// 相同配置
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        main: './src/modules/main/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name]_[chunkhash:5].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {test: /\.less$/, use: [ MiniCssExtractPlugin.loader,'cache-loader', 'css-loader', 'less-loader']},
            {test: /\.(jpg|png|gif)$/, use: [
                // 'cache-loader', // 这里不能使用cache-loader
                {
                loader: 'file-loader', 
                options: {
                    name: 'images/[name]_[hash:5].[ext]'
                }
            }]},
            {test: /\.js$/, use: ['cache-loader', 'babel-loader']} // 优化
        ],
        noParse: /jquery/ // 优化
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/assets/html/index.html',
            filename: 'html/index.html'
        }),

        new CopyWebpackPlugin([{
            from: "./src/assets/source",
            to: "./source",
        }]),

        new CopyWebpackPlugin([{
            from: "./src/assets/mock",
            to: "./mock",
        }]),

        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        
        new MiniCssExtractPlugin({
            filename: 'css/[name]_[chunkhash:5].css'
        })
    ]
}