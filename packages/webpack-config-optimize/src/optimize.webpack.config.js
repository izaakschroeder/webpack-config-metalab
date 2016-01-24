import partial from 'webpack-partial';
import { optimize } from 'webpack';

export default function optimizer(config) {
  return partial(config, {
    plugins: process.env.NODE_ENV === 'production' ? [
      new optimize.DedupePlugin(),
      new optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      }),
    ] : [],
  });
}
