import merge from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';

import commonConfig from './webpack.common';

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
