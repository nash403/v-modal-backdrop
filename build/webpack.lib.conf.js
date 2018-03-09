'use strict'
const webpack = require('webpack')
const merge = require('webpack-merge')
const config = require('../config')
const utils = require('./utils')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')

module.exports = merge(Object.assign({}, baseWebpackConfig, {
  entry: './src/main.js',
  output: {
    path: config.build.assetsRoot,
    filename: 'modal-backdrop.js',
    library: 'ModalBackdrop',
    libraryTarget: 'umd',
    libraryExport: "default",
    umdNamedDefine:true
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}), {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  }
})

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('modal-backdrop.css'),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        mangle: {
          // Works around a Safari 10 bug:
          // https://github.com/mishoo/UglifyJS2/issues/1753
          safari10: true
        }
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
