import merge from 'webpack-merge';
import LiveReloadPlugin from 'webpack-livereload-plugin';

import commonConfig from './webpack.common';

export default merge(commonConfig('development'), {
  plugins: [
    new LiveReloadPlugin()
  ]
});
