module.exports = {
  devServer: {

    port: 8080,

    host: '0.0.0.0',

    https: false,

    // 自动启动浏览器

    open: false,

    proxy: {
      '/dqmalluser': {
        // 代理路径 例如 https://baidu.com
        target: 'http://119.23.191.140:8080/dqmall/user',
        // 将主机标头的原点更改为目标URL
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/dqmalluser': ''
        }
      }
    }

  }

}
