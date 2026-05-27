import * as path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import { merge } from 'webpack-merge';

import commonConfig from './webpack.common.js';

const config = commonConfig('production');

delete config.entry;
delete config.output;

export default merge(config, {
  entry: {
    index: ['./scripts/AnimatedWeatherIcon/index.ts'],
  },

  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs',
  },

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
