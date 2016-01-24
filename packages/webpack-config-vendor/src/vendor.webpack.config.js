import partial from 'webpack-partial';
import path from 'path';
import RuntimePlugin from 'runtime-webpack-plugin';
import SplitByPathPlugin from 'webpack-split-by-path';

export default function(config) {
  const { context, target } = config;
  const isNode = target === 'node';
  return partial({
    externals: isNode ? [ (context, request, cb) => {
			// TODO: Make this work properly.
      if (/^[a-z\-0-9]+$/.test(request)) {
        return cb(null, `commonjs ${request}`);
      }
      cb();
    } ] : [ ],
    plugins: !isNode ? [
      // This performs the actual bundling of all the vendor files into their
      // own package. See the vendor entry above for more info.
      new SplitByPathPlugin([ {
        name: 'vendor',
        path: path.join(context, 'node_modules'),
      } ]),
      new RuntimePlugin('init'),
    ] : [ ],
  });
}
