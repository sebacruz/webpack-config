const path = require('path');
const { existsSync } = require('fs');

/**
 * Return the default PostCSS configuration object.
 *
 * @return {object}
 */
const getPostCssConfig = () => {
  const projectPostCssConfig = path.resolve(process.cwd(), 'postcss.config.js');
  const postCssOptions = {
    sourceMap: true,
    config: {}
  };

  if (!existsSync(projectPostCssConfig)) {
    postCssOptions.config.path = path.resolve(__dirname, '../config');
  }

  return postCssOptions;
};

module.exports = {
  getPostCssConfig
};
