// 生产环境
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin({
            // cleanOnceBeforeBuildPatterns: ['**/*', '!mock', '!mock/*']
        }),
        // 优化
        new CompressionWebpackPlugin({
            test: /\.js/,
            minRatio: 0.5
        })
    ],
    optimization: {
        // 是否要启用压缩，默认情况下，生产环境会自动开启
        minimize: true,
        minimizer: [
            // 压缩时使用的插件，可以有多个
            new TerserPlugin(),
            new OptimizeCSSAssetsPlugin()
        ]
    },

}