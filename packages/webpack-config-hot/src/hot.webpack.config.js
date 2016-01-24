import partial from 'webpack-partial';
import { HotModuleReplacementPlugin, NoErrorsPlugin } from 'webpack';

export default function hotness(config) {
  const { hot = process.env.HOT } = config;
  return partial(config, {
    plugins: hot ? [
      // Add webpack's HMR runtime.
      new HotModuleReplacementPlugin(),

      // Don't generate bundles with errors so HMR doesn't bomb the app.
      new NoErrorsPlugin(),
    ] : [ ],
  });
}
