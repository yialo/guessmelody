'use strict';

const path = require('path');

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sass = require('sass');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const CssExtractPlugin = require('mini-css-extract-plugin');
const CssOptimizationPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin: CleanPlugin } = require('clean-webpack-plugin');
const { ProgressPlugin } = require('webpack');

const distPath = path.join(__dirname, 'build');
const srcPath = path.join(__dirname, 'source');

const PATH = {
  DIST: distPath,
  SRC: srcPath,
  ENTRY: path.join(srcPath, 'index.js'),
  TEMPLATE: path.join(srcPath, 'index.ejs'),
};

module.exports = (env) => {
  const { target } = env;

  process.env.BABEL_ENV = target;
  process.env.NODE_ENV = target;

  const isDevelopment = (target === 'development');
  const isProduction = (target === 'production');

  const assetHash = isProduction ? '.[contenthash]' : '';
  const publicPath = '/';

  return {
    context: PATH.SRC,

    devServer: isDevelopment ? {
      host: '127.0.0.1',
      port: 3502,
      hot: false,
      inline: true,
      overlay: true,
      writeToDisk: true,
    } : {},

    devtool: isDevelopment ? 'eval-source-map' : false,

    entry: {
      app: PATH.ENTRY,
    },

    mode: target,

    module: {
      rules: (() => {
        const scriptLoaderRule = {
          test: /\.jsx?$/,
          loader: 'babel-loader',
        };

        const templateLoaderRule = {
          test: /\.ejs$/,
          loader: 'ejs-loader',
        };

        const styleLoaderRule = {
          test: /\.s?css$/,
          use: [
            (isProduction ? CssExtractPlugin.loader : 'style-loader'),
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 2,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  autoprefixer(),
                ],
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                implementation: sass,
                sourceMap: true,
              },
            },
          ],
        };

        const getFileLoaderRule = ({ testRegexp, outputPath }) => ({
          test: testRegexp,
          loader: 'file-loader',
          options: {
            name: `[name]${assetHash}.[ext]`,
            outputPath,
          },
        });

        return [
          scriptLoaderRule,
          templateLoaderRule,
          styleLoaderRule,
          getFileLoaderRule({
            testRegexp: /\.ico$/,
          }),
          getFileLoaderRule({
            testRegexp: /\.(jpe?g|png|svg)$/,
            outputPath: 'img',
          }),
          getFileLoaderRule({
            testRegexp: /\.woff2?$/,
            outputPath: 'fonts',
          }),
        ];
      })(),
    },

    optimization: (() => {
      const optimizationConfig = {
        noEmitOnErrors: true,
        splitChunks: {
          chunks: 'all',
          minChunks: 2,
          cacheGroups: {
            default: false,
            vendor: {
              name: 'vendors',
              test: /[\\/]node_modules[\\/]/,
              enforce: true,
            },
          },
        },
      };
      if (isProduction) {
        optimizationConfig.minimizer = [
          new TerserPlugin({
            extractComments: false,
            terserOptions: {
              compress: {
                drop_console: true,
                drop_debugger: true,
              },
              output: {
                comments: false,
              },
            },
          }),
          new CssOptimizationPlugin({
            assetNameRegExp: /\.css$/,
            cssProcessor: cssnano,
            cssProcessorPluginOptions: {
              preset: [
                'default',
                {
                  discardComments: true,
                },
                {
                  normalizeCharset: {
                    add: true,
                  },
                },
              ],
            },
            canPrint: true,
          }),
        ];
      }
      return optimizationConfig;
    })(),

    output: {
      filename: `js/[name]${assetHash}.js`,
      path: PATH.DIST,
      publicPath,
    },

    plugins: [
      new CaseSensitivePathsPlugin(),
      new CleanPlugin({
        cleanStaleWebpackAssets: false,
      }),
      new ProgressPlugin(),
      new CssExtractPlugin({
        filename: `css/[name]${assetHash}.css`,
      }),
      new HtmlPlugin({
        filename: 'index.html',
        template: PATH.TEMPLATE,
      }),
    ],

    resolve: {
      alias: {
        '@': PATH.SRC,
      },
    },

    stats: (() => {
      const statsConfig = {
        colors: true,
      };
      if (isDevelopment) {
        Object.assign(statsConfig, {
          assets: false,
          entrypoints: false,
          modules: false,
        });
      }
      return statsConfig;
    })(),

    target: 'web',
  };
};
