const { basename } = require('path');
const has = require('lodash/has');
const get = require('lodash/get');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackManifestPlugin = require('webpack-manifest-plugin');

module.exports = nextConfig => {
  const config = {
    output: {},
    module: {},
    plugins: []
  };

  config.output = {
    filename: '[name].js'
  };

  if (!has(nextConfig, 'output.publicPath')) {
    const publicPath = basename(nextConfig.output.path);

    config.output.publicPath = `/${publicPath}/`;
  }

  config.module.rules = [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false
                }
              ],
              ['@babel/preset-react']
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              '@babel/plugin-proposal-export-namespace-from'
            ]
          }
        }
      ]
    }
  ];

  config.plugins.push(new WebpackManifestPlugin());

  if (has(nextConfig, 'output.path')) {
    // https://stackoverflow.com/a/18721515/4826045
    const root = process.cwd();

    const outputPath = get(nextConfig, 'output.path');
    const toClean = [
      // Make output path relative to the process path
      // eslint-disable-next-line no-warning-comments
      // TODO find a better way to do this
      outputPath.replace(root, '.')
    ];

    config.plugins.push(
      new CleanWebpackPlugin(toClean, {
        // Set the process root path as the plugin root
        // If we dont do this, it will use the package path
        root
      })
    );
  }

  return merge(config, nextConfig);
};
