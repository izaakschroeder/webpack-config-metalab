
export default function expose({ expose = [] }) {
  return {
    module: {
      loaders: Object.keys(expose).map(module => {
        return {
          name: `expose-${module}`,
          test: require.resolve(module),
          loader: `expose-loader?${expose[module]}`,
        };
      }),
    },
  };
}
