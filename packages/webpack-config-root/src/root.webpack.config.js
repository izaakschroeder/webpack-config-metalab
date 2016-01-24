import partial from 'webpack-partial';
import path from 'path';

export default function root(config) {
  const { context } = config;
  return partial(config, {
    resolve: {
      root: [
        path.join(context, 'src'),
      ],
    },
  });
}
