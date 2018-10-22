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
    }
  };

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

  config.devServer = {
    // By default, we use the /assets/ path to store our compiled packages
    publicPath: '/assets/'

    // The `contentBase` property should be setted by-project.
  };

  return merge(nextConfig, config);
};
