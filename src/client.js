import partial from 'webpack-partial';

import postcss from 'webpack-config-postcss';
import expose from 'webpack-config-expose';

import base from './base';

export default function(config) {
  return partial(
    config,
    base,
    postcss,
    {
      expose: {
        react: 'React',
      },
    },
    expose
  );
}
