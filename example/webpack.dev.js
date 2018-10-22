const { development } = require('@sebacruz/webpack-config');
const common = require('./webpack.common');

module.exports = development(common);
