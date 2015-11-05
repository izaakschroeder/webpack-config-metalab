
import partial from 'webpack-partial';

import entry from 'webpack-config-entry';
import buildInfo from 'webpack-config-build-info';
import sourceMaps from 'webpack-config-source-maps';
import babel from 'webpack-config-babel';
import json from 'webpack-config-json';
import optimize from 'webpack-config-optimize';
import stats from 'webpack-config-stats';
import root from 'webpack-config-root';

export default function(config) {
  return partial(
    config,
    entry,
    babel,
    buildInfo,
    json,
    stats,
    root,
    sourceMaps,
    optimize
  );
}
