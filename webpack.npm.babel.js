import * as path from 'path';
import merge from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import DeclarationBundlerPlugin from 'declaration-bundler-webpack-plugin';

import commonConfig from './webpack.common';

const config = commonConfig('production');

delete config.entry;
delete config.output;

export default merge(config, {
  entry: {
    index: ['./scripts/WeatherIcon/index.ts'],
  },

  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: '[name].js',
    // library: 'WeatherIcon',
    libraryTarget: 'commonjs',
  },

  plugins: [
    // new DeclarationBundlerPlugin({
    //   moduleName: 'WeatherIcon',
    //   out: 'index.d.ts',
    // }),
  ],
  
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
});
