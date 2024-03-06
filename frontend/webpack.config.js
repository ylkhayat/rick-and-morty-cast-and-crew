const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: ['react-hot-loader/patch', './src/index.jsx'],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env', '@babel/preset-typescript'] },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.mjs'],
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    port: 3000,
    host: '0.0.0.0',
    publicPath: 'http://localhost:3000/dist/',
    hotOnly: true,
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],
};
