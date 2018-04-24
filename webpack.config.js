const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: {
    bundle: './index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],
  module: {
    noParse: /node_modules\/localforage\/dist\/localforage.js/,
    rules: [
      {
        test: /\.css|.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      },
      {
        test: /(\.js|.jsx$)/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|svg)$/,
        options: {
          limit: 10000,
          name: './img/[name].[ext]'
        },
        loader: 'url-loader'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        options: {
          outputPath: './fonts/'
        },
        loader: 'file-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
}