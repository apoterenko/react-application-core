const webpack = require('webpack');
const helpers = require('./helpers');
const fs = require('fs');
const envArgs = require('yargs').argv.env || {};

const NormalModuleReplacementPlugin = require('webpack/lib/NormalModuleReplacementPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const StringReplacePlugin = require('string-replace-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const APP_VERSION = process.env.npm_package_version || '0.0.0';
const APP_PROFILE = envArgs.appProfile || 'portal';
const APP_SETTINGS = JSON.parse(fs.readFileSync('./settings/' + APP_PROFILE + '.json', 'utf8'));
const GOOGLE_KEY = APP_SETTINGS.googleKey;
const APP_TITLE = APP_SETTINGS.appTitle.replace(/\{APP_VERSION\}/, APP_VERSION);
const METADATA = { host: HOST, port: PORT, APP_VERSION: APP_VERSION, GOOGLE_KEY: GOOGLE_KEY };
const ExtractSassPlugin = new ExtractTextPlugin({filename: '[name].css?' + APP_VERSION});

module.exports.METADATA = METADATA;
module.exports.define = function (options) {
  return {
    output: {
      path: helpers.root('dist'),
      filename: '[name].js?' + APP_VERSION,
      sourceMapFilename: '[file].map'
    },
    entry: {
      app: './src/ts/' + APP_PROFILE + '/app.bootstrap.tsx',
      polyfills: './src/ts/core/polyfills.ts'
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
          test: /\.html$/,
          use: {
            loader: 'raw-loader',
            options: {
              useCache: false
            }
          },
          exclude: [helpers.root('src/index.html')]
        },
        {
          test: /\.html$/,
          loader: StringReplacePlugin.replace({
            replacements: [
              {
                pattern: /\{VERSION\}/g,
                replacement: function () { return APP_VERSION; }
              },
              {
                pattern: /\{TITLE\}/g,
                replacement: function () { return APP_TITLE; }
              },
              {
                pattern: /\{GKEY\}/g,
                replacement: function () { return options.isProdBuild ? GOOGLE_KEY : ''; }
              }
            ].concat(
                !options.isProdBuild
                    ? {
                      pattern: /<meta http-equiv="Content-Security-Policy".+\/>/g,
                      replacement: function () {
                        return '';
                      }
                    }
                    : []
            )
          })
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
      new CopyWebpackPlugin([
        {from: 'src/manifest.json', to: 'manifest.json'},
        {from: 'src/web.config', to: 'web.config'},
        {from: 'src/media', to: 'media'},
      ]),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/app.html',
        inject: 'body',
        chunksSortMode: function (a, b) {
          const order = ['vendor', 'polyfills', 'app'];
          return order.indexOf(a.names[0]) > order.indexOf(b.names[0]) ? 1 : -1;
        }
      }),
      new ScriptExtHtmlWebpackPlugin({
        sync: /polyfills|vendor|app/,
      }),
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
          'GOOGLE_KEY': JSON.stringify(METADATA.GOOGLE_KEY),
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
    },
    devServer: {
      port: METADATA.port,
      host: METADATA.host,
      watchOptions: {
        ignored: /node_modules/
      },
      historyApiFallback: true,
      proxy: {
        '/api': {
          target: 'https://localhost:8443/api',
          secure: false
        }
      }
    }
  };
};
