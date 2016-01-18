
export default function babel({ babel }) {
  return {
    module: {
      loaders: [ {
        name: 'babel',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        query: babel,
      } ],
    },
  };
}
