
import path from 'path';
import RuntimePlugin from 'runtime-webpack-plugin';
import SplitByPathPlugin from 'webpack-split-by-path';

function isEntry(module, entry) {
  if (typeof entry === 'string') {
    return module.resource.indexOf(entry) !== -1;
  } else if (Array.isArray(entry)) {
    return entry.some(item => isEntry(module, item));
  }
  return isEntry(module, Object.keys(entry).map(key => entry[key]));
}

function isExternal(module) {
  return module.resource &&
    module.resource.indexOf('node_modules') !== -1;
}

export default function({ context, target, entry }) {
  return {
    externals: target === 'node' ? [(context, request, cb) => {
			// TODO: Make this work properly.
      if (/^[a-z\-0-9]+$/.test(request)) {
        return cb(null, `commonjs ${request}`);
      }
      cb();
    }] : [ ],
    plugins: target !== 'node' ? [
      // This performs the actual bundling of all the vendor files into their
      // own package. See the vendor entry above for more info.
      new SplitByPathPlugin([{
        name: 'vendor',
        path: path.join(context, 'node_modules'),
      }]),
      new RuntimePlugin('init'),
    ] : [ ],
  };
}
