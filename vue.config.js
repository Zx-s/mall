module.exports = {
  configureWebpack: {
    resolve: {
      extensions: [],//设置一些需要省略的后缀名  默认已经配置了 .css .js .vue
      alias: {//配置路径的别名
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}