const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const uglifyjsWebpackPlugin = require("uglifyjs-webpack-plugin")
const terserWebpackPlugin = require("terser-webpack-plugin")
const {
  CleanWebpackPlugin
} = require("clean-webpack-plugin")
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = {
  entry: path.join(__dirname, "../src/main.js"),
  output: {
    filename: "js/[name][hash].js",
    path: path.join(__dirname, "../dist")
  },
  resolve: {
    alias: {
      "@": path.join(__dirname, "../src")
    }
  },
  devServer: {
    contentBase: path.join(__dirname, "../public/index.html"),
    host: "10.0.17.106",
    port: 8080,
    open: true,
    proxy: {
      "/cetc/api": {
        target: "http://10.0.17.234:8080", //要访问的接口域名
      }
    }
  },
  optimization: {
    minimize: true,
    minimizer: [
      new terserWebpackPlugin({
        terserOptions: {
          compress: {
            drop_debugger: true,
            drop_console: true,//console
            pure_funcs: ['console.log']//移除console
          }
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons', //提取出来的文件命名
          chunks: 'initial', //initial表示提取入口文件的公共部分
          minChunks: 2, //表示提取公共部分最少的文件数
          minSize: 0 //表示提取公共部分最小的大小
        }
      }
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      include: [path.join(__dirname, "../src")],
      loader: "babel-loader"
      // options: {
      //   presets: ['@babel/preset-env']
      // }
    },
    {
      test: /\.css$/,
      exclude: "/node_modules",
      use: [MiniCssExtractPlugin.loader, {
        loader: "css-loader"
      }, {
        loader: "px2rem-loader",
        options: {
          remUnit: 75
        }
      }]
    },
    {
      test: /\.less$/,
      exclude: "/node_modules",
      use: [MiniCssExtractPlugin.loader, {
        loader: "css-loader"
      }, {
        loader: "px2rem-loader",
        options: {
          remUnit: 75
        }
      },
      {
        loader: "less-loader"
      }
      ]
    },
    // element-ui使用了字体所以需要配置一下
    {
      test: /\.(woff|svg|eot|ttf)\??.*$/,
      loader: 'url-loader'
    },
    {
      test: /\.(png|jpg|svg)$/,
      use: {
        loader: "file-loader",
        options: {
          name: "images/[name][hash].[ext]",
          esModule: false
        }
      }
    },
    {
      test: /\.vue$/,
      use: {
        loader: "vue-loader"
      }
    }
    ]
  },
  plugins: [
    new OptimizeCSSAssetsPlugin(), //普通压缩css
    new MiniCssExtractPlugin({
      filename: "css/[name][hash].css",
      chunkFilename: "css/[name][hash].css"
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, "../src/static"),
        to: path.join(__dirname, "../dist/static"),
        ignore: [".*"]
      }
    ]),
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../public/index.html"),
      fileName: "index.html",
      inject: "body",
      title: "webpack",
      favicon: path.join(__dirname, "../src/assets/logo.png")
    })
  ]
}