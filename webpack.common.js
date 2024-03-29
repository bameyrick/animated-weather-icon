import * as path from 'path';

import { NoEmitOnErrorsPlugin, ProgressPlugin } from 'webpack';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import RemoveEmptyScriptsPlugin from 'webpack-remove-empty-scripts';

import postcssPlugins from './postcss.config';

export default function (mode) {
  const devMode = mode === 'development';

  return {
    context: `${__dirname}/src`,

    mode,

    entry: {
      html: ['./index.pug'],
      index: ['./scripts/example.ts'],
    },

    output: {
      path: path.join(process.cwd(), 'build'),
    },

    resolve: {
      extensions: ['.pug', '.js', '.scss', '.ts'],
      modules: ['./node_modules'],
      symlinks: true,
      alias: {},
    },

    resolveLoader: {
      modules: ['./node_modules'],
    },

    module: {
      rules: [
        {
          test: /\.pug$/,
          rules: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].html',
              },
            },
            {
              loader: 'pug-html-loader',
              options: {
                doctype: 'html',
                data: {
                  debug: devMode,
                },
              },
            },
          ],
        },
        {
          test: /\.scss$|\.sass$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: false,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  ident: 'postcss',
                  plugins: postcssPlugins,
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: false,
                sassOptions: {
                  precision: 8,
                  includePaths: [path.resolve('./src/styles')],
                },
              },
            },
          ],
        },
        {
          test: /\.tsx?$/,
          exclude: /(node_modules)/,
          use: ['ts-loader'],
        },
        {
          test: /\.svg$/,
          use: 'svg-inline-loader',
        },
      ],
    },

    plugins: [
      new NoEmitOnErrorsPlugin(),

      new ProgressPlugin(),

      new CircularDependencyPlugin({
        exclude: /(\\|\/)node_modules(\\|\/)/,
        failOnError: false,
      }),

      new RemoveEmptyScriptsPlugin(),
    ],

    optimization: {
      moduleIds: 'named',
    },
  };
}
