const { HotModuleReplacementPlugin } = require('webpack');
const merge = require('webpack-merge');
const { getPostCssConfig } = require('./utils');

module.exports = nextConfig => {
  const config = {
    output: {
      filename: '[name].js'
    },
    module: {
      rules: []
    },
    plugins: []
  };

  const postCssOptions = getPostCssConfig();

  config.module.rules.push({
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: [
      {
        loader: 'webpack-module-hot-accept'
      }
    ]
  });

  config.module.rules.push({
    test: /\.css$/,
    use: [
      {
        loader: 'style-loader'
      },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          sourceMap: true
        }
      },
      {
        loader: 'postcss-loader',
        options: postCssOptions
      }
    ]
  });

  config.module.rules.push({
    test: /\.scss$/,
    use: [
      {
        loader: 'style-loader'
      },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          sourceMap: true
        }
      },
      {
        loader: 'postcss-loader',
        options: postCssOptions
      },
      {
        loader: 'resolve-url-loader'
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }
    ]
  });

  config.module.rules.push({
    test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)(\?\S*)?$/,
    use: [
      {
        loader: 'url-loader'
      }
    ]
  });

  config.plugins.push(new HotModuleReplacementPlugin());

  config.devServer = {
    hot: true,
    overlay: true,
    inline: true

    // The `contentBase` property should be setted by-project.
  };

  return merge.smart(config, nextConfig, {
    mode: 'development',
    devtool: 'inline-source-map'
  });
};
