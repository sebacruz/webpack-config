const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
const { getPostCssConfig } = require('./utils');

module.exports = nextConfig => {
  const config = {
    module: {
      rules: []
    },
    plugins: []
  };

  const postCssOptions = getPostCssConfig();

  config.module.rules.push({
    test: /\.css$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader
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
        loader: MiniCssExtractPlugin.loader
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
        loader: 'file-loader',
        options: {
          limit: 1000,
          name: '[name].[hash].[ext]'
        }
      }
    ]
  });

  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css'
    })
  );

  config.plugins.push(
    new ImageminPlugin({
      pngquant: {
        strip: true,
        quality: '70-90'
      },
      plugins: [
        imageminMozjpeg({
          quality: 80,
          progressive: false
        })
      ]
    })
  );

  config.plugins.push(new ImageminWebpWebpackPlugin());

  return merge.smart(config, nextConfig, {
    mode: 'production',
    output: {
      filename: '[name].[chunkhash].js'
    }
  });
};
