const devConfig = require('./webpack.dev')
const prodConfig = require('./webpack.prod')
const baseConfig = require('./webpack.base')
module.exports = env => {
    // 生产环境
    if(env && env.prod) {
        return {
            ...baseConfig,
            ...prodConfig,
            plugins: [...prodConfig.plugins, ...baseConfig.plugins]
        }
    }
    // 开发环境
    else {
        return {
            ...baseConfig,
            ...devConfig,
            plugins: [...devConfig.plugins, ...baseConfig.plugins]
        }
    }
}