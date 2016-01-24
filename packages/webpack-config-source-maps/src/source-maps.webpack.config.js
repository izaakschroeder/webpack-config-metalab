import partial from 'webpack-partial';
import { BannerPlugin, SourceMapDevToolPlugin } from 'webpack';

export default function sourcemaps(config) {
  const { target } = config;
  const env = process.env.NODE_ENV || 'development';
  const inline = env !== 'production';

  // TODO: Generate real URLs.
  function url() {
    const base = 'https://my-source-maps.com/potato';
    return `${base}/[url]`;
  }

  return partial(config, {
    // Embed source map support for sane debugging. This kinda cheats by
    // writing source map hooks at the top of every entrypoint.
    plugins: [
      ...target === 'node' && env !== 'production' ? [
        new BannerPlugin('require("source-map-support").install();', {
          raw: true,
          entryOnly: false,
        }),
      ] : [],
      new SourceMapDevToolPlugin({
        filename: inline ? null : 'map/[filebase].[hash].js.map',
        append: `\n//# sourceMappingURL=${inline ? '[url]' : url()}`,
        module: true,
        columns: true,
      }),
    ],
  });
}
