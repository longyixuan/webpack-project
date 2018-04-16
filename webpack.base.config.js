var path = require('path')
var globby = require('globby')  
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// CSS打包入口
var CSS_PATH = {
  scss: {
    pattern: ['./src/css/sass/_*.scss'],
    src: path.join(__dirname, 'src'),
    dist: path.resolve(__dirname, 'static')
  },
  less: {
    pattern: ['./src/css/less/_*.less'],
    src: path.join(__dirname, 'src'),
    dist: path.resolve(__dirname, 'static')
  }
}

// 遍历除所有需要打包的CSS文件路径
function getCSSEntries(config) {
  var fileList = globby.sync(config.pattern);
  console.log(fileList)
  return fileList.reduce(function (previous, current) {
    var filePath = path.parse(path.relative(config.src, current))
    var withoutSuffix = path.join(filePath.dir, filePath.name)
    previous[withoutSuffix] = path.resolve(__dirname, current)
    return previous
  }, {})
}
module.exports = [
  {
    devtool: 'cheap-module-eval-source-map',
    context: path.resolve(__dirname),
    entry: getCSSEntries(CSS_PATH.less),
    output: {
      path: CSS_PATH.less.dist,
      filename: '[name].css'
    },
    module: {
      rules: [
        {
          test: /\.less$/,
          use: ExtractTextPlugin.extract({
            use: ['css-loader', 'autoprefixer-loader', 'less-loader']
          })
        }
      ]
    },
    resolve: {
      extensions: ['.less']
    },
    plugins: [
      new ExtractTextPlugin('[name].css'),
    ]
  },
  {
    devtool: 'cheap-module-eval-source-map',
    context: path.resolve(__dirname),
    entry: getCSSEntries(CSS_PATH.scss),
    output: {
      path: CSS_PATH.scss.dist,
      filename: '[name].css'
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            use: ['css-loader', 'autoprefixer-loader', 'sass-loader']
          })
        }
      ]
    },
    resolve: {
      extensions: ['.scss']
    },
    plugins: [
      new ExtractTextPlugin('[name].css'),
    ]
  }
]