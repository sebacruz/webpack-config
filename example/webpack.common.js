const path = require('path');
const { common } = require('@sebacruz/webpack-config');

module.exports = common({
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: './web'
  }
});
