
import nearest from 'find-nearest-file';
import path from 'path';
import { optimize } from 'webpack';

// No matter where we are, locate the canonical root of the project.
const root = path.dirname(nearest('package.json'));

export default function({ target, name }) {
  return {
    entry: {
      [name]: path.join(root, 'entry', `${name}.entry.js`),
    },
    target: target,
    context: root,
    // Output controls the settings for file generation.
    output: {
      filename: '[name].js',
      path: path.join(root, 'build', name),
      chunkFilename: '[id].js',
    },
    plugins: [
      new optimize.OccurenceOrderPlugin(true),
    ],
  };
}
