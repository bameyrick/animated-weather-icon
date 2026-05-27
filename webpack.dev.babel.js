import LiveReloadPlugin from 'webpack-livereload-plugin';
import { merge } from 'webpack-merge';

import commonConfig from './webpack.common.js';

export default merge(commonConfig('development'), {
  plugins: [new LiveReloadPlugin()],
});
