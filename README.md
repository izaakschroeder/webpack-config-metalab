# webpack-config-metalab

Just some handy [webpack] configuration generating functions.

If your [webpack] configuration is large, unwieldy and/or confusing it's time to think about breaking it apart with [webpack-partial]. Partials are functions that take as input an existing webpack configuration and give as output a new webpack configuration. The modules here are simply preconfigured partials to do a lot of the heavy lifting for you.

First install some partials:

```sh
npm install --save webpack-config-entry webpack-config-babel
```

Then create yourself a `webpack.config.babel.js`:

```javascript
import compose from 'lodash/flowRight';

// Import useful partials.
import entry from 'webpack-config-entry';
import babel from 'webpack-config-babel';

const createConfig = compose(
  babel,
  entry
);

// Setting up webpack has never been this fast.
export default createConfig({ entry: 'foo.js' });
```

**IMPORTANT**: If you're adding your own partials that include a `loader` reference you must use `require.resolve` on it for `npm@2`.

[webpack]: https://webpack.github.io
[webpack-partial]: https://github.com/izaakschroeder/webpack-partial
