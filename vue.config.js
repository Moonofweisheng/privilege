const path = require('path')
module.exports = {
    publicPath: './',
    lintOnSave: false,

    chainWebpack: config => {
        // 修复HMR
        config.resolve.symlinks(true);
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
    },

    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },

    runtimeCompiler: true
}

function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './src/util/css/layout/layout.less'), // 需要全局导入的less
                path.resolve(__dirname, './src/util/css/theme/theme.less')
            ],
        })
}