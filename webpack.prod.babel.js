import TerserPlugin from 'terser-webpack-plugin';
import { merge } from 'webpack-merge';

import commonConfig from './webpack.common.js';

export default merge(commonConfig('production'), {
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
