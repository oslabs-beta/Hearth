const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = [
  {
    mode: 'development',
    entry: './src/electron.ts',
    target: 'electron-main',
    module: {
      rules: [{
        test: /\.ts$/,
        include: /src/,
        use: [{ loader: 'ts-loader' }]
      }]
    },
    output: {
      path: __dirname + '/dist',
      filename: 'electron.js'
    }
  },
  {
    mode: 'development',
    entry: './src/react.tsx',
    target: 'electron-renderer',
    devtool: 'source-map',
    module: { rules: [
      {
      test: /\.ts(x?)$/,
      include: /src/,
      use: [{ loader: 'ts-loader' }]
      },
      {
        test: /css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
    ] },
    resolve: {
      extensions: ['.tsx', '.ts', '.js',],
    },
    output: {
      path: __dirname + '/dist',
      filename: 'react.js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      })
    ]
  }
];