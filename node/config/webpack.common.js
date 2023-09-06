const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const { DefinePlugin } = require('webpack');
const dotenv = require('dotenv');

const envs = dotenv.config().parsed;
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const sass = require('sass');

module.exports = {
  entry: path.join(__dirname, '../src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../../nvw/app1/static/js'),
  },
  plugins: [
    new VueLoaderPlugin(),
    new VuetifyLoaderPlugin(),
    new DefinePlugin({
      _ENVIRONMENT: JSON.stringify(envs),
    }),
  ],
  experiments: {
    topLevelAwait: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.s(c|a)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: sass,
              sassOptions: {
                indentedSyntax: true,
              },
            },
          },
        ],
      },
    ],
  },
};
