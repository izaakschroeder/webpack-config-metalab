import partial from 'webpack-partial';

export default function sharp(config) {
  return partial(config, {
    module: {
      loaders: [ {
        name: 'sharp',
        test: /\.(gif|jpe?g|png|tiff|svg)(\?.*)?$/,
        loader: require.resolve('sharp-loader'),
        query: {
          name: '[name].[hash:8].[ext]',
          presets: {
            default: {
              density: [ 1, 2, 3 ],
            },
            inline: {
              format: 'jpeg',
              mode: 'cover',
              blur: 100,
              quality: 30,
              inline: true,
              size: 50,
            },
          },
        },
      } ],
    },
  });
}
