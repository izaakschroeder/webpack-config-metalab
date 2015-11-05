
import { ProvidePlugin } from 'webpack';

export default function() {
  return {
    module: {
      loaders: [{
        name: 'babel',
        query: {
          plugins: [
            'adana',
            'west-mocha',
          ],
        },
      }],
    },
    plugins: [
      new ProvidePlugin({
        expect: '../test/helper/expect',
      }),
    ],
  };
}
