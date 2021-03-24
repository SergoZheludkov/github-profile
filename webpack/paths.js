const path = require('path');

const resolveApp = (relativePath) => path.resolve(__dirname, '..', relativePath);

module.exports = {
  entry: resolveApp('src/index.tsx'),
  bundle: resolveApp('bundle'),
  template: resolveApp('public/template.html'),
  public: resolveApp('public'),
  env: resolveApp('.env'),
};
