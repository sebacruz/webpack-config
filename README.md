# webpack-config

> My personal shareable webpack configuration.

This package contains my preferred webpack configuration:

* CSS/SCSS.
* Image optimization.
* Code minification.
* Output path cleaning on every build.
* Manifest generation.
* Default `webpack-dev-server` configuration.

## Install

Install the package and its required loaders.

```shell
$ npm install --save-dev @sebacruz/webpack-config
$ npm install --save-dev babel-loader css-loader file-loader postcss-loader resolve-url-loader sass-loader style-loader url-loader
```

Check out the [`example`](example) directory to see how to set up your webpack config.
