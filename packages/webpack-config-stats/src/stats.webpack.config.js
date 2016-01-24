import partial from 'webpack-partial';
import StatsPlugin from 'stats-webpack-plugin';

export default function stats(config) {
  const config = {
    hash: true,
    assets: false,
    reasons: false,
    chunks: true,
    source: false,
    ...stats,
  };
  return partial(config, {
    plugins: [
      new StatsPlugin('stats.json', config),
    ],
  });
}
