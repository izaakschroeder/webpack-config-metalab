
import StatsPlugin from 'stats-webpack-plugin';

export default function stats({ stats }) {
  const config = {
    hash: true,
    assets: false,
    reasons: false,
    chunks: true,
    source: false,
    ...stats,
  };
  return {
    plugins: [
      new StatsPlugin('stats.json', config),
    ],
  };
}
