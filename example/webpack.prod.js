const { production } = require('@sebacruz/webpack-config');
const common = require('./webpack.common');

module.exports = production(common);
