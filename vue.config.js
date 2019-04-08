const path=require('path');
const webpack = require( 'webpack' );
const webpackHmlPlngin =require("html-webpack-plugin");
const Utils = require("./config.webutils");

// 多页面设置入口文件；
let entries = Utils.getMultiEntry('./src/pages/*/*.js'); // 获得入口js文件

// 多页面模板文件；
let pagestel = Utils.getMultiEntry('./src/pages/*/*.html');
let htmlplugins = [];
for(let pathname in pagestel) {
  var conf = {
    filename: pathname.split("/")[1] + '.html',
    template: pagestel[pathname], // 模板路径
    chunks: ["manifest", "vendors", "common" , pathname], // 每个html引用的js模块
    inject: true,// js插入位置
    hash: true
  };
  htmlplugins.push(new webpackHmlPlngin(conf));
}
module.exports = {
    publicPath:process.env.NODE_ENV === 'production'
      ? Utils.ProassetsPublicPath
      : Utils.DevassetsPublicPath,
    configureWebpack: {
      entry:entries,
      output: {
        path: path.resolve(__dirname,'dist'),
        filename:'js/[name].js',
      },
      plugins: [
        ...htmlplugins //htmlplugin
      ],
      devServer:{
        proxy: {
            '/http': {
                target:'http://192.168.0.167:7001',
                changeOrigin: true,
                pathRewrite: {
                    '^/http': ''
                }
            },
            '/app': {
                target: 'http://182.168.0.6:8080',
                changeOrigin: true,
                pathRewrite: {
                    '^/app': ''
                }
            }
         },
      },
      optimization: {
        // 找到chunk中共享的模块,取出来生成单独的chunk
        splitChunks: {
            chunks: "all",  // async表示抽取异步模块，all表示对所有模块生效，initial表示对同步模块生效
            cacheGroups: {
                vendors: {  // 抽离第三方插件
                    test: /[\\/]node_modules[\\/]/,     // 指定是node_modules下的第三方包
                    name: "vendors",
                    priority: -10                       // 抽取优先级
                },
                utilCommon: {   // 抽离自定义工具库
                    name: "common",
                    minSize: 0,     // 将引用模块分离成新代码文件的最小体积
                    minChunks: 2,   // 表示将引用模块如不同文件引用了多少次，才能分离生成新chunk
                    priority: -20
                }
            }
        },
        // 为 webpack 运行时代码创建单独的chunk
        runtimeChunk:{
            name:'manifest'
        }
        }
    }
  }