const webpack = require('webpack');

// 开发环境
module.exports = {
    mode: 'development',
    target: 'web',  // 使得热更新生效
    devServer: {
        open: true,
        openPage: 'html/index.html',
        hot: true  // 热更新配置
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin() // 热更新配置
    ]
}