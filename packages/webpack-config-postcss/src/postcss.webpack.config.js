
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// `postcss` modules.
import autoprefixer from 'autoprefixer';
import precss from 'precss';
import cssimport from 'postcss-import';

// Regular expression used to detect what kind of files to process.
const IS_STYLE = /\.(scss|sass|css)$/;

/**
 * Convert a loader string and query object into a complete loader string.
 * @param {String} loader Name of loader.
 * @param {Object} query Parameters object.
 * @returns {String} Generated loader string with query.
 */
function pack(loader, query) {
  return `${loader}?${JSON.stringify(query)}`;
}

/**
 * Generate the correct `loader` object given the parameters.
 * @param {String} target The webpack target.
 * @param {Boolean} external Whether to generate external CSS files.
 * @param {Boolean} minimize Whether to compress generated CSS.
 * @param {String} loader Loader for processing the stylesheet into CSS.
 * @returns {String} Final loader.
 */
function loaders({ target, external, minimize, loader }) {
  const config = {
    modules: true,
    importLoaders: 1,
    localIdentName: '[name]-[local]-[hash:base64:5]',
    minimize: minimize,
  };
  if (target === 'web') {
    if (external) {
      return ExtractTextPlugin.extract(
        'style-loader',
        `${pack('css-loader', config)}!${loader}`
      );
    }
    return `style-loader!${pack('css-loader', config)}!${loader}`;
  }
  return `${pack('css-loader/locals', config)}!${loader}`;
}

module.exports = function postcss({ target, postcss = [] }) {
  const env = process.env.NODE_ENV || 'development';
  const hot = process.env.HOT || false;
  const production = env === 'production';

  const external = (production || !hot) && target === 'web';
  const minimize = production;

  return {
    // Module settings.
    module: {
      loaders: [{
        test: IS_STYLE,
        loader: loaders({
          loader: 'postcss-loader',
          target,
          external,
          minimize,
        }),
      }],
    },

    postcss() {
      return [
        cssimport({
          // Make webpack acknowledge imported files.
          onImport: files => files.forEach(this.addDependency),
          resolve: (id, { basedir }) => this.resolveSync(basedir, id),
        }),
        precss,
        ...postcss,
        autoprefixer({
          browsers: [ 'last 2 versions' ],
        }),
      ];
    },

    plugins: [
      ...(external ? [
        // Some crawlers or things with Javascript disabled prefer normal CSS
        // instead of Javascript injected CSS, so this plugin allows for the
        // collection of the generated CSS into its own file.
        // .[contenthash]
        new ExtractTextPlugin('[name].css'),
      ] : [ ]),
    ],
  };
}
