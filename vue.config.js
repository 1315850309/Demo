const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  chainWebpack: config => {
    // config.resolve.alias
    //   .set('@', path.join(__dirname, "/src")).end();
    config.module
      .rule("css")
      .test(/\.css$/)
      .oneOf("vue")
      .resourceQuery(/\?vue/)
      .end();
    config.resolve.alias.set("@", path.join(__dirname, "/src")).end();
  },
  configureWebpack: {
    devtool: "inline-source-map",

    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "./public/index.html"),
        filename: "index.html",
        title: "webpack",
        inject: "body"
      })
    ]
  },
  devServer: {
    host: "0.0.0.0",
    port: 8080,
    open: true, //自动打开浏览器
    proxy: {
      "/cetc/api": {
        // target: "http://10.0.17.234:8080", //要访问的接口域名
        target: "http://10.0.13.68:8080", //要访问的接口域名
        // target: "http://10.0.17.108:8080", //要访问的接口域名
        secure: false,
        changeOrigin: true
      },
      // "/12345_words_test": {
      //   target: "http://10.0.14.61:9200", //要访问的接口域名
      //   secure: false,
      //   changeOrigin: true
      // },
      // "/xf_words_test": {
      //   target: "http://10.0.14.61:9200", //要访问的接口域名
      //   secure: false,
      //   changeOrigin: true
      // },
      "/system": {
        target: "http://10.0.17.234:8080", //要访问的接口域名
        // target: "http://10.0.13.68:8080", //要访问的接口域名
        secure: false,
        changeOrigin: true
      },
      "/captchaImage": {
        target: "http://10.0.17.234:8080", //要访问的接口域名
        // target: "http://10.0.13.68.8000", //要访问的接口域名
        secure: false,
        changeOrigin: true
      },
      "/login": {
        target: "http://10.0.17.234:8080", //要访问的接口域名
        // target: "http://10.0.13.68:8080", //要访问的接口域名
        secure: false,
        changeOrigin: true
      }
    }
  }
};