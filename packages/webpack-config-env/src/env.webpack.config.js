import partial from 'webpack-partial';
import { EnvironmentPlugin } from 'webpack';

export default function env(config) {
  return partial(config, {
    plugins: [
      // Export `process.env` to the app being built. Optimize your code by
      // checking `NODE_ENV` and set things like config variables (e.g.
      // `API_URL`).
      new EnvironmentPlugin(Object.keys(process.env)),
    ],
  });
}
