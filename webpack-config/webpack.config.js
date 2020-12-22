const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: path.resolve(__dirname, './src/js/app.js'),
  output: {
    filename: 'js/main.js',
    path: path.resolve(__dirname, './dist'),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/style.css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          'file-loader?name=[name].[ext]',
          {
            loader: 'extract-loader',
            options: {
              publicPath: '',
            },
          },
          {
            loader: 'html-loader',
            options: {
              minimize: true,
              attributes: {
                list: [{
                  tag: 'link',
                  attribute: 'href',
                  type: 'src',
                }, {
                  tag: 'img',
                  attribute: 'src',
                  type: 'src',
                }, {
                  tag: 'use',
                  attribute: 'xlink:href',
                  type: 'src',
                }],
                urlFilter: (_, value) => !/.(css|js)$/.test(value),
              },
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '',
            },
          },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|svg)$/,
        loader: 'file-loader',
        options: {
          name: '/img/[contenthash].[ext]',
        },
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '/fonts/[contenthash].[ext]',
        },
      },
      {
        test: /site\.webmanifest$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
    ],
  },
};
