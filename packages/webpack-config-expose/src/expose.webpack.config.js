
import resolve from 'resolve';

export default function expose({ expose = [], context }) {
  return {
    module: {
      loaders: Object.keys(expose).map(module => {
        return {
          name: `expose-${module}`,
          test: resolve.sync(module, {
            basedir: context,
          }),
          loader: `${require.resolve('expose-loader')}?${expose[module]}`,
        };
      }),
    },
  };
}
