import partial from 'webpack-partial';

import postcss from 'webpack-config-postcss';

import base from './base';

export default function(config) {
  return partial(
    config,
    base,
    postcss
  );
}
