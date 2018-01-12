const path = require('path');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

module.exports = function () {
  return webpackMerge(commonConfig.define({isProd: false, env: ENV}), {
    devtool: 'cheap-module-source-map'
  });
};
