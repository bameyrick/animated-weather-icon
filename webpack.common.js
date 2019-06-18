
import * as path from 'path';

import { NoEmitOnErrorsPlugin, ProgressPlugin, NamedModulesPlugin } from 'webpack';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import FixStyleOnlyEntriesPlugin from 'webpack-fix-style-only-entries';
import SASSModuleImporter from 'sass-module-importer';

import postcssPlugins from './postcss.config';

export default function(mode) {
  const devMode = mode === 'development';

  return {
    context: `${__dirname}/src`,

    mode,

    entry: {
      html: ['./index.pug'],
      styles: ['./scss/index.scss'],
      example: ['./scss/example.scss'],
      index: ['./scripts/example.ts']
    },

    output: {
      path: path.join(process.cwd(), 'build'),
    },

    resolve: {
      extensions: ['.pug', '.js', '.scss', '.ts'],
      modules: ['./node_modules'],
      symlinks: true,
      alias: {}
    },

    resolveLoader: {
      modules: ['./node_modules'],
    },

    module: {
      rules: [
        {
          test: /\.pug$/,
          loaders: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].html'
              }
            },
            {
              loader: 'pug-html-loader',
              options: {
                doctype: 'html',
                data: {
                  debug: devMode
                }
              }
            }
          ]
        },
        {
          test: /\.scss$|\.sass$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: false,
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: postcssPlugins,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: false,
                precision: 8,
                includePaths: [path.resolve('./src/styles')],
                importer: SASSModuleImporter()
              }
            }
          ]
        },
        {
          test: /\.tsx?$/,
          exclude: /(node_modules)/,
          use: ['ts-loader']
        },
        {
          test: /\.svg$/,
          use: 'svg-inline-loader'
        }
      ]
    },

    plugins: [
      new NoEmitOnErrorsPlugin(),
  
      new ProgressPlugin(),
  
      new CircularDependencyPlugin({
        exclude: /(\\|\/)node_modules(\\|\/)/,
        failOnError: false,
      }),
  
      new NamedModulesPlugin(),

      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      }),

      new FixStyleOnlyEntriesPlugin({
        extensions: ['scss', 'pug', 'html'],
        silent: true
      }),
    ]
  };
}
