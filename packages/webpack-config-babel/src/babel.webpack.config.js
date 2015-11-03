
export default function babel({ babel }) {
  return {
    module: {
      loaders: [{
        name: 'babel',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: babel,
      }],
    },
  };
}
