
class IntlWebpackPlugin {
  constructor({ name }) {
    this.name = name;
  }

  apply(compiler) {
    compiler.on('emit', (compilation, done) => {
      const data = { };
      const result = JSON.stringify(data);
      compilation.assets[this.name] = {
        size() {
          return result.length;
        },
        source() {
          return result;
        },
      };
      done();
    });
  }
}

export default function intl() {
  return {
    plugins: [
      new IntlWebpackPlugin({
        name: 'intl.json',
      }),
    ],
  };
}
