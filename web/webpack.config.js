const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    './src/index.js'
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        // 対象となるファイルの拡張子
        test: /\.css/,
        // ローダー名
        use: [
          // linkタグに出力する機能
          'style-loader',
          // CSSをバンドルするための機能
          {
            loader: 'css-loader',
            options: {
              // オプションでCSS内のurl()メソッドの取り込みを禁止する
              url: false,
              // CSSの空白文字を削除する
              minimize: true
            },
          },
        ],
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: path.resolve(__dirname, '../firebase/public'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../firebase/public'),
  }
};
