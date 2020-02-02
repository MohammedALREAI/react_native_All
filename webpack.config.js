const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const rootDir = path.join(__dirname, '..');
const webpackEnv = process.env.NODE_ENV || 'development';
const babelLoader = `babel?${JSON.stringify({
     presets: ['react-native'],                    // Use default babel-presets-react-native
     plugins: [
          'syntax-trailing-function-commas',          // Fix a extra comma in react-native
          'transform-flow-strip-types',               // Strip flow types in react-native source code.
          require.resolve('react-native-webpack/fixRequireIssueLoader'),  // Fix a direct usage of require in react-native which caused issue.
     ],
})}`;
module.exports = {
     mode: webpackEnv,
     entry: {
          app: path.join(rootDir, './App'),
     },
     output: {
          path: path.resolve(rootDir, 'dist'),
          filename: 'app-[hash].bundle.js',
     },
     devtool: 'source-map',
     module: {
          rules: [
               {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader: [babelLoader],
               },
          ],
     },
     plugins: [
          new HtmlWebpackPlugin({
               template: path.join(__dirname, './index.html'),
          }),
          new webpack.HotModuleReplacementPlugin(),
     ],
     resolve: {
          extensions: [

               '.jsx',
               '.js',
          ], // read files in fillowing order
          alias: Object.assign({
               'react-native$': 'react-native-web',
          }),
     },
};
