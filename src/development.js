const { HotModuleReplacementPlugin } = require('webpack');
const merge = require('webpack-merge');

module.exports = nextConfig => {
  const config = {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
      filename: '[name].js'
    },
    module: {
      rules: []
    },
    plugins: []
  };

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
    test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)(\?\S*)?$/,
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

  return merge.smart(config, nextConfig);
};
