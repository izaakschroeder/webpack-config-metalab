import { HotModuleReplacementPlugin, NoErrorsPlugin } from 'webpack';

export default function hotness({ hot = process.env.HOT }) {
  return {
    plugins: hot ? [
      // Add webpack's HMR runtime.
      new HotModuleReplacementPlugin(),

      // Don't generate bundles with errors so HMR doesn't bomb the app.
      new NoErrorsPlugin(),
    ] : [ ],
  };
}
