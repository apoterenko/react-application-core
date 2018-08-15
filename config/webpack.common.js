const helpers = require('./helpers');

const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const StringReplacePlugin = require('string-replace-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const APP_VERSION = process.env.npm_package_version || '0.0.0';
const METADATA = { host: HOST, port: PORT, APP_VERSION: APP_VERSION };
const ExtractSassPlugin = new ExtractTextPlugin({filename: '[name].css?' + APP_VERSION});

module.exports.METADATA = METADATA;
module.exports.define = function (options) {
  return {
    output: {
      path: helpers.root('dist'),
      filename: '[name].js?' + APP_VERSION,
      sourceMapFilename: '[file].map'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      modules: [helpers.root('src'), helpers.root('node_modules')],
      alias: {
        core: helpers.root('src/ts/core')
      }
    },
    module: {
      rules: [
        {
          test: /\.ts|\.tsx$/,
          use: [
            {
              loader: 'awesome-typescript-loader',
              options: {
                configFileName: 'tsconfig.json',
                useCache: false
              }
            }
          ],
          exclude: [/\.(spec|e2e)\.ts$/]
        },
        {
          test: /\.scss$/,
          use: ExtractSassPlugin.extract({
            use: [{
              loader: 'css-loader'
            }, {
              loader: 'sass-loader',
              options: {
                includePaths: [helpers.root('node_modules')]
              }
            }]
          })
        },
        {
          test: /\.js$/,
          include: [helpers.root('node_modules/@material')],
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        },
        {
          test: /\.(jpg|png|gif)$/,
          use: 'file-loader'
        },
        {
          test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
          use: 'file-loader'
        }
      ]
    },
    plugins: [
      ExtractSassPlugin,
      new CheckerPlugin(),
      new LoaderOptionsPlugin({
        minimize: options.isProd,
        debug: !options.isProd,
        options: {
          sassLoader: {
            includePaths: [
              helpers.root('node_modules/@material')
            ]
          }
        }
      }),
      new StringReplacePlugin(),
      new DefinePlugin({
        'ENV': JSON.stringify(options.env),
        'process.env': {
          'ENV': JSON.stringify(options.env),
          'NODE_ENV': JSON.stringify(options.env),
          'APP_VERSION': JSON.stringify(METADATA.APP_VERSION),
        }
      })
    ],
    node: {
      global: true,
      crypto: 'empty',
      process: false,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  };
};
