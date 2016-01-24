import partial from 'webpack-partial';

export default function json5(config) {
  return partial(config, {
    module: {
      loaders: [ {
        name: 'json5',
        test: /\.json5?$/,
        loader: require.resolve('json5-loader'),
      } ],
    },
  });
}
