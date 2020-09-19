'use strict';

const path = require('path');

const cssnano = require('cssnano');
const sass = require('sass');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const CssExtractPlugin = require('mini-css-extract-plugin');
const CssOptimizationPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin: CleanPlugin } = require('clean-webpack-plugin');
const { DefinePlugin, ProgressPlugin } = require('webpack');

const distPath = path.join(__dirname, 'build');
const srcPath = path.join(__dirname, 'source');

const PATH = {
  DIST: distPath,
  SRC: srcPath,
  ENTRY: path.join(srcPath, 'index.js'),
  STATIC_INPUT: path.join(srcPath, 'files'),
  STATIC_OUTPUT: path.join(distPath, 'files'),
  TEMPLATE: path.join(srcPath, 'index.ejs'),
};

module.exports = (env = {}) => {
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
      hot: true,
      inline: true,
      open: true,
      overlay: true,
      writeToDisk: false,
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
          options: {
            cacheDirectory: true,
          },
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
                postcssOptions: {
                  plugins: ['autoprefixer'],
                },
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

        return [
          scriptLoaderRule,
          styleLoaderRule,
          {
            test: /\.ico$/,
            loader: 'file-loader',
            options: {
              name: `[name]${assetHash}.[ext]`,
            },
          },
          {
            test: /\.(jpe?g|png|svg)$/,
            loader: 'file-loader',
            options: {
              name: `[name]${assetHash}.[ext]`,
              outputPath: 'img',
            },
          },
          {
            test: /\.woff2?$/,
            loader: 'file-loader',
            options: {
              name: `[name]${assetHash}.[ext]`,
              outputPath: 'fonts',
            },
          },
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
      new CopyPlugin({
        patterns: [
          {
            from: PATH.STATIC_INPUT,
            to: PATH.STATIC_OUTPUT,
          },
        ],
      }),
      new ProgressPlugin(),
      new CssExtractPlugin({
        filename: `css/[name]${assetHash}.css`,
      }),
      new HtmlPlugin({
        filename: 'index.html',
        template: PATH.TEMPLATE,
      }),
      new DefinePlugin({
        'process.env.PUBLIC_PATH': JSON.stringify(publicPath),
      }),
    ],

    resolve: {
      alias: {
        '@': PATH.SRC,
      },
      extensions: [
        '.js',
        '.ts',
      ],
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
